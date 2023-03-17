import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default function (req: NextApiRequest, res: NextApiResponse) {
  // const nodemailer = require('nodemailer');
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const transporter = createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
  });
  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  // console.log('body: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.name) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Name not found' });
  } else if (!body.email) {
    return res.status(400).json({ data: 'Email not found' });
  } else if (!body.subject) {
    return res.status(400).json({ data: 'Subject not found' });
  } else if (!body.message) {
    return res.status(400).json({ data: 'Message not found' });
  } else {
    const mailData = {
      from: body.email,
      to: process.env.SMTP_EMAIL,
      subject: `Message From ${body.name} - ${body.subject}`,
      text: `${body.message} \n ${body.email}`,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Mail sent to ${body.email}`);
      }
    });
    // Sends a HTTP success code
    res.status(200).json({ message: `Mail sent to ${body.email}` });
  }
}
