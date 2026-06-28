import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createCheckout } from '../../redux/slice/checkoutSlice';
import axios from 'axios';

interface CheckoutProduct {
    image?: string;
    name?: string;
    color?: string;
    size?: string;
    quantity?: number;
    price?: number;
}

interface CheckoutResponse {
    _id: string;
}

const Checkout = () => {
    const dispatch = useAppDispatch()
    const {cart, loading, error} =useAppSelector((state)=>state.cart)
    const {user} = useAppSelector((state) => state.auth) 
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = React.useState<string | null>(null);
    const[shippingAddress, setShippingAddress] = React.useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        country: ""
    });

    //Ensure cart is loaded before processing
    useEffect(()=>{
        if(!cart || !cart.products||cart.products.length===0){
            navigate("/")
        }
    },[cart,navigate])

    const cartProducts = cart.products as CheckoutProduct[];
    const totalPrice = Number(cart.totalPrice ?? 0);

    const handleCreateCheckout = async(e: React.FormEvent) =>{
        e.preventDefault()
        if (cart && cart.products.length>0){
            const res = await dispatch(createCheckout({
                checkoutItems:cart.products,
                shippingAddress,
                paymentMethod:"Paypal",
                totalPrice
            })).unwrap() as CheckoutResponse
            if (res._id){
                setCheckoutId(res._id)
            }
        }
    }

    const handlePayPalSuccess =async (details: any) => {
        try{
            const response= await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                {paymentStatus:"paid",paymentDetails:details},
                {
                    headers:{
                        Authorization :`Bearer ${localStorage.getItem("userToken")}`
                    } 
                }
            )
            
                await handleFinalizeCheckout(checkoutId)
            
            
        }
        catch(error){
            console.error(error)
        }
    }

    const handleFinalizeCheckout = async(checkoutId: string | null)=>{
        if (!checkoutId) return
        try{
            const response=await axios.post(
                `${
                import.meta.env.VITE_BACKEND_URL
                }/api/checkout/${checkoutId}/finalize`,{},
                {
                    headers :{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            
                navigate("/order-connfirmation")
            
        }
        catch(error){
            console.error(error)
        }
    }

    if(loading) return <p>Loading Cart...</p>
    if (error) return<p>Error: {error}</p>
    if(!cart||!cart.products||cart.products.length===0) return <p> Your Cart is Empty</p>

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 text-left tracking-tighter">
        {/* left section */}
        <div className='bg-white rounded-lg p-6'>
            <h2 className='text-2xl font-semibold uppercase mb-6'>Check Out</h2>
            <form onSubmit={handleCreateCheckout}>
                <h3 className='text-lg font-semibold mb-4'>Contact Details</h3>
                <div className='mb-6'>
                    <label className='block'> Email </label>
                        <input
                            type="email"
                            name="email"
                            value={user? user.email:""}
                            // value={shippingAddress.email}
                            onChange={handleInputChange}
                            disabled
                            className='w-full p-2 border rounded-md'
                        />

                    <h3 className="text-xl font-bold mb-4"> Delivery</h3>
                    <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                        <div>
                        <label className='block'> First Name </label>
                        <input
                            type="text"
                            name="firstName"
                            value={shippingAddress.firstName}
                            onChange={handleInputChange}
                            className='w-full p-2 border rounded-md'
                        />
                        </div>
                        <div>
                        <label className='block'> Last Name </label>
                        <input
                            type="text"
                            name="lastName"
                            value={shippingAddress.lastName}
                            onChange={handleInputChange}
                            className='w-full p-2 border rounded-md'
                        />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block'> Shipping Address </label>
                        <input type="text"
                            name="address"
                            value={shippingAddress.address}
                            onChange={handleInputChange}
                            required
                            className='w-full p-2 border rounded-md'
                        />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                        <div>
                        <label className='block'> City </label>
                        <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleInputChange}
                            className='w-full p-2 border rounded-md'
                        />
                        </div>
                        <div>
                        <label className='block'> Postal Code </label>
                        <input
                            type="text"
                            name="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={handleInputChange}
                            className='w-full p-2 border rounded-md'
                        />
                        </div>
                    </div>

                    
                    <div className='mb-4'>
                        <label className='block'> Country </label>
                        <input
                            type="text"
                            name="country"
                            value={shippingAddress.country}
                            onChange={handleInputChange}
                            className='w-full p-2 border rounded-md'
                        />
                    </div>
                    <div>
                        <label className='block'> Phone Number </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={shippingAddress.phoneNumber}
                            onChange={handleInputChange}
                            className='w-full p-2 border rounded-md'
                        />
                        </div>
                </div>
                <div className='mt-6'>
                    {!checkoutId ? (
                        <button 
                            type="submit" 
                            className='w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300'
                        >
                    Proceed to Payment
                </button>
                    ) : ( 
                    <div >
                        <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                        <PayPalButton 
                        amount={totalPrice} 
                        onSuccess={handlePayPalSuccess} 
                        onError={(err) => alert("Payment Error: " + err.message)}
                        />
                    </div>)}
                </div>
            </form>
        </div>

        {/* Right Section */}
        <div className='bg-white rounded-lg p-6'>
            <h2 className='text-2xl font-semibold uppercase mb-6'>Order Summary</h2>
            <div className='space-y-4'>
                {cartProducts.map((product, index) => (
                    <div key={index} className='flex items-start justify-between py-2 space-x-4'>
                        <div className='flex-items-center'>
                            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                        </div>
                        <div>
                            <h3 className='font-semibold'>{product.name}</h3>
                            <p>Color: {product.color}</p>
                            <p>Size: {product.size}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                        <div className='ml-auto font-semibold'>${product.price}</div>
                    </div>
                ))}
            </div>
            <hr className='my-4' />
            <div className='flex justify-between font-semibold'>
                <span>Subtotal:</span>
                <span>${totalPrice}</span>
            </div>
            <div className='flex justify-between font-semibold'>
                <span>Shipping:</span>
                <span>$10</span>
            </div>
            <div className='flex justify-between font-semibold'>
                <span>Total:</span>
                <span>${totalPrice + 10}</span>
            </div>

        </div>
    </div>
  )
}

export default Checkout
