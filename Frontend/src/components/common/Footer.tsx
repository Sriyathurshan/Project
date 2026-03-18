import { FiPhoneCall } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'

const Footer = () => {
  return (
    <footer className='border-t py-12 bg-white'>
        <div className='container mx-auto grid grid-cols-1 items-start text-left md:grid-cols-4 gap-8 px-4 lg:px-0 text-gray-500'>
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
                <button type='submit' className='hover:bg-black text-white px-2 py-2 rounded-r-lg transition-all bg-gray-900'>
                    Subscribe
                </button>
            </form>
            </div>
            {/* shoplinks */}
            <div className="lg:pl-10">
                <h3 className='text-lg text-gray-800 mb-4'> Shop Links</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li><a href='#' className=' hover:text-black'>Men's top wear</a></li>
                    <li><a href='#' className=' hover:text-black'>Women's top wear</a></li>
                    <li><a href='#' className=' hover:text-black'>Men's bottom wear</a></li>
                    <li><a href='#' className=' hover:text-black'>Women's bottom wear</a></li>
                </ul>
            </div>
            <div className="lg:pl-10">
                <h3 className='text-lg text-gray-800 mb-4'> Support</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li><a href='#' className=' hover:text-black'>Contact Us</a></li>
                    <li><a href='#' className=' hover:text-black'>About Us</a></li>
                    <li><a href='#' className=' hover:text-black'>FAQs</a></li>
                    <li><a href='#' className=' hover:text-black'>Features</a></li>
                </ul>
            </div>
            <div className='items-start text-left'>
                <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                <div className='flex space-x-4 mb-6'>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-blue-500'> <TbBrandMeta className='h-5 w-5'/> </a>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-blue-500'> <IoLogoInstagram className='h-5 w-5'/> </a>
                    <a href='#' target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-blue-500'> <RiTwitterXLine className='h-5 w-5'/> </a>
                </div>
                <div>
                    <p>
                        call us
                    </p>
                    <p>
                        <FiPhoneCall className='inline-block mr-2'/>
                        <a href='tel:+94 11 2233 445'>+94 11 2233 445</a>
                    </p>
                </div>
            </div>
        </div>
        <div className='mt-8 text-center text-sm text-gray-400 tracking-tighter border-t pt-6 px-4 lg:px-0'>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer