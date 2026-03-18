import womenCollectionImage from '../../assets/womens-collection.webp'
import menCollectionImage from '../../assets/mens-collection.webp'

const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0 ' >
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            <div className='relative flex-1'>
                <img src={womenCollectionImage} alt="womenCollection" className='w-full h-[700px] object-cover'/>

            <div className='absolute bottom-8 left-8 bg-white bg-opacity-50 p-4 flex items-start flex-col'>
                <h2 className='text-2xl font-bold mb-3'>Women's Collections</h2>
                <a href="/collections?all?gender=women" className='bg-white text-black px-4 py-2 rounded hover:bg-gray-400 transition'>Shop Now</a>
            </div>
            </div>
            <div className='relative flex-1'>
                <img src={menCollectionImage} alt="menCollection" className='w-full h-[700px] object-cover'/>

            <div className='absolute bottom-8 left-8 bg-white bg-opacity-50 p-4 flex items-start flex-col'>
                <h2 className='text-2xl font-bold mb-3'>Men's Collections</h2>
                <a href="/collections?all?gender=men" className='bg-white text-black px-4 py-2 rounded hover:bg-gray-400 transition'>Shop Now</a>
            </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollectionSection