import React from 'react'
import { Link } from 'react-router-dom'
import Featured from "../../assets/featured.webp"


const FeaturedCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
            {/* Left Section */}
            <div className='lg:w-1/2 p-8 lg:p-16'>
                <h2 className='text-lg font-semibold mb-2'>Comfort and style</h2>
                <h2 className='text-4xl font-semibold mb-6'>Apparel made for your everyday life</h2>
                <p className='text-gray-700 mb-6'>Discover our exclusive featured collection, handpicked for style and quality. Elevate your wardrobe with our latest arrivals.</p>
                <Link to='/collections/featured' className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300'>Shop Now </Link>
            </div>

            {/* Right Section */}
            <div className='lg:w-1/2'>
                <img src={Featured} alt="Featured Collection" className='w-full h-full object-cover rounded-r-3xl'/>
            </div>
        </div>
    </section>
  )
}

export default FeaturedCollection