import React from 'react'

const selectedProduct={
    id:1,
    name:"Stylish Sneakers",
    originalPrice:150,
    discountedPrice:120,
    description:"These stylish sneakers are perfect for everyday wear.",
    brand:"FashionCo",
    material:"Leather",
    sizes:["6","7","8","9","10"],
    colors:["Black","White","Red"],
    images:[
        {
            url:"https://picsum.photos/500/500?random=10",
            altText:"Stylish Sneakers"
        },
        {
            url:"https://picsum.photos/500/500?random=11",
            altText:"Stylish Sneakers Side View"
        },
        
        ]
}

const ProductDetails = () => {
  return (
    <div className='p-6'>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                <div className='hidden md:flex flex-col space-y-4 mr-4'>
                    {selectedProduct.images.map((image,index) => (
                        <img 
                            key={index}
                            src={image.url} 
                            alt={image.altText || `Thumbnail ${index}`} 
                            className='w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75'
                        />
                    ))}
                </div>
                <div className='md:w-1/2'>
                    <div className='mb-4'>
                        <img src={selectedProduct.images[0].url} alt="Main Product Image" className='w-full h-auto object-cover rounded-lg' />
                    </div>
                </div>
                <div className='md:hidden flex overscroll-x-screen space-x-4 mb-4'>
                    {selectedProduct.images.map((image,index) => (
                        <img 
                            key={index}
                            src={image.url} 
                            alt={image.altText || `Thumbnail ${index}`} 
                            className='w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75'
                        />
                    ))}
                </div>
                <div className='md:w-1/2 md:ml-10 text-left'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name} </h1>
                    <p className='text-gray-600 mb-4'>{selectedProduct.brand}</p>
                    <div className='mb-4'>
                        <span className='text-xl font-bold'>${selectedProduct.discountedPrice}</span>
                        <span className='ml-2 text-gray-500 line-through'>${selectedProduct.originalPrice}</span>
                    </div>
                    <p className='text-gray-700 mb-4'>{selectedProduct.description}</p>
                    <div className='mb-4'>
                        <h3 className='font-semibold'>Material:</h3>
                        <p>{selectedProduct.material}</p>
                    </div>
                    <div className='mb-4'>
                        <h3 className='font-semibold'>Sizes:</h3>
                        {selectedProduct.sizes.map((size) => (
                            <span key={size} className='inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2'>
                                {size}
                            </span>
                        ))}
                    </div>
                    <div className='flex space-x-4 mb-6'>
                        {selectedProduct.colors.map((color) => (
                            <button 
                                key={color}
                                className='px-4 py-2 border rounded hover:bg-gray-200'
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                    <button className='w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition mb-4'>
                        Add to Cart
                    </button>
                    <button className='w-full border border-black text-black py-3 rounded hover:bg-gray-200 transition'>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails