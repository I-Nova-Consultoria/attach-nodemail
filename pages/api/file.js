import formidable from 'formidable';
var fs = require('fs')
const nodemailer = require('nodemailer')

export const config = {
  api: {
    bodyParser: false,
  },
};




export default function handler(req, res) {    
if (req.method === 'POST') { 
  const form = new formidable.IncomingForm();

  form.uploadDir = `./public`;   
  form.keepExtensions = true;
  form.on('fileBegin', function(name, file){
    //rename the incoming file to the file's name
  file.path = form.uploadDir + "/" + file.name;
})
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
  });

var transport = {
  host: 'smtp.gmail.com', //  //smtp.gmail
  port: 587, // 465    
  auth: {
  user: 'i.novaimobiliaria3@gmail.com',
  pass: '1n0v4@2021'
}
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
if (error) {
  console.log(error);
} else {
  console.log('Server is ready to take messages');
}
});

var content = `
 Prezado Colaborador de RH, você acaba de receber um novo perfil de I.novador! Seguem os dados:  \n
`

var mail = {
  from: "Coletor de Inovadores",
  to: 'lucas.depassos@yahoo.com.br',  // Change to email address that you want to receive messages on
  subject: 'Wohooo! Novo perfil de I.novador!',
  text: content,
  attachments: [
    {   
        filename: 'CURRICULUM',
        content: '/zelda.jpg'
    }
  ]
}

transporter.sendMail(mail, (err, data) => {
  if (err) {
    res.json({
      status: 'fail',
      err
    })
  } else {
    res.json({
     status: 'success'
    })
  }
})
}
}