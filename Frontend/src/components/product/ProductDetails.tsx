import React, { useEffect } from 'react'
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slice/productsSlice';
import { addToCart } from '../../redux/slice/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface ProductDetailsProps {
    productId?: string | number;
}

const ProductDetails = ({productId}: ProductDetailsProps) => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {selectedProduct,loading,error,similarProducts} = useAppSelector((state)=>state.products)
    const {user,guestId} = useAppSelector((state)=>state.auth)
    const [mainImage, setMainImage] = React.useState("");
    const [selectedSize, setSelectedSize] = React.useState("");
    const [selectedColor, setSelectedColor] = React.useState("");
    const [quantity, setQuantity] = React.useState(1); 
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false); 
    
    const productFetchId = productId|| id

    useEffect(()=>{
        if(productFetchId){
            dispatch(fetchProductDetails(productFetchId))
            dispatch(fetchSimilarProducts({id:productFetchId}))
        }
    },[dispatch,productFetchId])

    useEffect(() => {
        if(selectedProduct?.images?.length >0){
            setMainImage(selectedProduct.images[0].url)
        }
    },[selectedProduct])

    const handleAddtoCart = () => {
        if(!selectedSize || !selectedColor){
            toast.error("Please select size and color before adding to cart.",{
                duration: 1000
            });
            return;
        }
        setIsButtonDisabled(true);
        dispatch(
            addToCart({
                productId:productFetchId,
                quantity,
                size:selectedSize,
                color:selectedColor,
                guestId,
                userId:user?._id
            })
        ).then(()=>{
            toast.success("Product added to Cart!",{
                duration :1000
            })
        })
        .finally(()=>{
            setIsButtonDisabled(false)
        })
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!selectedProduct) return <p>Product not found</p>

  return (
    <div className='p-6'>
        {selectedProduct &&(
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                {/*left thumbnails*/}
                <div className='hidden md:flex flex-col space-y-4 mr-4'>
                    {selectedProduct.images.map((image,index) => (
                        <img 
                            key={index}
                            src={image.url} 
                            alt={image.altText || `Thumbnail ${index}`} 
                            className={'w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 ${mainImage === image.url ? "border-2 border-black" : "border border-gray-300"}'}
                            onClick={() => setMainImage(image.url)}
                        />
                    ))}
                </div>
                {/*main thumbnails*/}
                <div className='md:w-1/2'>
                    <div className='mb-4'>
                        <img src={mainImage} alt="Main Product Image" className='w-full h-auto object-cover rounded-lg' />
                    </div>
                </div>
                {/*mobile thumbnails*/}
                <div className='md:hidden flex overscroll-x-screen space-x-4 mb-4'>
                    {selectedProduct.images.map((image,index) => (
                        <img 
                            key={index}
                            src={image.url} 
                            alt={image.altText || `Thumbnail ${index}`} 
                            className={'w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 ${mainImage === image.url ? "border-2 border-black" : "border border-gray-300"}'}
                            onClick={() => setMainImage(image.url)}
                        />
                    ))}
                </div>

                {/*right thumbnails*/}
                <div className='md:w-1/2 md:ml-10 text-left'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name} </h1>
                    <p className='text-gray-600 mb-4'>{selectedProduct.brand}</p>
                    <div className='mb-4'>
                        <span className='text-xl font-bold'>${selectedProduct.discountedPrice}</span>
                        <span className='ml-2 text-gray-500 line-through'>${selectedProduct.originalPrice}</span>
                    </div>
                    <p className='text-gray-700 mb-4'>{selectedProduct.description}</p>

                    <div className='mb-4'>
                        <h3 className='font-semibold'>Sizes:</h3>
                        {selectedProduct.sizes?.map((size) => (
                            <button 
                                key={size} 
                                onClick={() => setSelectedSize(size)} 
                                className={`rounded px-4 py-2 mr-2 mb-2 ${ selectedSize  === size ? "bg-black text-white" : "bg-gray-200" }`}
                                >
                                {size}
                            </button>
                        ))}
                    </div>
                    <div className='flex space-x-4 mb-6'>
                        {selectedProduct.colors?.map((color) => (
                            <button 
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border ${ selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                                style ={{backgroundColor: color.toLocaleLowerCase(),
                                    filter:"brightness(0.5)",
                                }}>
                            </button> 
                        ))}
                    </div>

                    <div className='mb-6'>
                        <p className='text-gray-700'>
                            <div className='flex items-center space-x-4 mt-2'>
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg' onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    -
                                </button>
                                <span className='text-lg'>{quantity}</span>
                                <button className='px-2  py-1 bg-gray-200  rounded' onClick={() => setQuantity(quantity + 1)}>
                                    +
                                </button>
                            </div> 
                        </p>
                    </div>
                    <button onClick={handleAddtoCart} 
                            disabled={isButtonDisabled}
                            className={`w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition mb-4 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`} 
                    >
                        {isButtonDisabled ? "Adding..." : "Add to Cart"}
                    </button>

                    <div className='mt-8 text-gray-700'>
                        <h2 className='text-xl font-semibold mb-2'>Product Details</h2>
                        <table className='w-full text-left text-sm '>
                            <tbody>
                                <tr>
                                    <td className='py-1 font-semibold'>Brand:</td>
                                    <td className='py-1'>{selectedProduct.brand}</td>
                                </tr>
                                <tr>
                                    <td className='py-1 font-semibold'>Material:</td>
                                    <td className='py-1'>{selectedProduct.material}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='mt-20'>
                <h2 className='text-2xl test-center font-semibold mb-4'>You may also like</h2>
                <p className='text-gray-700'>
                    <ProductGrid products={similarProducts} loading={loading} error={error}/>
                </p>
            </div>
        </div>
        )}
    </div>
  )
}

export default ProductDetails
