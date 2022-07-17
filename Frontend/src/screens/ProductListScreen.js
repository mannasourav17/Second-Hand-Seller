import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Paginate from '../components/Paginate'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'
const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, loading, error, page, pages } = productList
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin
  const productDelete = useSelector((state) => state.productDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete
  var i = 1
  useEffect(() => {
    if (userData && userData.isAdmin) {
      dispatch(listProducts('', pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userData, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <h1>Products</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>SN</th>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>OWNER</th>
                <th>CREATED ON</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{i++}</td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>Rs {product.Cost.price}</td>
                  <td>{product.category}</td>
                  <td>{product.seller.sellername}</td>
                  <td>{product.createdAt.substring(0, 10)}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
