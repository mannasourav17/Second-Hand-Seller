import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Product = ({ product }) => {
  return (
    <>
      <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img className='card-image' src={product.images[0].image1} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='p' className='name-label'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='h3'>Rs {product.Cost.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
