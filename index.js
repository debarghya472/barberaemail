const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const config = require('./config/config');

const creds = require('./config/client_secret.json');
const path = require('path');
const { email } = require('./config/config');

let port = process.env.PORT || 2000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    console.log(req.body.email);
    if(sendmail(req,res)){
       res.json({"result":"success"});
    }
});

app.listen(port, () => {
    console.log('Server started at port 2000....');
});

async function sendmail(req,res){
    const emailbody = `
    <p><b>Your Booking has been confirmed</b></p>

    <p>Your Booking for the following services has been confirmed</p>`+req.body.summary+`
    
    <p>Regards<br>
    Team Barbera</p>
  `;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.email, // generated ethereal user
            pass: config.password  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: '"Barbera" <debarghyamaity@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Booking Confirmation", // Subject line // plain text body
        html: emailbody// html body
    };
    var success =false;
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('Message sent: %s', info.messageId);
        success = true;
        return success;
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}