 

import React from 'react';
import Card from './card';
import './card.css';
import { Droppable } from 'react-beautiful-dnd';

const CardList = ({ jobListings }) => {
  return (
    <Droppable droppableId='cardlist'>
      {(provided) => (
        <div className='cardlist-container' {...provided.droppableProps} ref={provided.innerRef}>
          {jobListings.map((job, index) => (
            <Card key={job.id} job={job} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CardList;
