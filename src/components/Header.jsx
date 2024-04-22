import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/TokenAuth'

function Header({insideDashBoard}) {
  const {isAuthorised,setAuthorised}=useContext(tokenAuthContext)

const navigate = useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    setAuthorised(false)
    navigate('/')

  }
  return (
    <>
    <Navbar style={{zIndex:'1',color:'#4cc473',background:'rgb(10 27 34)',border:'none',height:'90px'}} className='top-0 shadow position-fixed w-100'>
      <Container>
        <Navbar.Brand>
          <Link style={{textDecoration:'none'}} to={'/'}><p style={{color:'#4cc473',fontSize:'30px'}}>Project Fair</p></Link>
        </Navbar.Brand>
       {insideDashBoard &&
        <div className="ms-auto">
          <button onClick={logout} style={{background:'#4cc473',borderRadius:'10px',color:'#fefefe',marginBottom:'20px',marginTop:'20px',padding:'10px',border:'none',fontSize:'15px'}} className="">Logout</button>
        </div>}
      </Container>

    </Navbar>
    
    
    </>
  )
}

export default Header