import {
  EMAIL_RESET,
  EMAIL_SEND_FAIL,
  EMAIL_SEND_REQUEST,
  EMAIL_SEND_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_VERIFICATION_LINK_FAIL,
  USER_VERIFICATION_LINK_REQUEST,
  USER_VERIFICATION_LINK_RESET,
  USER_VERIFICATION_LINK_SUCCESS,
} from '../types/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFICATION_LINK_REQUEST:
      return {
        loading: true,
      }

    case USER_VERIFICATION_LINK_SUCCESS:
      return {
        loading: false,
        verification: action.payload,
      }
    case USER_VERIFICATION_LINK_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_VERIFICATION_LINK_RESET:
      return {}

    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_REGISTER_RESET:
      return {}

    default:
      return state
  }
}

//for sending email to the seller

export const emailReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SEND_REQUEST:
      return {
        loading: true,
      }

    case EMAIL_SEND_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case EMAIL_SEND_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case EMAIL_RESET:
      return {}
    default:
      return state
  }
}
//GET ALL USERS BY AN ADMIN
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      }

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      }
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

//DELETE USER BY ADMIN

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      }

    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

//USER UPDATE REDUCER

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      }

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      }
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_UPDATE_RESET:
      return {}

    default:
      return state
  }
}
//user details

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}
