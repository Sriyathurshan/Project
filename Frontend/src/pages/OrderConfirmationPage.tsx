import React from 'react'


const checkout = {
    _id: "12323",
    createdAt: new Date(),
    items: [
        {
            name:"product 1",
            price: 124,
            color: "red",
            size: "M",
            quantity: 1,
            image: "https://picsum.photos/500/500?random=12"
        },
        {
            name:"product 2",
            price: 0,
            color: "blue",
            size: "L",
            quantity: 1,
            image: "https://picsum.photos/500/500?random=13"
        }
    ],
    shippingAddress: {
        address: "123 Main St",
        city: "New York",
        country: "USA"
    }
}
const OrderConfirmationPage = () => {

    const calculateEstimatedDeliveryDate = (createdAt: Date) => {
        const orderDate = new Date(createdAt);
            orderDate.setDate(orderDate.getDate() + 7); // Add 7 days for estimated delivery
            return orderDate.toLocaleDateString();
    }
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
            Thank you for your Order!
        </h1>

        {checkout &&
         (<div className="p-6 rounded-lg shadow-md bg-gray-100">
            <div className="mb-20 flex justify-between text-left">
                {/* order id and date */}
                <div className="text-left">
                    <p className="text-xl font-semibold">
                        Order ID: {checkout._id}
                    </p>
                    <p className="text-lg text-gray-700 ">
                        Date: {checkout.createdAt.toLocaleDateString()}
                    </p>
                </div>  
                {/* estimated delivery date */}
                <div>
                    <p className="text-emerald-700 text-sm">
                        estimated delivery: { " "}
                        {calculateEstimatedDeliveryDate(checkout.createdAt)}
                    </p>
                </div> 
            </div>
            {/* ordered items */}
            <div className="mb-20">
                {checkout.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <div>
                            <h4 className="text-md font-semibold">{item.name}</h4>
                            <h4 className="text-gray-700 text-sm font-semibold">{item.color} | {item.size}</h4>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-gray-700 text-sm">Qty: {item.quantity}</p>
                            <p className="text-gray-700 text-sm"> ${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* payment and delivery */}
            <div className="grid grid-cols-2 gap-8">
                {/* payment5 info */}
                <div className="text-left">
                    <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                    <p className="text-gray-700 text-sm">Payment Method: PayPal</p>
                    <p className="text-gray-700 text-sm">Total Amount: ${checkout.items.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                </div>
                {/* delivery info */}
                <div className="text-right">
                    <h4 className="text-lg font-semibold mb-2">Delivery Info</h4>
                    <p className="text-gray-700 text-sm">{checkout.shippingAddress.address}</p>
                    <p className="text-gray-700 text-sm"> {checkout.shippingAddress.city} , {checkout.shippingAddress.country}</p>
                </div>
            </div>
            {/* shipping address */}
        </div>)}
        {!checkout && 
        (<div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
                No order details available.
            </h2>
        </div>)}
        {checkout && 
        (<div className="text-center mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Your order has been placed successfully!
            </h2>
            <p className="text-gray-600">
                You will receive a confirmation email shortly.
            </p>
        </div>)}
        {checkout && 
        (<div className="text-center mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Estimated Delivery Date: {calculateEstimatedDeliveryDate(checkout.createdAt)}
            </h2>
            <p className="text-gray-600">
                Please note that the estimated delivery date is subject to change based on shipping conditions.
            </p>
        </div>)}
        {checkout && 
        (<div className="text-center mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Thank you for shopping with us!
            </h2>
            <p className="text-gray-600">
                We appreciate your business and hope to see you again soon.
            </p>
        </div>)}
        {checkout && 
        (<div className="text-center mt-8">
            <button 
                onClick={() => window.location.href = '/'} 
                className="bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800 transition duration-300"
            >
                Continue Shopping
            </button>
        </div>)}
        {checkout && 
        (<div className="text-center mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Need Help?
            </h2>
            <p className="text-gray-600">
                If you have any questions or concerns about your order, please contact our customer support team.
            </p>
            <p className="text-gray-600">
                Email: support@ecommerce.com
            </p>
        </div>)
        }
    </div>

  )
}

export default OrderConfirmationPage