import React from 'react';
import './card.css';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ job, index, onUpdate, user, active, myjobs }) => {

    const { job_title, company_name, job_description, location, contact_phone, contact_email, deadline } = job;
    const { id, name, email, is_admin } = user;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));

    let color;
    if (daysUntilDeadline > 21) {
        color = 'linear-gradient(to bottom, rgba(76, 175, 80, 0.7), rgba(76, 175, 80, 1))'; // green gradient
    } else if (daysUntilDeadline > 14) {
        color = 'linear-gradient(to bottom, rgba(255, 235, 59, 0.7), rgba(255, 235, 59, 1))'; // yellow gradient
    } else {
        color = 'linear-gradient(to bottom, rgba(244, 67, 54, 0.7), rgba(244, 67, 54, 1))'; // red gradient
    }


    const handleArchive = () => {
        // Send POST request to server to set is_active field to false and order_index to INT_MAX
        // console.log("handleArchive");
        fetch(`http://localhost:3001/archive/${job.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_active: false,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                onUpdate(job.id);
            })
            .catch((err) => console.log(err));


    };



    const handleUnarchive = () => {
        // Send POST request to server to set is_active field to false and order_index to INT_MAX
        //  console.log(job.id);
        fetch(`http://localhost:3001/archive/${job.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_active: true,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                onUpdate(job.id);
            })
            .catch((err) => console.log(err));
    };

    const handleInterested = () => {
        fetch(`http://localhost:3001/jobs/interested`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                job_id: job.id
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                onUpdate(job.id);
            })
            .catch((err) => console.log(err));
    };
    const deleteInterested = () => {
        fetch(`http://localhost:3001/jobs/interested`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                job_id: job.id
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                onUpdate(job.id);
            })
            .catch((err) => console.log(err));
    };


    const isDraggable = is_admin ? true : false;

    return (
        <Draggable draggableId={job.id.toString()} index={index} isDragDisabled={!isDraggable}>
            {(provided) => (
                <div className='card-container    '{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className='card' style={{ background: `${color}` }}>
                        <div className='card-content'>
                            <h2>{job_title}</h2>
                            <h3>{company_name}</h3>
                            <p>{job_description}</p>
                        </div>
                        <div className='card-details'>
                            <div className='detail'>
                                <a href={`tel:${contact_phone}`} style={{ color: 'white' }}>{contact_phone}</a>
                                <br />
                            </div>
                            <div className='detail'>
                                <a href={`mailto:${contact_email}`} style={{ color: 'white' }}>{contact_email}</a>
                                <br />
                            </div>
                            <div className='detail'>
                                <a href={`https://maps.google.com?q=${location}`} target='_blank' style={{ color: 'white' }}>{location}</a>
                                <br />
                            </div>
                            <div className='detail'>
                                <span>{formatDate(deadline)}</span>
                                <br />
                            </div>

                        </div>

                        <div className='card-footer'>
                            {is_admin ? (
                                <div>
                                    {active ? (
                                        <button onClick={handleArchive}>Archive</button>
                                    ) : (
                                        <button onClick={handleUnarchive}>Unarchive</button>
                                    )}
                                </div>
                            ) : (

                                <div>
                                    {!myjobs ? (
                                        <button onClick={handleInterested}>Interested</button>
                                    ) : (
                                        <button onClick={deleteInterested}>delete</button>
                                    )}
                                </div>

                            )}

                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;
