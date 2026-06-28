import { useState } from 'react'
import type { FormEvent } from 'react'
import { HiMagnifyingGlass, HiMiniXCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setFilters } from '../../redux/slice/productsSlice'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate =useNavigate()


  const handleSearchToggle = () => {
    setIsOpen(!isOpen)
  }

   const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    dispatch(setFilters({search:searchTerm}))
    navigate(`collection/?search=${searchTerm}`)
    setIsOpen(false)
   }

  return (
    <div className={`flex items-center  transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {isOpen ? (
        <form onSubmit={handleSearch}className='relative flex items-center justify-center w-full'>
          <div className='relative w-1/2 flex'> 
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="text-black border border-gray-300 rounded-lg px-4 py-2 pl-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black w-full"
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-red-600">
                <HiMagnifyingGlass className='h-6 w-6' />
            </button>
          </div>
            <button onClick={handleSearchToggle} className=' text-black'>
                <HiMiniXCircle className='h-6 w-6'/>
            </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle} className='text-black '>
          <HiMagnifyingGlass className='h-6 w-6' />
        </button>
      )}
    </div>
  )
}

export default SearchBar
