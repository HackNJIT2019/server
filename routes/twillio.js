// const dotenv = require('dotenv');
var express = require('express');
const app = express();
var router = express.Router();


const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const accountSid = 'AC931cf53c8c266df8ef00655a1bf9f409';
const authToken = '308faebee94c4233b52f0f1a5b2b5345';
const client = require('twilio')(accountSid, authToken);




router.post('/',(req,res)=>{

        
    client.messages
    .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12562748566',
    to: '+12016507371'
    })
    .then(message => console.log(message.sid));

    const twiml = new MessagingResponse();

    twiml.message('Confirming your order, will arrive in about 30-40 minutes');
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

    http.createServer(app).listen(1337, () => {
        console.log('Express server listening on port 1337');
  
    });
});
module.exports = router;




