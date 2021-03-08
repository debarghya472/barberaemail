const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const config = require('./config/config');

const creds = require('./config/client_secret.json');
const path = require('path');
const { email } = require('./config/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    if(sendmail(req,res)){
       res.json({"result":"success"});
    }
});

app.listen(2000, () => {
    console.log('Server started at port 2000....');
});

function sendmail(req,res){
    const emailbody = `
    <p><b>Greetings from Celesta’20</b></p>

    <p>Here's something to look forward to. As you all know, this time Celesta'20 will be held online. Through our exciting events and guest lectures, we have made sure that Celesta'20 will lift your spirits up amidst this lockdown lifestyle. We don't want anyone to be left out. Thus, Celesta'20 proudly presents its awesome series guest lectures, starting from Tomorrow (12th December).</p>
    
    <p>Tomorrow we have Dr. Shankar Venugopal, Vice President of Mahindra and Mahindra (Turnover of Rs.45,000 Crore in 2020 Q1), delivering a highly anticipated lecture on Skills desirable for the future at 10:00 AM.
    For the folks uninitiated about Dr. Shankar Venugopal, he holds ten international patents  and has trained 1000 + inventors and entrepreneurs. Having shaped so many brilliant careers, he has a deep understanding of the skills required in the professional world. So wherever you wish to go into the future, this lecture will be definitely helpful.</p>
    
    <p>Tomorrow at 5:00 PM, we have Avelo Roy, Managing Director of Kolkata Ventures delivering a lecture as well, on the topic of Principles of Entrepreneurship. He is known as a Godfather for startups. In just the first 3 years of Kolkata Ventures, he has incubated and led more than 400 startups to success.</p>
    
    
    <p><b>Set Reminder now!</b></p>
    
    <p>Dr. Shankar Venugopal, 12th morning 10 am - https://youtu.be/CPSf7wINJOY
    Mr. Avelo Roy, 12th morning 5pm - https://youtu.be/UgdXQ4FanLo</p>
    
    <p>The point is, we want everyone to benefit from the efforts Team Celesta'20 has put to arrange these and many more guest lectures and events online. The Guest Lectures are free as well. 
    We hope that everyone shows up and no one misses out on this rare oppurtinity to interact with such personalites.</p>
    
    <p>All Events, Guest Lecture info and Registration - https://celesta.tech
    (Make sure you register for the specific Event and Guest Lectures you are interested in.)</p>
    
    <p>Regards<br>
    Team Celesta'20<br>
    IIT Patna</p>
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
        from: '"Celesta Dev" <debarghyamaity@gmail.com>', // sender address
        to: "utsamaity15@gmail.com", // list of receivers
        subject: "CELESTA'20 INTO THE CYBERVERSE", // Subject line // plain text body
        html: emailbody// html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('Message sent: %s', info.messageId);
        return true;
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
    });
}