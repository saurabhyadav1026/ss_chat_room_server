import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();
const port=Number(process.env.MAIL_PORT) || 587
const sender=nodemailer.createTransport({
    port:port,
    host:process.env.MAIL_SMTP,
    //service:'gmail',
    secur:port===465,

    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    },
    connectionTimeout:10000
})


export default sender;