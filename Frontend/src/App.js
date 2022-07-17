import './App.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Landing from '../src/screens/Landing'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductScreen from '../src/screens/ProductScreen'
import LoginScreen from '../src/screens/LoginScreen'
import RegisterScreen from '../src/screens/RegisterScreen'
import UserListScreen from '../src/screens/UserListScreen'
import ProductListScreen from '../src/screens/ProductListScreen'
import ProductEditScreen from '../src/screens/ProductEditScreen'
import UserUpdateScreen from '../src/screens/UserUpdateScreen'
import AboutUsScreen from '../src/screens/AboutUsScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import ProductCreateScreen from '../src/screens/ProductCreateScreen'
import EmailVerificationScreen from '../src/screens/EmailVerificationScreen'

const App = () => {
  return (
    <Router>
      <>
        <Header />

        <main className='py-5'>
          <Container>
            <Switch>
              <Route path='/' component={Landing} exact />
              <Route path='/search/:keyword' component={Landing} exact />
              <Route path='/page/:pageNumber' component={Landing} exact />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={Landing}
                exact
              />
              <Route path='/login' component={LoginScreen} exact />
              <Route path='/register' component={RegisterScreen} exact />
              <Route path='/about' component={AboutUsScreen} exact />
              <Route path='/product/:id' component={ProductScreen} exact />
              <Route
                path='/admin/userlist'
                component={UserListScreen}
                exact
              />{' '}
              <Route
                path='/admin/productlist'
                component={ProductListScreen}
                exact
              />
              <Route
                path='/admin/productlist/:pageNumber'
                component={ProductListScreen}
                exact
              />
              <Route path='/createproduct' component={ProductCreateScreen} />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
                exact
              />
              <Route
                path='/admin/users/:id/edit'
                component={UserUpdateScreen}
                exact
              />
              <Route
                path='/verify/:token'
                component={EmailVerificationScreen}
                exact
              />
              <Route component={NotFoundScreen} />
            </Switch>
          </Container>
        </main>
      </>
      <Footer />
    </Router>
  )
}

export default App
