import React from 'react';
import './card.css';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ job, index }) => {
  const { job_title, company_name, job_description, location, contact_phone, contact_email, deadline } = job;

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

  return (
    <Draggable draggableId={job.id.toString()} index={index}>
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
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
