import { ContactBody } from '@/interfaces/comic';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default function (req: NextApiRequest, res: NextApiResponse) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  const body: ContactBody = req.body;

  if (!body.name.trim()) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ type: 'info', message: 'name not found' });
  } else if (!body.email) {
    return res.status(400).json({ type: 'info', message: 'email not found' });
  } else if (!emailRegex.test(body.email)) {
    return res.status(400).json({ type: 'info', message: 'use valid email' });
  } else if (!body.message) {
    return res.status(400).json({ type: 'info', message: 'message not found' });
  } else {
    const mailData = {
      from: body.email,
      to: process.env.SMTP_EMAIL,
      subject: `Message From Khalid Komics dot com`,
      text: `${body.message} \n ${body.email}`,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        // Sends a HTTP success code
        res.status(500).json({ type: 'error', message: `contact error` });
      } else {
        console.log(`Mail sent to ${body.email}`);
        // Sends a HTTP success code
        res
          .status(200)
          .json({ type: 'success', message: `mail sent`, data: body.email });
      }
    });
  }
}
