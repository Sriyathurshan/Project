import React from 'react'
import { IoMdClose } from 'react-icons/io'

interface CartDrawerProps {
  drawerOpen: boolean
  toggleCartDrawer: () => void
}

const CartDrawer: React.FC<CartDrawerProps> = ({ drawerOpen, toggleCartDrawer }) => {

  return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/4 md:w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className='flex justify-end p-4 bg-white' >
                <button onClick={toggleCartDrawer}>
                    <IoMdClose className="h-6 w-6 text-black"/>
                </button>
            </div>
            <div className='flex-grow p-4 overflow-y-auto text-left'>
                <h2 className='text-xl  text-black'>Your Cart</h2>
                {/* Cart items will go here */}
                <p className='text-black'>Your cart is currently empty.</p>
            </div>
            <div>
                <button className="bg-black text-white px-4 py-2 rounded"> checkout </button>
                <p className='text-black text-sm mt-2 text-center tracking-tighter'> Shipping , taxes and discount codes calculated </p>
            </div>
        </div>
  )
}

export default CartDrawer