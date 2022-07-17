import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='danger'
      style={{
        width: '100px',
        margin: 'auto',
        height: '100px',
        margin: 'auto',
        marginTop: '100px',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
//this is also very nice as no image is required locally
