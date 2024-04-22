import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'

function Dashboard() {

  const [displayName,setDisplayName] = useState()
  useEffect (()=>{
  if(sessionStorage.getItem("existingUser")){
    const{username}= JSON.parse(sessionStorage.getItem("existingUser"))
    setDisplayName(username)
  }else{
    setDisplayName("")
  }
  },[])
  return (
    <>
    <Header insideDashBoard={true}/>
    <div className='container-fluid' style={{marginTop:'',background:'rgb(10 27 34)',padding:'50px',paddingTop:'150px'}}>
      <p style={{color:'#fefefe',fontSize:'20px'}} >Welcome <span className='text-warning'>{displayName?.split(" ")[0]}</span>,</p>
      <div style={{marginBottom:'200px'}} className="row mt-5">
        <div className="col-lg-8">
          <View/>

        </div>
        <div className="col-lg-4">
          <Profile/>

        </div>
      </div>

    </div>

    
    </>
  )
}

export default Dashboard