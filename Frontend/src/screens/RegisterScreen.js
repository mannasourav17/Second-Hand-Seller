import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { verify } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const userVerification = useSelector((state) => state.userVerification)
  const { verification, loading, error } = userVerification
  const userRegister = useSelector((state) => state.userRegister)
  const {
    userData,
    loading: loadingRegister,
    error: errorRegister,
  } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userData) {
      history.push(redirect)
    }
  }, [history, redirect, userData])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else {
      dispatch(verify(name, email, password, contact, address))
    }
  }
  return (
    <FormContainer>
      <h1>SIGN UP</h1>
      <Form onSubmit={submitHandler} className='mt-5'>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>
            Email Address{' '}
            <small className='slanted'>
              {' '}
              *Be sure to enter your valid email address
            </small>
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label> Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='contact No'>
          <Form.Label>
            Mobile No{' '}
            <small className='slanted'>
              * Be sure to enter a correct 10 digit number starting with 9
            </small>
          </Form.Label>
          <Form.Control
            type='contact'
            placeholder='Enter Mobile No'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>{' '}
      <Row className='py-3'>
        {/* {!loading && ()} */}
        <Col>
          Already Have an Account?
          <Link
            className='underlined1 '
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
            <span className='btn-primary mb-3 '> Login</span>
          </Link>
        </Col>
      </Row>
      {loading && (
        <Spinner
          animation='border'
          role='status'
          variant='danger'
          style={{
            width: '100px',
            margin: 'auto',
            height: '100px',
            margin: 'auto',
            display: 'block',
          }}
        />
      )}
      {verification && (
        <Message variant='success'>{verification.response}</Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
      {loadingRegister && <Loader />}
    </FormContainer>
  )
}

export default RegisterScreen
