import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userData, loading, error } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userData) {
      history.push(redirect)
    }
  }, [history, userData, redirect])
  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>SIGN IN</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='mt-5'>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>{' '}
      <Row className='py-3'>
        <Col>
          New Customer?
          {/* here redirect is like storing previous request 
          if i am not logged in and then click on add to cart item then it will redirect me to 
          login page and if i am not registerd then i need to register and after registration i will be
          again redirected to shipping page  */}
          <Link
            className='underlined1 '
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            <span className='btn-primary'> Register</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
