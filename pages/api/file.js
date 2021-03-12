//const nodemailer = require('nodemailer')
import formidable from 'formidable';
var fs = require('fs')
const path = require("path");
const sgMail = require('@sendgrid/mail');

require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const formContent = form.parse(req, (err, fields, files) => {
      console.log(fields);
    });

    setTimeout(() => {
      const fileName = formContent.openedFiles[0].name;
      var pathToAttachment = formContent.openedFiles[0].path;
      var attachment = fs.readFileSync(path.resolve(pathToAttachment)).toString("base64");

      /*var transport = {
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
      });*/

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
            filename: fileName,
            type: "application/pdf",
            disposition: "attachment"
          }
        ]
      };

      sgMail.send(mail, (err, data) => {
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
      /*transporter.sendMail(mail, (err, data) => {
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
      });*/
    }, 1000);
  }
}