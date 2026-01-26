import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterFill, RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'

const Footer = () => {
  return (
    <footer className='border-t py-12 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0 text-center text-gray-500'>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'> Newsletter</h3>
                <p className='text-gray-500 mb-4'>
                    Be the first to hear about new products, exclusive events and online offers.
                </p>
                <p className='text-black font-medium mb-6'> Sign up and get 10% off your first order</p>
            <form className='flex'>
                <input 
                    type="email"
                    placeholder='Enter your email'
                    className='p-3 w-full text-sm border-t border-b border-l border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
                    required
                />
                <button type='submit' className='hover:bg-black text-white px-4 py-2 rounded-r-lg transition-all bg-gray-900'>
                    Subscribe
                </button>
            </form>
            </div>
            {/* shoplinks */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'> Shop Links</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li><a href='#' className=' hover:text-black'>Men's top wear</a></li>
                    <li><a href='#' className=' hover:text-black'>Women's top wear</a></li>
                    <li><a href='#' className=' hover:text-black'>Men's bottom wear</a></li>
                    <li><a href='#' className=' hover:text-black'>Women's bottom wear</a></li>
                </ul>
            </div>
            <div className='flex flex-col items-center md:items-end space-y-4'>
                <a href='#' className='text-gray-700 hover:text-blue-500'>Support</a>
                <a href='#' className='text-gray-700 hover:text-blue-500'>Contact Us</a>
                <a href='#' className='text-gray-700 hover:text-blue-500'>About us</a>
                <a href='#' className='text-gray-700 hover:text-blue-500'>FAQs</a>
                <a href='#' className='text-gray-700 hover:text-blue-500'>Features</a>
            </div>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-blue-500'> <TbBrandMeta className='h-5 w-5'/> </a>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-blue-500'> <IoLogoInstagram className='h-5 w-5'/> </a>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-blue-500'> <RiTwitterXLine className='h-5 w-5'/> </a>
                    <div>
                        call us
                    </div>
                </div>

            </div>
        </div>
    </footer>
  )
}

export default Footer