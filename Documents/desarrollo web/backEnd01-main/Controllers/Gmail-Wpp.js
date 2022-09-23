import dotenv from "dotenv"
import {logger} from "../logs/loggers.js" 
dotenv.config()
import twilio from "twilio"
import {createTransport} from "nodemailer"
const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth :{
      user: process.env.TEST_MAIL,
      pass: process.env.PASSWORD
    }
  })



const accountSID= process.env.SID 
const authToken= process.env.TWILIO_AUTH

const client = twilio(accountSID, authToken)
const sendWpp = async (body, to) => {
const option = {
   body: body,
   from : `whatsapp:${process.env.FROM}`,
   to : `whatsapp:${to}`,
 
}

try{
  const message = await client.messages.create(option)

} catch(error){
  logger.error(error)
}
}


export {transporter, sendWpp}