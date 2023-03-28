import Layout from '@/components/Layout';
import Message from '@/components/Message';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

const contact = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [textMessage, setTextMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string>('');
  const { t } = useTranslation('common');

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
            <h1 className="text-center">{t('contact title')}</h1>
            <div className="flex justify-between gap-x-6">
              <input
                type="text"
                id="fname"
                name="first_name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder={`${t('fname')}`}
                required
              />
              <input
                type="text"
                name="last_name"
                id="lname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder={`${t('lname')}`}
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={`${t('email')}`}
              required
            />
            <textarea
              className="h-52"
              name="message"
              id="message"
              onChange={(e) => {
                setTextMessage(e.target.value);
              }}
              placeholder={`${t('message')}`}
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
              {t('submit')}
            </button>
          </div>
          <div className="flex flex-row-reverse relative mt-4">
            <Image
              src={'/img/contact_illustration.svg'}
              alt={'shukri'}
              width={150}
              height={150}
              className="absolute -bottom-16"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}
export default contact;
