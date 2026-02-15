import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/product/GenderCollectionSection'
import NewArrivals from '../components/product/NewArrivals'
import ProductDetails from '../components/product/ProductDetails'

const Home = () => {
  return (
    <div>
        <Hero />
        <GenderCollectionSection/>
        <NewArrivals />
        <h2 className='text-3xl text-center font-bold mb-4 '> Best Seller</h2>
        <ProductDetails/>
    </div>
  )
}

export default Home