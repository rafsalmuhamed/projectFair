import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { getAllProjectsAPI } from '../services/allAPI'


function Projects() {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization" : `Bearer ${token}`
    }
    try{
      const result = await getAllProjectsAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status==200){
        setAllProjects(result.data)
      }

    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <Header/>
   
      <div style={{background:'rgb(10 27 34)',paddingLeft:'50px',paddingRight:'50px',paddingBottom:'100px',paddingTop:'150px'}} className='container-fluid'> 
      <div className='d-flex justify-content-between'>
        <h1 style={{color:'#fefefe'}}>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)}  style={{ border:'2px solid #fefefe',background:'',borderRadius:'20px',color:'#000000'}} type="text" className='form-control w-25' placeholder='Search Project by Language'/>
  
      </div>
      <Row className=" mt-5 ">
       { allProjects?.length>0?
       allProjects?.map(project=>(
        <Col key={project} sm={12} md={6} lg={2}>
          <ProjectCard displayData={project}/>
        </Col>
       ))
        :
        <div className='text-danger'>project not found</div>
        }
      </Row>
  
      </div>
   
    </>
  )
}

export default Projects