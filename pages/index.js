import React, {useState} from 'react'
import { post } from 'axios';

function SimpleReactFileUpload() {

  const [file, setFile] = useState([])

  function fileUpload(file){
    const url = 'http://localhost:3000/api/file';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData,config)
  }

  function onFormSubmit(e){
    e.preventDefault()
    fileUpload(file).then((response)=>{
      console.log(response.data);
    })
  }

  function onFileChange(e) {
    const file = e.target.files[0]
    setFile(file)
  }

  return(
    <form onSubmit={onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Submit</button>
      </form>
  );
}

export default SimpleReactFileUpload