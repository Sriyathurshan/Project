import React from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../cart/CartContents'
import { useNavigate } from 'react-router-dom'

interface CartDrawerProps {
  drawerOpen: boolean
  toggleCartDrawer: () => void
}



const CartDrawer: React.FC<CartDrawerProps> = ({ drawerOpen, toggleCartDrawer }) => {

    const navigate = useNavigate();
    const handleCheckout = () => {
        toggleCartDrawer(); // Close the cart drawer
        navigate('/checkout');
}

  return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/4 md:w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex justify-between items-center p-4 bg-white font-semibold  border-b">
                <h2 className="text-2xl text-black">Your Cart</h2>
                <button onClick={toggleCartDrawer}>
                    <IoMdClose className="h-6 w-6 text-black" />
                </button>
            </div>
            <div className='flex-grow p-4 overflow-y-auto text-left'>
                {/* Cart items will go here */}
                <CartContents/>
                {/* <p className='text-black'>Your cart is currently empty.</p> */}
            </div>
            <div>
                <button onClick={handleCheckout} className="bg-black text-white px-4 py-2 rounded"> checkout </button>
                <p className='text-black text-sm mt-2 text-center tracking-tighter'> Shipping , taxes and discount codes calculated </p>
            </div>
        </div>
  )
}

export default CartDrawer