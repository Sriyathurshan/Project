import React from 'react'
import { HiOutlineUser ,HiOutlineShoppingBag,HiBars3BottomRight} from 'react-icons/hi2'
import SearchBar from './SearchBar'
import CartDrawer from '../layout/CartDrawer'
import { IoMdCloseCircle } from 'react-icons/io'

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const [navdrawerOpen, setNavDrawerOpen] = React.useState(false) 
      const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
      }
      const toggleNavDrawer = () => {
        setNavDrawerOpen(!navdrawerOpen)
      } 
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <div > <a href="/" className="text-2xl font-bold text-gray-800"> Logo </a> </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-500">Products</a>
              <a href="#" className="text-gray-700 hover:text-blue-500">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/profile" className="text-gray-700 hover:text-blue-500"> <HiOutlineUser className='h-14 w-6 text-gray-700'/> </a>
              <button onClick={toggleCartDrawer} className='relative hover:text-black'>
                <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5'>3</span>
              </button>
              <SearchBar/>
            </div>
            <button onClick={toggleNavDrawer} className="md:hidden text-gray-700"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
              </svg>
            </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${ navdrawerOpen ? 'translate-x-0' : '-translate-x-full' }`}>
        <div className='flex justify-end p-4'>
            <button onClick={toggleNavDrawer}>
                <IoMdCloseCircle className='h-6 w-6 text-gray-600'/>
            </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Navigation Menu</h2>
          <ul>
            <li><a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Home</a></li>
            <li><a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Products</a></li>
            <li><a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Services</a></li>
            <li><a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Contact</a></li>
          </ul>
        </div>
        </div>
    </>
  )
}

export default NavBar