import React, { useContext, useEffect, useState } from 'react'
import Edit from './Edit'
import Add from './Add'
import { getUserProjectsAPI, removeProjectAPI } from '../services/allAPI';
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI';


function View() {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const {addResponse,setAddResponse} = useContext(addResponseContext)

  const [userProject, setUserProject] = useState([])
  console.log(userProject);
  useEffect(() => {
    getUserProjects()
  }, [addResponse,editResponse])

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getUserProjectsAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setUserProject(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteProject = async (projectId)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      // api call
      const result = await removeProjectAPI(projectId,reqHeader)
      if(result.status==200){
        getUserProjects()
      }else{
        console.log(result);
      }
    }
  }
  return (
    <>
      <div className="d-flex justify-content-between w-100">
        <h2>All Projects</h2>
        <div><Add /></div>
      </div>
      <div className="mt-4">

        { userProject?.length>0?
        userProject?.map(project=>(
          <div style={{border:'1px solid #fefefe',padding:'10px',marginBottom:'10px',borderRadius:'10px',height:'50px'}} className="d-flex justify-content-between ">
          <p style={{ fontSize: '20px', color: '#fefefe', fontWeight: '200' }}>{project?.title}</p>
          <div style={{ gap: '15px' }} className="icons d-flex">
            <div style={{ marginTop: '', gap: '50px' }} className="d-flex justify-content-between">

              <div> <Edit project={project} /></div>

              <div><a href={project?.github} target='_blank'><i style={{ background: 'none', color: '#fefefe', border: 'none', fontSize: '18px', marginTop: "5px" }} className='fa-brands fa-github'></i></a></div>
              <div><button onClick={()=>handleDeleteProject(project?._id)} style={{ background: 'none', color: '#fefefe', border: 'none' }}><i className='fa-solid fa-trash'></i></button>

              </div>

            </div>

          </div>
        </div>
        ))
        :
        <div className='text-warning'>No project uploaded yet</div>
        }
      </div>

    </>
  )
}

export default View