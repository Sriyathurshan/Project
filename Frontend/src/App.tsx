import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from "./components/layout/UserLayout"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= "/" element ={<UserLayout />}> {/*user layout*/}</Route>
      <Route>
        {/*admin layout*/}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}


export default App
