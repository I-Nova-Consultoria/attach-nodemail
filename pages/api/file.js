import formidable from 'formidable';
var fs = require('fs')
const path = require("path");
const nodemailer = require('nodemailer')

/*const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);*/

export const config = {
  api: {
    bodyParser: false,
  },
};




export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.uploadDir = `./temp`;
    form.keepExtensions = true;
    form.on('fileBegin', function (name, file) {
      //rename the incoming file to the file's name
      file.path = form.uploadDir + "/" + file.name;
    })
    form.parse(req, (err, fields, files) => {
      console.log(err, fields, files);
    });

    setTimeout(() => {
      var pathToAttachment = "./temp/10.pdf";
      var attachment = fs.readFileSync(path.resolve(pathToAttachment), 'binary').toString("base64");


      var transport = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'i.novaimobiliaria3@gmail.com',
          pass: '1n0v4@2021'
        }
      };

      var transporter = nodemailer.createTransport(transport);

      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Server is ready to take messages');
        }
      });

      var content = `Prezado Colaborador de RH, você acaba de receber um novo perfil de I.novador! Seguem os dados:
      \n Nome inovador \n Tel inovador \n email inovador \n mensagem inovador`;

      var mail = {
        from: "aprovafacil.inventos@aprovafacil.net",
        to: 'mahan.mashoof@gmail.com',
        subject: 'Wohooo! Novo perfil de I.novador!',
        text: content,
        attachments: [
          {
            content: attachment,
            filename: 'cv.pdf',
            type: "application/pdf",
            disposition: "attachment"
          }
        ]
      };

      /*sgMail
        .send(mail)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })*/
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            status: 'fail',
            err
          });
        } else {
          res.json({
            status: 'success'
          });
        }
      });
    }, 1000);
  }
}

/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require("fs");

pathToAttachment = `${__dirname}/temp/10.pdf`;
attachment = fs.readFileSync(pathToAttachment).toString("base64");

const msg = {
  to: 'mahan.mashoof@gmail.com',
  from: 'aprovafacil.inventos@aprovafacil.net',
  subject: 'testmail',
  text: 'test doc attachment from temp folder',
  attachments: [
    {
      content: attachment,
      filename: "cv.pdf", //the attachment will be named accordingly
      type: "application/pdf",
      disposition: "attachment"
    }
  ]
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  */