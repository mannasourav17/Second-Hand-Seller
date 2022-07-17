import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'

const NotFoundScreen = () => {
  return (
    <>
      <Row>
        <img src='https://i.imgur.com/lKJiT77.png' />
      </Row>
      <Row>
        <Col md={3}></Col>

        <Col md={6}>
          <h1 style={{ textAlign: 'Center' }}>
           This Hungry Dog Ate This Page
          </h1>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Row className='docenter'>
        <Link to='/' className='btn btn-success '>
          GO BACK
        </Link>
      </Row>
    </>
  )
}

export default NotFoundScreen
