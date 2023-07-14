import React, { useState } from 'react';
import axios from 'axios';

const FormSubmit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/form-submit', { name, email, message })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='message'>Message</label>&ensp;
        <textarea
          id="message"
          type="message"
          placeholder="Write your message here"
          value={message}
          onChange={(event) => { setMessage(event.target.value) }}
        />
        <br></br>
        <br></br>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormSubmit;