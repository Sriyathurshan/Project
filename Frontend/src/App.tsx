import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from "./components/layout/UserLayout"
import Home from './pages/Home' 
import {Toaster} from "sonner"
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Collection from './pages/Collection'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path= "/" element ={<UserLayout />}>
          <Route index element ={<Home />} />
          <Route path= "login" element ={<Login />} />
          <Route path= "Register" element ={<Register />} />
          <Route path="Profile" element={<Profile/>}/>
          <Route path="collection" element={<Collection/>}/>
        </Route>
        <Route>
        {/*admin layout*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
