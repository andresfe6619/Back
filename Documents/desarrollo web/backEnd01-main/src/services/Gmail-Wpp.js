import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { logger } from "../logs/loggers.js";
import twilio from "twilio";
import { createTransport } from "nodemailer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path:__dirname+'.env'});
const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.TEST_MAIL,
    pass: process.env.PASSWORD,
  },
});

const accountSID = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = twilio(accountSID, authToken);
const sendWpp = async (body, to) => {
  const option = {
    body: body,
    from: `whatsapp:${process.env.FROM}`,
    to: `whatsapp:${to}`,
  };

  try {
     await client.messages.create(option);
  } catch (error) {
    logger.error(error);
  }
};

const sendGmail = async (subject, html) => {
  const mailOps = {
    from: "server Node.js",
    to: process.env.MAIL,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOps);
};
export { transporter, sendWpp, sendGmail };
