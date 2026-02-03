import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from "./components/layout/UserLayout"
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element ={<UserLayout />}>
          <Route index element ={<Home />} />
        </Route>
        <Route>
        {/*admin layout*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
