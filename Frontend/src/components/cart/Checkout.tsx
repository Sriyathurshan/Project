import React from 'react'
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';

const cart={
    products:[
        {
            name:"product 1",
            price: 100,
            color: "red",
            size: "M",
            quantity: 1,
            image: "https://picsum.photos/500/500?random=12"
        },
        {
            name:"product 2",
            price: 24,
            color: "blue",
            size: "L",
            quantity: 1,
            image: "https://picsum.photos/500/500?random=13"
        },
        {
            name:"product 3",
            price: 243,
            color: "green",
            size: "S",
            quantity: 1,
            image: "https://picsum.photos/500/500?random=14"
        },
        {
            name:"product 4",
            price: 50,
            color: "yellow",
            size: "XL",
            quantity: 1,
            image: "https://picsum.photos/500/500?random=15"
        }
    ],
    totalPrice: 417
}

const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = React.useState(null);
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

    const handlePayPalSuccess = (details: any) => {
        // Handle successful payment here
        console.log("Payment Successful!", details);
        // You can navigate to a success page or show a success message
        navigate('/order-confirmation');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., send the data to your backend or proceed to payment.
        console.log("Shipping Address:", shippingAddress);
        console.log("Cart:", cart);
        setCheckoutId("dummy-checkout-id"); // Set a dummy checkout ID for demonstration
        // Navigate to a confirmation page or payment gateway if needed
    }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 text-left tracking-tighter">
        {/* left section */}
        <div className='bg-white rounded-lg p-6'>
            <h2 className='text-2xl font-semibold uppercase mb-6'>Check Out</h2>
            <form onSubmit={handleSubmit}>
                <h3 className='text-lg font-semibold mb-4'>Contact Details</h3>
                <div className='mb-6'>
                    <label className='block'> Email </label>
                        <input
                            type="email"
                            name="email"
                            value="sriii@sgm.com"
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
                            onClick={handleSubmit}
                            className='w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300'
                        >
                    Proceed to Payment
                </button>
                    ) : ( 
                    <div >
                        <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                        <PayPalButton 
                        amount={100} 
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
                {cart.products.map((product, index) => (
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
                <span>${cart.totalPrice}</span>
            </div>
            <div className='flex justify-between font-semibold'>
                <span>Shipping:</span>
                <span>$10</span>
            </div>
            <div className='flex justify-between font-semibold'>
                <span>Total:</span>
                <span>${cart.totalPrice + 10}</span>
            </div>

        </div>
    </div>
  )
}

export default Checkout