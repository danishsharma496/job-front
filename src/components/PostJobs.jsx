import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

function PostJobs() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobDetails = {
      job_title: jobTitle,
      company_name: companyName,
      location: location,
      job_description: jobDescription,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      deadline: deadline
    };
    // Send POST request to the server
    fetch('http://localhost:3001/job_listing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobDetails)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // reset the form fields
        setJobTitle('');
        setCompanyName('');
        setLocation('');
        setJobDescription('');
        setContactPhone('');
        setContactEmail('');
        setDeadline('');
      })
      .catch(err => console.log(err));
  };

  function isFormValid() {
    return (
      jobTitle.trim() !== '' &&
      companyName.trim() !== '' &&
      location.trim() !== '' &&
      jobDescription.trim() !== '' &&
      contactPhone.trim() !== '' &&
      contactEmail.trim() !== '' &&
      deadline.trim() !== ''
    );
  }
  
  return (
    <div style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Post a Job</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Job Title:</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Job Description:</label>
          <textarea rows={3} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Contact Phone:</label>
          <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Contact Email:</label>
          <input type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Deadline:</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </Form.Field>
        <div style={{ marginTop: "20px" }}>
          <Button type="submit" color="blue" disabled={!isFormValid()}>Submit</Button>
          {!isFormValid() && <span style={{ marginLeft: "10px", color: "red" }}>Please fill all fields</span>}
        </div>
      </Form>
    </div>
  );
  
}

export default PostJobs;
