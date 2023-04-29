 
// CardList.js
import React from 'react';
import Card from './card';
import './card.css';
import { Droppable } from 'react-beautiful-dnd';

const CardList = ({ jobListings  , onUpdate , user}) => {

    console.log("cardlist",user);
    const activeJobListings = jobListings.filter((job) => job.is_active);
    return (
      <Droppable droppableId="cardlist">
        {(provided) => (
          <div className="cardlist-container" {...provided.droppableProps} ref={provided.innerRef}>
            {activeJobListings.map((job, index) => (
              <Card key={job.id} job={job} index={index} onUpdate={onUpdate} user={user} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

export default CardList;
