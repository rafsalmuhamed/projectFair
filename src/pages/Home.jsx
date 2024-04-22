import React, { useEffect, useState } from 'react'
import homepic from '../assets/homepik.webp'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI'



function Home() {
    const navigate = useNavigate()

    // show 3 projects
    const [homeProjects,setHomeProjects] = useState([])
    
    const [loginStatus,setLoginStatus] = useState()
    console.log(homeProjects);
    useEffect(()=>{
        getHomeProjects()
        if(sessionStorage.getItem("token")){
            setLoginStatus(true)
        }else{
            setLoginStatus(false)
        }
    },[])

    const handleProjects = ()=>{
        if(loginStatus){
            navigate('/projects')
        }else{
            toast.warning('Please login to get full access!')
        }
    }

    const getHomeProjects = async()=>{
        try{
            const result = await getHomeProjectsAPI()
            console.log(result);
            if(result.status==200){
                setHomeProjects(result.data)
            }
        }catch(err){
            console.log(err);
        }
    }
  return (
   <>
   <div style={{minHeight:'100vh',background:'rgb(10 27 34)'}} className="w-100 d-flex justify-content-center align-items-center shadow ">
    <div className="container">
        <div className="row align-items-center">
            <div style={{background:'rgb(22 42 50)',padding:'30px',height:'400px',borderRadius:'30px'}} className="col-lg-6 shadow">
                <h1  style={{fontSize:'65px',color:'#fefefe',marginTop:'30px'}}>Project fair</h1>
                <p style={{color:'rgb(156 163 175)',marginTop:'20px',textAlign:'justify'}}>One stop destination for all software development projects. Where user can Add and manage their projects. As well as access all projects available in ProjectFair. Then what are you waiting for!!! </p>

                { loginStatus ?
                <Link to={'/dashboard'}> <button className='shadow btn' style={{marginTop:'20px',color:'#000000',background:'#ebad3f',borderRadius:'13px',padding:'10px'}}>Manage Your Projects<i class="fa-solid fa-arrow-right ms-2"></i></button></Link>
            :


               <Link to={'/login'}> <button className='shadow btn' style={{marginTop:'20px',color:'#000000',background:'#ebad3f',borderRadius:'13px',padding:'10px'}}>Get Started<i class="fa-solid fa-arrow-right ms-2"></i></button></Link>
                }

            </div>
            <div className="col-lg-6">
                <img style={{height:'350px',marginLeft:'100px',width:'600px'}} src={homepic} alt="" />

            </div>
        </div>
    </div>
   </div>
   {/* Projects */}

<div style={{background:'rgb(10 27 34)'}} className=' w-100'>
    <div style={{background:'#4cc273',height:'500px',marginRight:'100px',marginLeft:'100px',borderRadius:'20px'}} className='container text-center' >
        <h1 style={{color:'#fefefe',padding:'30px'}} className='text-center'>Explore Our Projects</h1>
        <marquee behavior="" direction="">
            <div className="d-flex">
               { homeProjects?.length>0 &&
                 homeProjects?.map(project=>(
               
               <div key={project} className="me-5">
                    <ProjectCard displayData={project}/>
                </div>))}
            </div>
        </marquee>

        <button onClick={handleProjects} style={{background:'#4cc473',border:'none',textDecoration:'none',color:'rgb(22 42 50)'}} className=' btn-link mt-3'>Click Here To View More Projects <i className='fa-solid fa-arrow-right ms-1'></i></button>

    </div>

</div>

{/* testimony */}
<div style={{ background:'rgb(10 27 34)',paddingTop:'30px'}} className="d-flex justify-content-center align-items-center flex-column">
    <h1 style={{color:'#fefefe'}}>Testimonials</h1>
    <div style={{gap:'15px'}} className="d-flex justify-content-evenly align-items-center">
    <Card className='shadow mt-5' style={{ width: '18rem',background:'rgb(22 42 50)' ,borderRadius:'20px'}}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-256.png" alt="" />
            <span className='mt-3' style={{color:'#fefefe'}}>Alan Walker</span>
        </Card.Title>
        <Card.Text>
            <div className="d-flex mt-2 mb-3 justify-content-center">
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-regular fa-star'></i>
            </div>
          <p style={{textAlign:'justify'}}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
          </p>
        </Card.Text>
        
      </Card.Body>
    </Card>

{/*testimony 2  */}
    <Card className='shadow mt-5' style={{ width: '18rem',background:'rgb(22 42 50)' ,borderRadius:'20px'}}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-256.png" alt="" />
            <span className='mt-3' style={{color:'#fefefe'}}>Will Smith</span>
        </Card.Title>
        <Card.Text>
            <div className="d-flex mt-2 mb-3 justify-content-center">
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-regular fa-star-half-stroke'></i>
            </div>
          <p style={{textAlign:'justify'}}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
          </p>
        </Card.Text>
        
      </Card.Body>
    </Card>

    {/*testimony 3  */}

    <Card className='shadow mt-5' style={{ width: '18rem',background:'rgb(22 42 50)' ,borderRadius:'20px'}}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-256.png" alt="" />
            <span className='mt-3' style={{color:'#fefefe'}}>Bale</span>
        </Card.Title>
        <Card.Text>
            <div className="d-flex mt-2 mb-3 justify-content-center">
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-solid fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-regular fa-star'></i>
                <i style={{color:'#4cc273'}} className='fa-regular fa-star'></i>
            </div>
          <p style={{textAlign:'justify'}}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
          </p>
        </Card.Text>
        
      </Card.Body>
    </Card>

    </div>
</div>
<ToastContainer position='top-center' theme='light' autoClose={3000}/>
   </>
  )
}

export default Home