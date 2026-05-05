import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from "./components/layout/UserLayout"
import Home from './pages/Home' 
import {Toaster} from "sonner"
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Collection from './pages/Collection'
import ProductDetails from './components/product/ProductDetails'
import Checkout from './components/cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from './pages/MyOrdersPage'
import AdminLayout from './components/admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserManagement from './pages/UserManagement'
import ProductManagement from './components/admin/ProductManagement'
import EditProductPage from './components/admin/EditProductPage'
import OrderManagement from './components/admin/OrderManagement'

import {Provider} from "react-redux"
import store from "./redux/store"


const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path= "/" element ={<UserLayout />}>
          <Route index element ={<Home />} />
          <Route path= "login" element ={<Login />} />
          <Route path= "Register" element ={<Register />} />
          <Route path="Profile" element={<Profile/>}/>
          <Route path="collection" element={<Collection/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
          <Route path="order/:id" element={<OrderDetailsPage/>}/>
          <Route path="my-orders" element={<MyOrdersPage/>}/>
        </Route>
        <Route>
        {/*admin layout*/}
          <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<AdminHomePage/>}/>
            <Route path="users" element={<UserManagement/>}/>
            <Route path="products" element={<ProductManagement/>}/>
            <Route path="products/:id/edit" element={<EditProductPage/>}/>
            <Route path="orders" element={<OrderManagement/>}/>         
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}


export default App
