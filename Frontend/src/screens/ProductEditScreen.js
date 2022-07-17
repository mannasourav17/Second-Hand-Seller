import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../types/productConstants'
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [name, setName] = useState('')

  const [images, setImages] = useState('')

  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [expiresOn, setExpiresOn] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [shippingCharge, setShippingCharge] = useState('0')

  const [price, setPrice] = useState(0)
  const [negotiable, setNegotiable] = useState(false)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector((state) => state.productUpdate)
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin
  const {
    loading: loadingUpdate,
    error: errorUpdate,

    success: successUpdate,
  } = productUpdate
  useEffect(() => {
    dispatch({
      type: PRODUCT_UPDATE_RESET,
    })
    if (!userData || successUpdate) {
      history.push('/')
    }
    if (successUpdate && userData.isAdmin) {
      history.push('/admin/productlist')
    }
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setImages(product.images.map((image) => image.image1).toString())

      setDescription(product.description)
      setCategory(product.category)
      setExpiresOn(product.expiresOn.substring(0, 10))
      setShippingAddress(product?.shippingAddress?.address)
      setShippingCharge(product?.shippingAddress?.shippingCharge)

      setPrice(product?.Cost?.price)
      setNegotiable(product?.Cost?.negotiable)
    }
  }, [history, dispatch, productId, product, successUpdate, userData])
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dh3bp7vbd/upload'
  const CLOUDINARY_UPLOAD_PRESET = 'qwdzopo4'
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    setUploading(true)
    await axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    })
      .then(function (res) {
        setImages(res.data.url)
      })
      .catch(function (err) {
        console.error(err)
      })
    setUploading(false)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct(
        productId,
        name,
        images,
        description,
        category,
        expiresOn,
        shippingAddress,
        shippingCharge,
        price,
        negotiable
      )
    )
  }
  return (
    <>
      <FormContainer>
        <h1>Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name of the property </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter what product do you have'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='images'>
              <Form.Label>
                Image <small> *Upload Image only</small>{' '}
              </Form.Label>

              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {images && (
                <img
                  className='mt-2'
                  src={images}
                  style={{ height: '100px' }}
                  alt='image1'
                />
              )}
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category like: electronics, books, Furniture.. '
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Describe your property </Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter description'
                row='3'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='expiresOn'>
              <Form.Label>How long is your product for sale? </Form.Label>
              <Form.Control
                type='date'
                value={expiresOn}
                onChange={(e) => setExpiresOn(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-5 mt-5' controlId='negotiable'>
              <Form.Check
                type='checkbox'
                label='Is the price Negotiable?'
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='shippingaddress'>
              <Form.Label>Shipping Address </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter where can you deliver'
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='shippingCharge'>
              <Form.Label>Shipping Charge </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter how much will you charge for shipping'
                value={shippingCharge}
                onChange={(e) => setShippingCharge(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='mb-2' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
    </>
  )
}

export default ProductEditScreen
