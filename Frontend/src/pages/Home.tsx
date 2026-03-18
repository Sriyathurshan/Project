import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/product/GenderCollectionSection'
import NewArrivals from '../components/product/NewArrivals'
import ProductDetails from '../components/product/ProductDetails'
import ProductGrid from '../components/product/ProductGrid'
import FeaturedCollection from '../components/product/FeaturedCollection'
import FeaturesSection from '../components/product/FeaturesSection'

const placeholderProducts= [
  {
        _id: 1,
        name: "product 1",
        images: [{url:"https://picsum.photos/500/500?random=12"}],
        price : 100
    },
    {
        _id: 2,
        name: "product 2",
        images: [{url:"https://picsum.photos/500/500?random=13"}],
        price: 24
    },
    {
        _id: 3,
        name: "product 3",
        images: [{url:"https://picsum.photos/500/500?random=14"}],
        price : 243
    },
    {
        _id: 4,
        name: "product 4",
        images: [{url:"https://picsum.photos/500/500?random=15"}],
        price: 50
    },
    {
        _id: 1,
        name: "product 1",
        images: [{url:"https://picsum.photos/500/500?random=12"}],
        price : 100
    },
    {
        _id: 2,
        name: "product 2",
        images: [{url:"https://picsum.photos/500/500?random=13"}],
        price: 24
    },
    {
        _id: 3,
        name: "product 3",
        images: [{url:"https://picsum.photos/500/500?random=14"}],
        price : 243
    },
    {
        _id: 4,
        name: "product 4",
        images: [{url:"https://picsum.photos/500/500?random=15"}],
        price: 50
    } 
]

const Home = () => {
  return (
    <div>
        <Hero />
        <GenderCollectionSection/>
        <NewArrivals />
        <h2 className='text-3xl text-center font-bold mb-4 '> Best Seller</h2>
        <ProductDetails/>
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4 '> Top wears for women</h2>
          <ProductGrid products={placeholderProducts}/>  
        </div>
        <FeaturedCollection/>
        <FeaturesSection/>
    </div>
  )
}

export default Home