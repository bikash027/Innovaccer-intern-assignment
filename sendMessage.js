var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const request=require('request');
const Host=require('./models/Host');

var transporter = nodemailer.createTransport(smtpTransport({
  service: "SendinBlue",
  host: 'smtp-relay.sendinblue.com',
  port:587,
  // proxy: 'http://172.16.199.40:8080',
  auth: {
    user: 'singhab708@gmail.com',
    pass: 'd8RQCrH7s6SBFVcO',

  }
}));

const sendMessage={};
sendMessage.Email=function(visitor,sendToWho){
  Host.findOne(
    {
      attributes: ['email','name'],
      where:{ id: visitor.HostId } 
    }
  )
  .then(host=>{
    let mailOptions = {
      from: 'singhab708@gmail.com',
      subject: 'New visitor for you',
      html: `<p>Name - ${visitor.name}</p>
             <p>Phone - ${visitor.phone}</p>
             <p>Checkin - ${visitor.checkInTime}</p>
             <p>Checkout - ${visitor.checkOutTime}</p>`
    };
    if(sendToWho==="send to host"){
      mailOptions= {
        ...mailOptions,
        to: host.email,
        html: mailOptions.html+ `<p>Email - ${visitor.email}</p>`
      }
    }
    else{
      mailOptions={
        ...mailOptions,
        to: visitor.dataValues.email,
        html: mailOptions.html+ `<p>Host name - ${host.dataValues.name}</p>
                                 <p>Address - https://www.address.com</p> `
      }
    }
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
  })
  .catch(err=>console.log(err));
  
}




sendMessage.sms=function(visitor){
  let queryString={
      apikey: 'AF6LXWCJ269M57PUG6K1AB27GOBAXBUP',
      secret: 'T16FDP3X44XHKHBK',
      usetype:'stage',
      message: `Name - ${visitor.name}\r\n%0aemail - ${visitor.email}\r\n%0aphone - ${visitor.phone}\r\n%0acheckin - ${visitor.checkInTime}`
  }
  Host.findOne(
    {
      attributes: ['phone'],
      where:{ id: visitor.HostId } 
    }
  )
  .then(host=>{
    queryString={
      ...queryString,
      phone: host.phone
    }
    request({
        url: 'https://www.way2sms.com/api/v1/sendCampaign',
        qs: queryString,
        // proxy: 'http://172.16.199.40:8080'
      },function (error, response, body) {
          if (error) 
              console.log(error);
          else 
              console.log(response.href,response.body);
    })
  })
  
}

module.exports=sendMessage;