import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContents = () => {
    const CartProducts = [
    {
        productId:1,
        name:"T-Shirt",
        price:19.99,
        quantity:2,
        imageUrl:"https://picsum.photos/200?random=1",
        size:"M",
        color:"Red"

    },
    {
        productId:2,
        name:"Jeans",
        price:25.00,
        quantity:1,
        imageUrl:"https://picsum.photos/200?random=2",
        size:"28",
        color:"Black"

    }
]
  return (
    <div >
        {CartProducts.map((product,index) => (
            <div key={index} className='flex items-start justify-between py-4 border-b '>
                <div className="flex items-start w-full">
                    <img src={product.imageUrl} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                    <div>
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-gray-600 text-sm">Size: {product.size} | Color: {product.color} </p>
                        <div className='flex items-center mt-2'>
                            <button className='border rounded px-2 py-1 text-xl font-medium bg-white hover:bg-red-600 hover:text-white'> - </button>
                            <span className="mx-4">{product.quantity}</span>
                            <button className='border rounded px-2 py-1 text-xl font-medium bg-white hover:bg-green-700 hover:text-white'> + </button>
                        </div>
                    </div>
                    <div className='ml-auto text-right'>
                        <p> {product.price}$</p>
                        <button className='hover:bg-red-600 hover:text-white h-8 w-8 '> <RiDeleteBin3Line/> </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CartContents