import React, { useState } from 'react';
import axios from 'axios';

function MessageForm() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/form-submit", { name,email,message });
      // await axios.post('/store-message', { name,email,message });
      setName('');
      setEmail('');
      setMessage('');
 
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <form action="/form-submit" method="POST" onSubmit={handleSubmit}>
    <center>
        <h1>SLACK NOTIFICATION</h1>
        <label >Name</label>&ensp;
          <input
            id="name"
            type="text"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <br></br>
          <br></br>

          <label>Email</label>&ensp;
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
         <br></br>
         <br></br>

        <label>Message</label>&ensp;
        <textarea 
          id="message"
          type="message"
          placeholder="Write your message here"
          value={message}
          onChange={(e) => { setMessage(e.target.value) }}
        />
    <br></br>
    <br></br>

      <button type="submit">Send</button>
      </center>
    </form>
  );
}

export default MessageForm;