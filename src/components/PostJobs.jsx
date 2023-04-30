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
    

    <div style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "20px", padding: "20px", width: "50%", height: "70vh", margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Post a Job</h2>
      <Form onSubmit={handleSubmit} style={{ fontSize: "20px" }}>
        <Form.Field>
          <label style={{ fontSize: "20px" }}>Job Title:</label>
          <br />
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} style={{ borderRadius:"5px" ,fontSize: "18px", height: "40px", width: "100%" }} autoFocus />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "20px" }}>Company Name:</label>
          <br />
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ borderRadius:"5px" ,fontSize: "18px", height: "40px", width: "100%" }} />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "20px" }}>Location:</label>
          <br />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius:"5px" ,fontSize: "18px", height: "40px", width: "100%" }} />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "20px" }}>Job Description:</label>
          <br />
          <textarea rows={3} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} style={{ borderRadius:"5px" ,fontSize: "18px", width: "100%" }} />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "20px" }}>Contact Phone:</label>
          <br />
          <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} style={{ borderRadius:"5px" ,fontSize: "18px", height: "40px", width: "100%" }} />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "20px" }}>Contact Email:</label>
          <br />
          <input type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} style={{borderRadius:"5px" , borderRadius:"5px" , fontSize: "18px", height: "40px", width: "90%" }} />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "20px" }}>Deadline:</label>
          <br />
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={{ borderRadius:"5px" ,fontSize: "18px", height: "40px", width: "100%" }} />
        </Form.Field>
        <div style={{ marginTop: "20px" }}>
          <Button type="submit" color="blue" disabled={!isFormValid()} style={{ borderRadius:"5px" ,fontSize: "18px", height: "40px", padding: "10px 20px" }}>Submit</Button>
          {!isFormValid() && <span style={{ marginLeft: "10px", color: "red", fontSize: "18px" }}>Please fill all fields</span>}
        </div>
      </Form>
    </div>

  );

}

export default PostJobs;
