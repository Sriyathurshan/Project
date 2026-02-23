import React, { useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/product/FilterSIDEBAR'
import SortOptions from '../components/product/SortOptions'
import ProductGrid from '../components/product/ProductGrid'

const Collection = () => {
    const [products, setProducts] = React.useState([])
    const sideBarRef = React.useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = React.useState(false)

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const handleClickOutside = (e ) => {
        if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
            setIsSideBarOpen(false)
        }
    }

    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
        document.removeEventListener('mousedown', handleClickOutside)
    }
}, [])
    

    useEffect(() => {
        setTimeout (() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "product 1",
                    images: [{url:"https://picsum.photos/500/500?random=12"}],
                    price : 100
                },
                {
                    _id: 2,
                    name: "product 2",
                    images: [{url:"https://picsum.photos/500/500?random=13"}],
                    price: 24
                },
                {
                    _id: 3,
                    name: "product 3",
                    images: [{url:"https://picsum.photos/500/500?random=14"}],
                    price : 243
                },
                {
                    _id: 4,
                    name: "product 4",
                    images: [{url:"https://picsum.photos/500/500?random=15"}],
                    price: 50
                },
                {
                    _id: 1,
                    name: "product 1",
                    images: [{url:"https://picsum.photos/500/500?random=12"}],
                    price : 100
                },
                {
                    _id: 2,
                    name: "product 2",
                    images: [{url:"https://picsum.photos/500/500?random=13"}],
                    price: 24
                },
                {
                    _id: 3,
                    name: "product 3",
                    images: [{url:"https://picsum.photos/500/500?random=14"}],
                    price : 243
                },
                {
                    _id: 4,
                    name: "product 4",
                    images: [{url:"https://picsum.photos/500/500?random=15"}],
                    price: 50
                }
            ]
            setProducts(fetchedProducts)
        },1000)
    },[])


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
            <ProductGrid products={products}/>
        </div>
    </div>
  )
}

export default Collection   
    
  

 