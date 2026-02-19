import React, { useEffect, useState } from 'react'




const MyOrdersPage = () => {
    const [orders,setOrders]=useState([]);

    useEffect(() => {
        setTimeout(() => {
        const mockOrders =[
            {
                _id : "123",
                createdAt : new Date(),
                shippingAddress : { city: "NewYork" , country:"USA"},
                orderItems : [
                    {
                    name : "proudct 1",
                    image: "https://picsum.photos/500/500?random=1"}
                    ],
                totalPrice: 100,
                isPaid : true
            },
            {
                _id : "125",
                createdAt : new Date(),
                shippingAddress : { city: "New Jersey" , country:"USA"},
                orderItems : [
                    {
                    name : "proudct 2",
                    image: "https://picsum.photos/500/500?random=2"}
                    ],
                totalPrice: 200,
                isPaid : true,
            }
        ]
        setOrders(mockOrders)

        } ,1000)

    } ,[])
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h1 className= " text-xl sm:text:2xl font-bold mb-6">
            MyOrders
        </h1>
        <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700 '>
                    <tr>
                        <th className='py-2 px-4 sm:py-3 '> Image</th>
                        <th className='py-2 px-4 sm:py-3 '> Order ID </th>
                        <th className='py-2 px-4 sm:py-3 '> Created </th>
                        <th className='py-2 px-4 sm:py-3 '> Shipping Address</th>
                        <th className='py-2 px-4 sm:py-3 '> Items</th>
                        <th className='py-2 px-4 sm:py-3 '> Price</th>
                        <th className='py-2 px-4 sm:py-3 '> Status </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length >0? (
                        orders.map((order) => (
                            <tr key={order._id} className='border-b hover:border-gray-50 cursor-pointer'>
                                <td className='py-2 px-2 sm:py-4 sm:px-3'>
                                    <img src ={order.orderItems[0].image} alt ={order.orderItems[0].name}
                                        className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'/>
                                </td> 
                                <td className='py-2 px-4 sm:py-3 font-medium'>{order._id}</td>
                                <td className='py-2 px-4 sm:py-3 font-medium'>{order.createdAt.toLocaleDateString()} {" "} {order.createdAt.toLocaleTimeString()}</td>
                                <td className='py-2 px-4 sm:py-3 font-medium'>{order.shippingAddress.city}, {order.shippingAddress.country}</td>
                                <td className='py-2 px-4 sm:py-3 font-medium'>{order.orderItems.length}</td>
                                <td className='py-2 px-4 sm:py-3 font-medium'>${order.totalPrice.toFixed(2)}</td>
                                <td className='py-2 px-4 sm:py-3 font-medium'><span className={order.isPaid ? 'text-green-500' : 'text-red-500'}>{order.isPaid ? 'Paid' : 'Not Paid'}</span></td>
                            </tr>
                        ))
                    ) :
                      (<tr>
                        <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                            No orders found.
                        </td>
                      </tr>)}
                </tbody>
            </table>
        </div>
    </div>
        
  )
  
}

export default MyOrdersPage