import React, { useState, useEffect } from 'react'
import Meta from '../components/Meta'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Carousel from 'react-bootstrap/Carousel'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { sendEmail } from '../actions/userActions'
import { PRODUCT_REVIEW_RESET } from '../types/productConstants'
const ProductScreen = ({ match, history }) => {
  const [text, setText] = useState('')
  const [comment, setComment] = useState('')

  const [sendMail, setSendMail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const dispatch = useDispatch()
  const emailReducer = useSelector((state) => state.emailReducer)
  const {
    loading: loadingEmail,
    error: errorEmail,
    data: dataEmail,
  } = emailReducer

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin
  useEffect(() => {
    if (successReview) {
      setComment('')
      dispatch({
        type: PRODUCT_REVIEW_RESET,
      })
    }
    dispatch(listProductDetails(match.params.id))
  }, [match.params.id, dispatch, successReview])

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, comment))
  }
  const emailSubmit = (e) => {
    e.preventDefault()
    setEmailSent(true)

    dispatch(
      sendEmail(
        product?.seller?.selleremail,
        text,
        userData?.name,
        userData?.address,
        product?.name,
        userData?.email,
        userData?.contact?.phone_no
      )
    )

    setText('')

    setSendMail(false)
    setTimeout(() => {
      setEmailSent(false)
    }, 10000)
  }
  const sendEMAIL = () => {
    setSendMail(true)
  }
  const cancelHandler = () => {
    setSendMail(false)
  }
  return (
    <>
      <Link to='/' className='btn btn-success my-3'>
        Go Back
      </Link>
      <br />
      {userData && userData._id === product.user && (
        <Link
          to={`/admin/product/${match.params.id}/edit`}
          className='btn btn-primary my-3'
        >
          Edit Product
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row className='row mb-2'>
            <Col md={6} className='image-area'>
              <Carousel>
                {product.images.map((image) => (
                  <Carousel.Item key={image._id}>
                    <Image
                      className='d-block w-100'
                      src={image?.image1}
                      alt='First slide'
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col className='borderaround setheight' md={6}>
              <p className='details'>
                <i className='fas fa-info'></i> General Details
              </p>

              <Row>
                <Col className='product  ' md={4} sm={4} xs={4}>
                  <ul>
                    <li> Product Id:</li>

                    <li> Posted On:</li>
                    <li> Expires On:</li>
                    <li> Product:</li>
                  </ul>
                </Col>
                <Col md={8} sm={8} xs={8}>
                  <ul>
                    <li>{product._id}</li>

                    <li>{product?.createdAt?.substring(0, 10)}</li>
                    <li>{product?.expiresOn?.substring(0, 10)}</li>
                    <li> {product.name}</li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          {loadingEmail && <Loader />}
          {errorEmail && <Message variant='danger'>{errorEmail}</Message>}
          {/* {console.log(dataEmail?.response)} */}
          {dataEmail && emailSent && (
            <Message variant='success'>{dataEmail.response}</Message>
          )}
          {sendMail && userData && (
            <Row id='email' className='mt-5'>
              <Col md={10} sm={12} className='formAround'>
                <Form onSubmit={emailSubmit}>
                  <div className='text-area1'>
                    <span className='text-area2'>Send Email</span>

                    <p className='text-area3'>
                      Get in touch with {product?.seller?.sellername}
                    </p>
                  </div>
                  <Row>
                    <Col md={4} sm={4} xs={4}>
                      <ul className='marginshift'>
                        <p>{''}</p>
                        <br />
                        <li className='mt-2'>Your Name:</li>
                        <li>Your Email:</li>
                        <li>Your Phone No:</li>
                        <li>Your Message:</li>
                      </ul>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                      <p className='cross'>
                        <button
                          onClick={cancelHandler}
                          className=' cancel m-auto '
                        >
                          {' '}
                          <i className='far fa-window-close'></i>
                        </button>
                      </p>
                      <li>{userData.name}</li>
                      <li>{userData.email}</li>
                      <li>{userData?.contact?.phone_no}</li>
                      <li>
                        <textarea
                          style={{ maxWidth: '100%', borderRadius: '5px' }}
                          id='w3review'
                          name='text'
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows='8'
                          cols='55'
                          required
                        />
                      </li>
                    </Col>
                    <button className='button ' type='submit'>
                      Send Email
                    </button>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
          <Row>
            <Col className='borderaround mt-5' md={10}>
              <p className='details'>
                <i className='fas fa-info'></i> Seller Details
              </p>

              <Row className='mb-2'>
                <Col className='product' md={4} sm={2} xs={2}>
                  <ul>
                    <li> Name:</li>

                    <li> Email:</li>
                    <li> Address:</li>
                    <li>Phone:</li>
                    <li></li>
                  </ul>
                </Col>
                <Col md={8} sm={10} xs={10}>
                  <ul>
                    <li>{product?.seller?.sellername}</li>

                    <li>
                      {/* {product?.seller?.selleremail}{' '} */}
                      <span>
                        <button
                          className='emailbutton btn-success'
                          onClick={sendEMAIL}
                        >
                          Send Email
                        </button>
                      </span>
                    </li>
                    <li>{product?.seller?.selleraddress}</li>
                    <li>
                      {product?.seller?.phoneNo?.mobile}{' '}
                      <span>
                        {product?.seller?.phoneNo?.isVerified ? (
                          <span>
                            <i className='fas fa-mobile-alt'></i>
                            <span className='underlined'>verified</span>
                          </span>
                        ) : (
                          <span>
                            <i className='fas fa-mobile-alt'></i>
                            <span className='underlined'>unverified</span>
                          </span>
                        )}{' '}
                      </span>
                    </li>
                    <li></li>
                  </ul>
                </Col>
              </Row>
              {sendMail && !userData && (
                <Message variant='danger'>
                  You need to be logged in to use this feature.{' '}
                  <span>
                    <Link to='/login'>Log In</Link> to Continue
                  </span>
                </Message>
              )}
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col className='borderaround mt-5 ' md={10}>
              <p className='details'>
                <i className='fas fa-info'></i> Pricing Details
              </p>
              <Row>
                <Col className='product' md={6} sm={6} xs={4}>
                  <ul>
                    <li>Total Price:</li>
                    {product?.Cost?.negotiable && <li>Negotiable:</li>}
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={8}>
                  <ul>
                    <li> Rs {product?.Cost?.price}</li>
                    {product?.Cost?.negotiable && <li>Yes</li>}
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className='borderaround mt-5' md={10} sm={12} xs={12}>
              <p className='details '>
                <i className='fas fa-info'></i> Description
              </p>
              <p className='detailsdescription'>{product.description}</p>
            </Col>
          </Row>
          <Row>
            <Col className='borderaround mt-5' md={10}>
              <p className='details'>
                <i className='fas fa-info'></i> Delivery Information
              </p>
              <Row>
                <Col className='product' md={6} sm={6} xs={5}>
                  <ul>
                    <li>Delivery Area:</li>
                    <li>Delivery Charge:</li>
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={7}>
                  <ul>
                    <li>{product?.shippingAddress?.address} </li>
                    <li>
                      {' '}
                      Rs {''}
                      {product?.shippingAddress?.shippingCharge}
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col md={6}>
              <h4>Buyer's Speak</h4>
              {product.reviews.length === 0 && (
                <Message variant='primary'>Be the First One to Review</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    {/* <strong>{review.name}</strong>
                    <p>{review.createdAt.substring(0, 10)}</p> */}
                    <p>
                      Q.<span className='comment'> {review.comment} </span>
                      <span className='review'>
                        <span style={{ color: '#32a897', fontWeight: '800' }}>
                          --Posted By <strong>{review.name}</strong> on{' '}
                          <strong> {review.createdAt.substring(0, 10)} </strong>{' '}
                        </span>
                      </span>
                    </p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <p>Post Your Speak</p>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}

                  {loadingReview && <Loader />}
                  {userData ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='comment'>
                        {/* <Form.Label>Comment</Form.Label> */}
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Post
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='primary'>
                      You must <Link to='/login'>Log In</Link> to post your
                      speak{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
