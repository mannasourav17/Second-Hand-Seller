import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'
import {
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from './reducers/productReducers'
import { userLoginReducer } from './reducers/userReducer'
import { userRegisterReducer } from './reducers/userReducer'
import {
  emailReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userDetailsReducer,
  userVerificationReducer,
} from './reducers/userReducer'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userVerification: userVerificationReducer,
  userRegister: userRegisterReducer,
  emailReducer: emailReducer,
  usersList: userListReducer,
  userDelete: userDeleteReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
})

const userDataFromStorage = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : null

const middleware = [thunk]
const initialState = {
  userLogin: { userData: userDataFromStorage },
}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
