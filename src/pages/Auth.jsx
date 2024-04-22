import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginpic from '../assets/loginimg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { tokenAuthContext } from '../contexts/TokenAuth';




function Auth({ insideRegister }) {
const {isAuthorised,setAuthorised}=useContext(tokenAuthContext)

  const naviage = useNavigate()

  const [userInputs, setUserInputs] = useState({
    username:"", email:"", password:""
  })
console.log(userInputs);

  const handleRegister =async (e) => {
    e.preventDefault()
    if (userInputs.username && userInputs.email && userInputs.password) {
      // api call
      try{
        const result =await registerAPI(userInputs)
        console.log(result);
        if(result.status==200){
          toast.success(`welcome ${result.data.username}...   Login to your Account!`)
          
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            naviage('/login')
          }, 2000);
        }else{
          toast.error(result.response.data)
          setTimeout(()=>{
            setUserInputs({username:"",email:"",password:""})
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error('Please fill the form Completely!')

    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      // api call
      try{
        const result = await loginAPI(userInputs)
        if (result.status==200){
          // store existing user and token
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setAuthorised(true)
          toast.success(`welcome ${result.data.existingUser.username}...`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            naviage('/')
          },2000);
        }else{
          toast.error(result.response.data)
          setTimeout(()=>{
            setUserInputs({username:"",email:"",password:""})
          },2000);
        }

      }catch(err){
        console.log(err);
      }
    }else{
      toast.warning("Please Fill the Form!")
    }
  }



  return (
    <div style={{ width: "100%", height: '100vh', background: 'rgb(10 27 34)' }} className='d-flex justify-content-center align-items-center'>
      <div style={{ background: 'rgb(10 27 34)' }} className="container w-75">
        <Link to={'/'}><i style={{ color: 'rgb(156 163 175)', fontSize: '15px', padding: '8px' }} className='fa-solid fa-arrow-left me-2 autharrow'></i></Link>
        <div style={{ background: 'rgb(22 42 50)', borderRadius: '5px' }} className='card shadow p-5 '>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='w-100 img-fluid' src={loginpic} alt="" />
            </div>
            <div className='col-lg-6'>
              <h1 style={{ color: '#fefefe' }} className="fw-bolder mt-2">
                Project fair
              </h1>
              <h5 style={{ color: '#fefefe' }} className='fw-bolder mt-2 mb-5'>
                {insideRegister ? 'Create An Account' : 'Login to your Account'}
              </h5>


             <Form>
              {
                insideRegister &&
                <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control style={{ border: '2px solid #4cc473', borderRadius: '15px' }} value={userInputs.username} onChange={e => setUserInputs({ ...userInputs, username: e.target.value })} type="email" placeholder="Username" />
              </FloatingLabel>
              }
             <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control style={{ border: '2px solid #4cc473', borderRadius: '15px' }} value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control style={{ border: '2px solid #4cc473', borderRadius: '15px' }} value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
      </FloatingLabel>

      {
        insideRegister ?
        <div className='mt-3'>

          <button onClick={handleRegister} style={{ background: '#4cc473', borderRadius: '10px', color: '#fefefe', marginBottom: '20px', marginTop: '20px', padding: '10px', border: 'none', fontSize: '15px' }} className=''>Register</button>


          <p style={{ fontSize: '14px' }}>Already have an account? Click here to <Link style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fefefe' }} to={'/login'}>login</Link></p>
        </div>
        :
        <div className='mt-3'>
          <button onClick={handleLogin} style={{ background: '#4cc473', borderRadius: '10px', color: '#fefefe', marginBottom: '20px', marginTop: '20px', padding: '10px', border: 'none', fontSize: '15px' }} className=''>Login</button>
          <p style={{ fontSize: '14px' }}>Don't have an account? Click here to <Link style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fefefe' }} to={'/register'}>Register</Link></p>
        </div>
      }
             </Form>





            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='light' autoClose={3000} />
    </div>
  )
}

export default Auth
