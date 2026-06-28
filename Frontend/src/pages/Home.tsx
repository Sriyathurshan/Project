import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/product/GenderCollectionSection'
import NewArrivals from '../components/product/NewArrivals'
import ProductDetails from '../components/product/ProductDetails'
import ProductGrid from '../components/product/ProductGrid'
import FeaturedCollection from '../components/product/FeaturedCollection'
import FeaturesSection from '../components/product/FeaturesSection'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { fetchProductsByFilters } from '../redux/slice/productsSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import type { Product } from '../redux/types'


const Home = () => {
const dispatch = useAppDispatch()
const {products,loading,error} = useAppSelector((state)=>state.products)
const [bestSellerProduct,setBestSellerProduct] =useState<Product | null>(null)

useEffect(()=>{
    dispatch(
        fetchProductsByFilters({
            gender:"Women",
            category:"Bottom Wear",
            limit:8
        })
    )
    const fetchBestSeller = async() =>{
        try{
            const response = await axios.get<Product>(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
            )
            setBestSellerProduct(response.data)
        }
        catch(error){
            console.error(error)
        }
    }
    fetchBestSeller()
},[dispatch])

  return (
    <div>
        <Hero />
        <GenderCollectionSection/>
        <NewArrivals />
        <h2 className='text-3xl text-center font-bold mb-4 '> Best Seller</h2>
        {bestSellerProduct ? (
            <ProductDetails productId={bestSellerProduct._id}/>
        ):(
            <p className='text-center'>Loading Best Seller Product...</p>
        )}
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4 '> Top wears for women</h2>
          <ProductGrid products={products} loading={loading} error={error}/>  
        </div>
        <FeaturedCollection/>
        <FeaturesSection/>
    </div>
  )
}

export default Home
