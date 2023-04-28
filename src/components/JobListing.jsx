import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardList from './cards/cardlist';
// import './JobListing.css';

const JobListing = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/job_listing')
      .then((res) => res.json())
      .then((data) => {
        setJobListings(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(jobListings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setJobListings(items);

    // Send updated order numbers to the server
    const updatedOrderNumbers = items.map((item, index) => ({ id: item.id, order_index: index }));
    fetch('http://localhost:3001/update_order_numbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedOrderNumbers)
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  };

  return (
    <div className='job-listing'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='jobListings'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <CardList jobListings={jobListings} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default JobListing;
