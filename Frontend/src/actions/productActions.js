import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_SUCCESS,
} from '../types/productConstants'
import axios from 'axios'
// import {
//   USER_DELETE_FAIL,
//   USER_DELETE_REQUEST,
//   USER_DELETE_SUCCESS,
// } from '../types/userConstants'
export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_RESET,
    })
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    })

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    )
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//delete product by an admin

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })
    const {
      userLogin: { userData },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    await axios.delete(
      `/api/products/${id}`,

      config
    )
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//create the product
//this function simply does not take anything and creates a sample product only which later can be edited
export const createProduct = (
  name,
  image1,
  description,
  category,
  expiresOn,
  address,
  shippingCharge,
  price,
  negotiable
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })
    const {
      userLogin: { userData },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    }
    console.log('reached here')
    console.log(config)
    const { data } = await axios.post(
      `/api/products`,
      {
        name,
        images: [{ image1 }],
        description,
        category,
        expiresOn,
        address,
        shippingCharge,
        price,
        negotiable,
      },
      config
    )
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//update product

export const updateProduct = (
  id,
  name,
  image1,
  description,
  category,
  expiresOn,
  address,
  shippingCharge,
  price,
  negotiable
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })
    const {
      userLogin: { userData },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    }
    console.log('reached here')
    console.log(config)
    const { data } = await axios.put(
      `/api/products/${id}`,
      {
        name,
        images: [{ image1: image1 }],
        description,
        category,
        expiresOn,
        address,
        shippingCharge,
        price,
        negotiable,
      },
      config
    )
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//create review
export const createProductReview = (productId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_REQUEST,
    })
    const {
      userLogin: { userData },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${userData.token}`,
      },
    }

    await axios.post(`/api/products/${productId}/reviews`, { comment }, config)
    dispatch({
      type: PRODUCT_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
