var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 4000;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.mail.yahoo.com',  ////  Sir it work smoothly with Yahoo I have tried it with gmail but gmail does not allow third party now
          port: 465,
          secure: true,
          auth: {
              user: '(userAccount)',
              pass: 'userAccountPassword'
          }
      });
      let mailOptions = {
          from: '"Zahoor Khan" <UserAccount>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          html: '<b>Sending mail throw node Js</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
