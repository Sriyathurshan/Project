import React from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    // Handle the sorting logic based on the selected option
    console.log('Selected Sort Option:', selectedSort);
    searchParams.set('sort', selectedSort);
    setSearchParams(searchParams);
    navigate(`?${searchParams.toString()}`);
  }


  return (
    <div className='mb-4 flex items-center justify-end'>
      <span className='mr-2'>Sort by:</span>
      <select id='sortOptions' className='border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      onChange={handleSortChange}
      value={searchParams.get('sort') || ''}>
        <option value=''>Default</option>
        <option value='priceASC'>Price: Low to High</option>
        <option value='priceDESC'>Price: High to Low</option>
        <option value='newest'>Newest Arrivals</option>
      </select>
    </div>
  )
}

export default SortOptions