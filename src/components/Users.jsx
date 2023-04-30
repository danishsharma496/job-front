import React, { useState, useEffect } from 'react';
import Cardlist from './CardList';

const Users = ({ job }) => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/jobs/interested-users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((users) => setUsers(users))
      .catch((err) => console.log(err));
  }, []);

  return Users.length === 0 ? (
    <h1 className='f1'>Loading</h1>
  ) : (
    <div className='tc'>
      <h1 className='f1'>Jobs and Interested Users</h1>
      {Users.map((job) => (
        <div key={job.id}>
          <h2>{job.job_title} at {job.company_name}</h2>
          <Cardlist robots={job.users} />
        </div>
      ))}
    </div>
  );
};

export default Users;
