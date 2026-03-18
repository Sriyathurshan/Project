import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div className='flex flex-col itmes-center'>
                <HiShoppingBag className='mx-auto mb-4 text-xl text-black'/>
                <h4 className='tracking-tighter mb-2'>FREE INTERNATIONAL SHIPPING</h4>
                <p className='text-gray-700'>On all order over $100</p>
            </div>
            <div className='flex flex-col items-center'>
                <HiArrowPathRoundedSquare className='mx-auto mb-4 text-xl text-black'/>
                <h4 className='tracking-tighter mb-2'>45 DAYS RETURN</h4>
                <p className='text-gray-700'>Money back guarantee</p>
            </div>
            <div className='flex flex-col items-center'>
                <HiOutlineCreditCard className='mx-auto mb-4 text-xl text-black'/>
                <h4 className='tracking-tighter mb-2'>SECURE PAYMENT</h4>
                <p className='text-gray-700'>Your payment information is protected</p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSection