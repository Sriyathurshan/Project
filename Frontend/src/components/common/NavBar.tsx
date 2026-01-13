import React from 'react'
import { HiOutlineUser ,HiOutlineShoppingBag,HiBars3BottomRight} from 'react-icons/hi2'
import SearchBar from './SearchBar'

const NavBar = () => {
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
            <div className="flex items-centerspace-x-6">
              <a href="/profile" className="text-gray-700 hover:text-blue-500"> <HiOutlineUser className='h-14 w-6 text-gray-700'/> </a>
              <button className='relative hover:text-black'>
                <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5'>3</span>
              </button>
              <SearchBar/>
            </div>
            <button className="md:hidden text-gray-700"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
              </svg>
            </button>
        </div>
      </nav>
    </> 
  )
}

export default NavBar