import React, { useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/product/FilterSIDEBAR'

const Collection = () => {
    const [products, setProducts] = React.useState([])
    const sideBarRef = React.useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = React.useState(false)

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
                setIsSideBarOpen(false)
            }
        }
    })
    

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
        <button className= "lg:hidden border p-2 flex justify-center">
            <FaFilter className='h-6 w-6 text-gray-700'/>
        </button>
        {/* Filter Sidebar */}
        <div className='hidden lg:block w-1/4 p-4 border-r'>
            <FilterSidebar />
        </div>
    </div>
  )
}

export default Collection 