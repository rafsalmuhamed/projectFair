import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadimg from '../assets/uploadimg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';


function Add() {
  const {addResponse,setAddResponse} = useContext(addResponseContext)

// to hold url
const [preview,setPreview] = useState()

  const [imageFileStatus,setImageFileStatus]= useState(false)
const [projectDetails,setProjectDetails] = useState({
  title:"",language:"",overview:"",github:"",website:"",projectImage:""
})

console.log(projectDetails);

useEffect(()=>{
  if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg"){
    setImageFileStatus(true)
    setPreview(URL.createObjectURL(projectDetails.projectImage))
  }else{
    setPreview(uploadimg)
    setImageFileStatus(false)
    setProjectDetails({...projectDetails,projectImage:""})
  }
},[projectDetails.projectImage])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title:"",language:"",overview:"",github:"",website:"",projectImage:""})
  }
  const handleShow = () => setShow(true);

  // handle upload project details
  const handleUPloadProject = async()=>{
    const {title,language,overview,website,github,projectImage}=projectDetails
    if(!title || !language || !overview || !website || !github || !projectImage){
      toast.error('Please fill the form completely!')

    }else{
      // api call
const reqBody = new FormData()
reqBody.append("title",title)
reqBody.append("language",language)
reqBody.append("overview",overview)
reqBody.append("github",github)
reqBody.append("website",website)
reqBody.append("projectImage",projectImage)

const token = sessionStorage.getItem("token")
console.log(token);
if(token){
  const reqHeader = {
    "Content-Type"  : "multipart/form-data",
    "Authorization" : `Bearer ${token}`
  }
// api call
try{
const result = await addProjectAPI(reqBody,reqHeader)
console.log(result);
if(result.status==200){
  toast.success(`${result.data.title} has uploaded successfully!`)
  handleClose()
}else{
  toast.warning(result.response.data)
}
}catch(err){
  console.log(err);
}
}

    }
  }

  return (
    <>
    <button style={{background:'#ebad3f',borderRadius:'20px'}}  onClick={handleShow} className='btn'><i className='fa-solid fa-plus me-2'></i>New Project</button>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
          <div className="col-lg-4">
            <label>
              <input type="file" onChange={e=>{setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}}  style={{display:'none'}}/>
              <img className='img-fluid'  src={preview} alt="" />

            </label>
           {!imageFileStatus&& <div className='text-danger my-2'>"upload only the followingfile types(png, jpg, jpeg)"</div>}
          </div>
          <div className="col-lg-8">
            <div className='mb-2'><input style={{border:'1px solid black',borderRadius:'10px'}} type="text" className="form-control" placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/></div>

            <div className='mb-2'><input style={{border:'1px solid black',borderRadius:'10px'}} type="text" className="form-control" placeholder='Languages Used' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} /></div>

            <div className='mb-2'><input style={{border:'1px solid black',borderRadius:'10px'}} type="text" className="form-control" placeholder='Git Hub Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} /></div>
          
          </div>
         </div>
         <div className='mb-2'><input style={{border:'1px solid black',borderRadius:'10px'}} type="text" className="form-control" placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} /></div>

         <div className='mb-2'><input style={{border:'1px solid black',borderRadius:'10px'}} type="text" className="form-control" placeholder='Project Description' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} /></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUPloadProject} style={{background:'#ebad3f',borderRadius:'20px'}} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='light' autoClose={3000} />

    </>
  )
}

export default Add