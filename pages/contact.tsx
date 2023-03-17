import Layout from '@/components/Layout';
import Message from '@/components/Message';
import Image from 'next/image';
import React, { useState } from 'react';

const contact = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [textMessage, setTextMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDisabled(true);

    let data = {
      name: firstName + ' ' + lastName,
      email,
      message: textMessage,
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const data: any = await res.json();
        if (res.status === 200) {
          setType(data.type);
          setMessage(data.message);
        } else if (res.status === 400) {
          setType(data.type);
          setMessage(data.message);
        } else if (res.status === 500) {
          setType(data.type);
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setSubmitted(true);
        setDisabled(false);
      });
  };

  return (
    <Layout>
      <div className="mx-8 lg:mx-auto lg:w-1/2 relative">
        {submitted && (
          <Message type={type} message={message} close={setSubmitted} />
        )}
        <form
          className="border-4 border-black p-8 mb-16"
          action="/api/feedback-form"
          method="post"
          id="contactForm"
        >
          <div className="flex flex-col gap-y-4">
            <h1 className="text-center">
              Send me a message and I"ll get back to you!
            </h1>
            <div className="flex justify-between gap-x-6">
              <input
                type="text"
                id="fname"
                name="first_name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="last_name"
                id="lname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email Address"
              required
            />
            <textarea
              className="h-52"
              name="message"
              id="message"
              onChange={(e) => {
                setTextMessage(e.target.value);
              }}
              placeholder="Message"
            ></textarea>
            <button
              disabled={disabled}
              onClick={(e) => {
                handleSubmit(e);
              }}
              className={`bg-link-blue px-2 py-1 w-fit font-bold border-black border-2 ${
                disabled ? 'opacity-50' : 'opacity-100'
              }`}
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="flex flex-row-reverse relative">
            <Image
              src={'/img/shukri.svg'}
              alt={'shukri'}
              width={100}
              height={100}
              className="absolute transform scale-x-[-1]"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default contact;
