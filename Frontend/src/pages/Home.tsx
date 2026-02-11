import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/product/GenderCollectionSection'
import NewArrivals from '../components/product/NewArrivals'

const Home = () => {
  return (
    <div>
        <Hero />
        <GenderCollectionSection/>
        <NewArrivals />
    </div>
  )
}

export default Home