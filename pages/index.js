import React, { useState } from 'react'
import { post } from 'axios';

function SimpleReactFileUpload() {

  const [corName, setCorName] = useState('')
  const [corCel, setCorCel] = useState('')
  const [corEmail, setCorEmail] = useState('')
  const [corMessage, setCorMessage] = useState('')
  const [file, setFile] = useState([])

  function fileUpload() {
    const url = 'http://localhost:3000/api/file';
    const formData = new FormData();
    formData.append('corFile', file)
    formData.append('corName', corName)
    formData.append('corCel', corCel)
    formData.append('corEmail', corEmail)
    formData.append('corMessage', corMessage)
    //var options = { content: formData };
    return post(url, formData)
  }

  function onFormSubmit(e) {
    e.preventDefault()
    fileUpload(file).then((response) => {
      console.log(response.data);
    });
  }

  function onFileChange(e) {
    const file = e.target.files[0]
    setFile(file)
  }

  function handleName(e) {
    const value = e.target.value
    setCorName(value);
  }

  function handleCel(e) {
    const value = e.target.value
    setCorCel(value);
  }

  function handleEmail(e) {
    const value = e.target.value
    setCorEmail(value);
  }

  function handleMessage(e) {
    const value = e.target.value
    setCorMessage(value);
  }

  return (
    <form id='myForm' onSubmit={onFormSubmit}>
      <h1>File Upload</h1>
      <input name='corName' className='form-field main' type="text" placeholder='Nome' value={corName} onChange={handleName} required />
      <div>
        <input
          name='corCel' type="text" className='form-field main' mask="(99) 99 99 99 999" placeholder='Celular' value={corCel} onChange={handleCel} required
        />
      </div>
      <input
				name='corEmail' type="email" className='form-field main' placeholder='E-mail' value={corEmail} onChange={handleEmail} required
			/>
      <input
				name='corMessage' type="text" className='form-field text' InputProps={{ disableUnderline: true }} placeholder='Mensagem' multiline value={corMessage} onChange={handleMessage} required
			/>
      <input name='corFile' type="file" onChange={onFileChange} />
      <button type="submit" >Submit</button>
    </form>
  );
}

export default SimpleReactFileUpload