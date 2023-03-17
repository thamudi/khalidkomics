import Layout from '@/components/Layout';
import React, { useState } from 'react';

const contact = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('sending ...');

    let data = {
      name,
      email,
      subject,
      message,
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log('Response received');
      if (res.status === 200) {
        console.log('Response succeeded!');
        setSubmitted(true);
        // setName('');
        // setEmail('');
        // setSubject('');
        // setMessage('');
      }
    });
  };

  return (
    <Layout>
      <form action="/api/feedback-form" method="post" id="feedbackForm">
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter a valid Name"
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter a valid Email"
          required
        />
        <input
          type="text"
          name="subject"
          id="subject"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          placeholder="Enter a valid Subject"
        />
        <textarea
          name="message"
          id="message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Enter your message"
        ></textarea>
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="btn-black"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default contact;
