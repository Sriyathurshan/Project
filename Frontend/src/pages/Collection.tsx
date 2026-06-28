import React, { useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/product/FilterSidebar'
import SortOptions from '../components/product/SortOptions'
import ProductGrid from '../components/product/ProductGrid'
import type { Product } from '../redux/types'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slice/productsSlice'
import type { RootState, AppDispatch } from "../redux/store";

const Collection = () => {
    const {collection} =useParams()
    const [searchParams] =useSearchParams()
    const dispatch = useDispatch<AppDispatch>()
    const { products, loading, error } = useSelector((state: RootState) => state.products)
    const sideBarRef = React.useRef<HTMLDivElement | null>(null)
    const [isSideBarOpen, setIsSideBarOpen] = React.useState(false)
    const queryParams = Object.fromEntries([...searchParams])

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    useEffect(()=>{
        dispatch(fetchProductsByFilters({collection,...queryParams}))
    },[dispatch,collection,searchParams])

    const handleClickOutside = (e: MouseEvent) => {
        if (sideBarRef.current && e.target instanceof Node && !sideBarRef.current.contains(e.target)) {
            setIsSideBarOpen(false)
        }
    }

    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
        document.removeEventListener('mousedown', handleClickOutside)
    }
}, [])
    



  return (
    <div className="flex flex-col lg:flex-row">
        {/* mobile filter button */}
        <button className= "lg:hidden border p-2 flex justify-center items-center"
        onClick={toggleSideBar}>
            <FaFilter className='mr-2 text-gray-700'/>
        </button>
        {/* Filter Sidebar */}
        <div ref={sideBarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed inset-y-0 z-50 lft-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-1/4`}>
            <FilterSidebar />
        </div>

        <div className='flex-grow p-4 '>
            <h2 className='text-3xl uppercase font-bold mb-4'>Collection</h2>

            {/* Sort */}
            <SortOptions />
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map((product) => (
                    <div key={product._id} className='bg-white shadow-md rounded-lg p-4'>
                        <img src={product.images[0].url} alt={product.name} className='w-full  object-cover mb-4 rounded'/>
                        <h3 className='text-lg font-semibold'>{product.name}</h3>
                        <p className='text-gray-600'>${product.price}</p>
                    </div>
                ))}
            </div> */}
            <ProductGrid products={products} loading={loading} error={error}/>
        </div>
    </div>
  )
}

export default Collection   
    
  

 
