import React from 'react';
import './card.css';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ job, index, onUpdate, user }) => {

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
        color = 'green';
    } else if (daysUntilDeadline > 14) {
        color = 'yellow';
    } else {
        color = 'red';
    }

    const handleArchive = () => {
        // Send POST request to server to set is_active field to false and order_index to INT_MAX
        fetch(`http://localhost:3001/archive/${job.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_active: false,
                order_index: 100000
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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
                // onUpdate(job.id);
            })
            .catch((err) => console.log(err));
    };
    

    const isDraggable = is_admin ? true : false;

    return (
        <Draggable draggableId={job.id.toString()} index={index} isDragDisabled={!isDraggable}>
            {(provided) => (
                <div className='card-container' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className='card' style={{ backgroundColor: `${color}` }}>
                        <div className='card-content'>
                            <h2>{job_title}</h2>
                            <h3>{company_name}</h3>
                            <p>{job_description}</p>
                        </div>
                        <div className='card-details'>
                            <div className='detail'>
                                <span>{location}</span>
                            </div>
                            <div className='detail'>
                                <span>{contact_phone}</span>
                            </div>
                            <div className='detail'>
                                <span>{contact_email}</span>
                            </div>
                            <div className='detail'>
                                <span>{formatDate(deadline)}</span>
                            </div>
                        </div>
                        <div className='card-footer'>
                            {is_admin ?
                                <button onClick={handleArchive}>Archive</button>
                                :
                                <button onClick={handleInterested}>Interested</button>
                            }
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;
