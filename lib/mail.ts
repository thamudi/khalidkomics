import { createTransport } from 'nodemailer';
import pino from 'pino';

const logger = pino({
  browser: {
    asObject: false,
  },
});

export default function (id: string) {
  const transporter = createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
  });

  const mailData = {
    to: process.env.TO_MAIL,
    cc: process.env.TO_MAIL,
    subject: `Corrupted Comic Number ${id}`,
    text: `The following comic has been found to be corrupted.\n You can find it under the following link. \n ${process.env.NEXT_PUBLIC_STRAPI_API_URL}/admin/content-manager/collectionType/api::comic.comic/${id}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      logger.error(err);
    } else {
      logger.info(`Mail sent`);
    }
  });
}
