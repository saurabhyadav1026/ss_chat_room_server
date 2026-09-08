import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { Resend } from "resend";


dotenv.config();
const port=Number(process.env.MAIL_PORT) || 587
const sender=nodemailer.createTransport({
    port:port,
    host:process.env.MAIL_SMTP,
    //service:'gmail',
    secure:port===465,

    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    },
    connectionTimeout:10000
})


const resend = new Resend(process.env.MAIL_PASS);




export default resend;