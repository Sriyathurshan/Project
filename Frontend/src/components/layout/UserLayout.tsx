import Header from "../common/Header"
import Footer from '../common/Footer'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <>
    <Header />
    <main>
        <Outlet />
    </main>
    <Footer/>
    </>
    
  )
}

export default UserLayout