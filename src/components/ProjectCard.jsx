import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl';


function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Card onClick={handleShow} className='shadow' style={{ width: '200px',height:'250px',marginTop:'50px',borderRadius:'20px',background:'#b0c4e8' }}>
      <Card.Img style={{borderRadius:'20px'}} width={"100px"} height={'150px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} />
      <Card.Body className='text-center'>
        <Card.Title>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt="" />
            </div>
            <div className='col-lg-6'>
              <h3>Project Details</h3>
              <h5><span className='fw-bolder'>Languages Used</span>: {displayData?.language}</h5>
              <p style={{textAlign:'justify'}}><span className='fw-bolder'>Description: </span>{displayData?.overview}</p>
            </div>

          </div>
          <div className="float-start mt-2">
            <a href={displayData?.github} target='_blank' className='btn' onClick={handleClose}><i className='fa-brands fa-github'></i></a>
            <a href={displayData?.website} target='_blank' className='btn' onClick={handleClose}><i className='fa-solid fa-link'></i></a>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{background:'#4cc273',borderRadius:'20px'}} variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard