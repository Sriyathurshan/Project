import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Filters {
    category: string;
    gender: string;
    color: string;
    size: string[];
    material: string[];
    minPrice: string | number;
    maxPrice: string | number;
    brand: string[];
}

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = React.useState<Filters>({
        category: searchParams.get('category') || '',
        gender: searchParams.get('gender') || '',
        color: searchParams.get('color') || '',
        size: searchParams.get('size')?.split(',') || [],
        material: searchParams.get('material')?.split(',') || [],
        minPrice: searchParams.get('minPrice') || 0,
        maxPrice: searchParams.get('maxPrice') || 100,
        brand: searchParams.get('brand')?.split(',') || [],
    });

    const [priceRange,setPriceRange]= React.useState([Number(filters.minPrice), Number(filters.maxPrice)]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = Number(e.target.value)
        setPriceRange([0,newPrice])
        const newFilters = {...filters, minPrice: 0, maxPrice: newPrice}
        setFilters(newFilters)
        updateURLParams(newFilters)
    }
    
    const category = ['Clothing', 'Footwear', 'Accessories'];
    const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const materials = ['Cotton', 'Polyester', 'Wool', 'Leather'];   
    const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
    const genders = ['Men', 'Women', 'Unisex'];


    useEffect(() => {
        const params= Object.fromEntries(searchParams.entries());
        setFilters({
            category: params.category || '',
            gender: params.gender || '',
            color: params.color || '',
            size: params.size ? params.size.split(',') : [],
            material: params.material ? params.material.split(',') : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,
            brand: params.brand ? params.brand.split(',') : [],
        });
        setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 100]);

    }, [searchParams]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLInputElement | HTMLButtonElement
        const {name,value} = target
        const checked = target instanceof HTMLInputElement ? target.checked : false
        const type = target instanceof HTMLInputElement ? target.type : "button"
        let newFilters = {...filters }

        if (type == "checkbox"){
            const key = name as "size" | "material" | "brand"
            if(checked){
                newFilters[key] = [...newFilters[key] || [] , value]
            }else{
                newFilters[key] = newFilters[key].filter((item) => item !== value)
            } }
        else{
            const key = name as "category" | "gender" | "color"
            newFilters[key] = value
            }  
        setFilters(newFilters)
        console.log(newFilters) 
        updateURLParams(newFilters)
        
    }

    const updateURLParams = (newFilters: Filters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            const filterKey = key as keyof Filters
            const value = newFilters[filterKey];
            if (Array.isArray(value) && value.length > 0) {
                params.set(key, value.join(','));
            } else if (value) {
                params.append(key, String(value));
                            }
            });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    }
        


        
  return (
    <div className='p-4'>
        <h3 className='text-xl font-medium mb-4'>Filter</h3>

        {/* Category Filter */}

        <div className='mb-6'>
            <label className='block mb-2 font-medium'>Category</label>
            {category.map((category) => (
                <div key={category} className='flex items-center'>
                    <input type='radio' 
                        name='category'
                        value={category}
                        onChange={handleFilterChange}
                        checked={filters.category === category}
                        className='mr-2 h-4 w-4  accent-blue-900 focus:ring-blue-800 border-white'/>
                    <span className='text-gray-700'>{category}</span>
                </div>
            ))}
            
        </div>

        {/* Gender Filter */}

        <div className='mb-6'>
            <label className='block mb-2 font-medium'>Gender</label>
            {genders.map((gender) => (
                <div key={gender} className='flex items-center'>
                    <input type='radio' 
                        name='gender'
                        value={gender}
                        onChange={handleFilterChange}
                        checked={filters.gender === gender}
                        className='mr-2 h-4 w-4  accent-blue-900 focus:ring-blue-800 border-gray-300'/>
                    <span className='text-gray-700'>{gender}</span>
                </div>
            ))}
        </div>

        {/* Color Filter */}

        <div className='mb-6'>
            <label className='block mb-2 font-medium'>Color</label>
            <div className='flex flex-wrap gap-2'>
                {colors.map((color) => (
                    <button key={color}
                        name='color'
                        value={color}
                        onClick={handleFilterChange}
                        className={`!w-8 !h-8 !p-0 !rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? 'ring-2 ring-blue-500' : ''}`}
                        style={{backgroundColor: color.toLowerCase()}}>
                    </button>
                ))}
            </div>
        </div>

        {/* Size Filter */}

        <div className='mb-6'>
            <label className='block mb-2 font-medium'>Size</label>
            {sizes.map((size) => (
                <div key={size} className='flex items-center'>
                    <input type='checkbox' 
                        name='size'
                        value={size}
                        onChange={handleFilterChange}
                        checked={filters.size.includes(size)}
                        className='mr-2 h-4 w-4  accent-blue-900 focus:ring-blue-800 border-gray-300'/>
                    <span className='text-gray-700'>{size}</span>
                </div>
            ))}
            
        </div>

        {/* Brand Filter */}

        <div className='mb-6'>
            <label className='block mb-2 font-medium'>Brand</label>
            {brands.map((Brand) => (
                <div key={Brand} className='flex items-center'>
                    <input type='checkbox' 
                        name='brand'
                        value={Brand}
                        onChange={handleFilterChange}
                        checked={filters.brand.includes(Brand)}
                        className='mr-2 h-4 w-4  accent-blue-900 focus:ring-blue-800 border-gray-300'/>
                    <span className='text-gray-700'>{Brand}</span>
                </div>
            ))}
            
        </div>

        {/* Material Filter */}

        <div className='mb-6'>
            <label className='block mb-2 font-medium'>Material</label>
            {materials.map((material) => (
                <div key={material} className='flex items-center'>
                    <input type='checkbox' 
                        name='material'
                        value={material}
                        onChange={handleFilterChange}
                        checked={filters.material.includes(material)}
                        className='mr-2 h-4 w-4  accent-blue-900 focus:ring-blue-800 border-gray-300'/>
                    <span className='text-gray-700'>{material}</span>
                </div>
            ))}
            
        </div>

        {/* Price Range Filter */}
        <div className='mb-8'>
            <label className='block mb-2 font-medium'>Price Range</label>
            <div className='flex items-center space-x-4'>
                <input type='range'
                name='priceRange'
                min={0}
                max={100}
                value={priceRange[1]}
                onChange={handlePriceChange}
                className='w-full h-2 bg-gray-300 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                
            </div>
            <div className='flex justify-between mt-2'>
                <span className='text-gray-700'>${priceRange[0]}</span>
                <span className='text-gray-700'>${priceRange[1]}</span>
            </div>

        </div>

        </div>
    
                       
  )
}

export default FilterSidebar
