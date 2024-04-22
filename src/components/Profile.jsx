import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import profilepic from '../assets/dp.avif'
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from '../services/allAPI';


function Profile() {

  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileImage:""
  })



  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userDetails, username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin,
      })
      setExistingImg(existingUserDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profileImage){
      setPreview(URL.createObjectURL(userDetails.profileImage))
    }else{
      setPreview("")
    }
  },[userDetails.profileImage])

  const handleUserProfile = async ()=>{
    const {username,email,password,github,linkedin,profileImage} = userDetails
    if(!github || !linkedin){
      toast.warning("please fill the form completely!")
    }else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "content-Type" : preview?"multipart/form-data":"application/json",
          "Authorization" : `Bearer ${token}`
        }
        // api call
      try{ 
        const result = await updateUserAPI(reqBody,reqHeader)
        if(result.status==200){
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }else{
          console.log(result);
        }
      }catch(err){
          console.log(err);
        }

      }

    }


  }
  return (
    <>
    <div className="d-flex justify-content-between">
      <p style={{color:'#fefefe',fontSize:'20px'}}><i className='fa-solid fa-user'></i> Profile</p>
      <i style={{color:'#fefefe'}} onClick={() => setOpen(!open)} className='fa-solid fa-chevron-down'></i>
    </div>

    <Collapse in={open}>
        <div className='row justify-content-center mt-3 shadow' id="example-collapse-text">
         <label className='text-center'>
          <input onChange={e=>{setUserDetails({...userDetails,profileImage:e.target.files[0]})}} type="file" style={{display:'none'}} />
          {
            existingImg == "" ?
          
          <img width={'200px'} height={'200px'} src={preview?preview:profilepic} alt="" className='rounded-circle img-fluid mb-3' />
          :
          <img width={'200px'} height={'200px'} src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" className='rounded-circle img-fluid mb-3' />
}

         </label>
         <div className="mb-2">
          <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} style={{borderRadius:'10px',border:'2px solid #4cc473'}} type="text" className='form-control' placeholder='Github URL' />
         </div>
         <div className="mb-2">
          <input  value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} style={{borderRadius:'10px',border:'2px solid #4cc473'}}  type="text" className='form-control' placeholder='LinkedIn URL' />
         </div>
         <div className="d-grid">
          <button onClick={handleUserProfile} style={{background:'#4cc473',borderRadius:'10px',color:'#fefefe',marginBottom:'20px',marginTop:'20px',padding:'10px',border:'none',fontSize:'15px'}}  className=''>Update Profile</button>
         </div>
        </div>
      </Collapse>
      <ToastContainer position='top-center' theme='light' autoClose={3000} />

    </>
  )
}

export default Profile