// jobListings.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardList from './cards/cardlist';
// import './JobListing.css';

const JobListing = ({user , active , myjobs}) => {
  console.log("joblisting",user);
  const [jobListings, setJobListings] = useState([]);

useEffect(() => {
  const fetchJobListings = async () => {
    const url = 'https://job-back.onrender.com/job_listing';
    try {
      const res = await fetch(url);
      const data = await res.json();
      setJobListings(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchJobListings();
}, [active]);


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(jobListings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setJobListings(items);

    // Send updated order numbers to the server
    const updatedOrderNumbers = items.map((item, index) => ({ id: item.id, order_index: index }));
    fetch('https://job-back.onrender.com/update_order_numbers', {
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

  const handleJobListingUpdate = (jobId) => {
    const updatedJobListings = jobListings.filter((job) => job.id !== jobId);
    setJobListings(updatedJobListings);
  };
  return (
    <div className='job-listing'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='jobListings'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <CardList jobListings={jobListings} onUpdate={handleJobListingUpdate} user={user} active={active} myjobs={myjobs}/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default JobListing;
