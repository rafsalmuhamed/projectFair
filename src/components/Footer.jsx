import React from 'react'

function Footer() {
  return (
    <>
    
    <div style={{height:'250px',background:'rgb(10 27 34)',paddingTop:'30px'}} className='w-100'>
      <div style={{padding:'20px',gap:'30px',color:'#fefefe',fontSize:'20px'}} className='d-flex justify-content-center'>
      <i class="fa-brands fa-facebook-f"></i>
      <i class="fa-brands fa-instagram"></i>
      <i class="fa-brands fa-x-twitter"></i>
      <i class="fa-brands fa-youtube"></i>
      <i class="fa-brands fa-linkedin"></i>
      <i class="fa-brands fa-tiktok"></i>
      <i class="fa-brands fa-threads"></i>
      </div>
      <div className='text-center mt-3'>
<h2 style={{color:'#fefefe'}}>Project FAir</h2>
<p>Copyright &copy; 2024 PROJECT FAIR, Inc</p>
      </div>
      <div style={{gap:'20px',color:'#fefefe',textDecoration:'underline'}} className='d-flex justify-content-center mt-3'>
         <a href=""><p>Privacy Policy</p></a>
         <a href=""><p>Security</p></a>
         <a href=""><p>Accessibility</p></a>
         <a href=""><p>Manage Cookies</p></a>
      </div>


    </div>
    
    </>
  )
}

export default Footer