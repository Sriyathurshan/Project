import { RiDeleteBin3Line } from 'react-icons/ri'
import { useAppDispatch } from '../../redux/hooks'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slice/cartSlice'
import type { Cart, CartProduct } from '../../redux/types'

interface CartContentsProps {
    cart: Cart;
    userId: string | null;
    guestId: string;
}

const CartContents = ({cart,userId,guestId}: CartContentsProps) => {
    const dispatch = useAppDispatch()

    //HAndling adding or substracting to cart
    const handleAddToCart =(productId: CartProduct["productId"],delta: number,quantity: number,size?: string,color?: string) =>{
        const newQuantity = quantity + delta
        if (newQuantity >= 1){
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity:newQuantity,
                    guestId,
                    userId,
                    size,
                    color,
                })
            )
        }
    }

    const handleRemoveFromCart = (productId: CartProduct["productId"],size?: string,color?: string)=>{
        dispatch(removeFromCart({productId,guestId,userId,size,color}))
    }

  return (
    <div >
        {cart.products.map((product,index) => (
            <div key={index} className='flex items-start justify-between py-4 border-b '>
                <div className="flex items-start w-full">
                    <img src={product.imageUrl} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                    <div>
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-gray-600 text-sm">Size: {product.size} | Color: {product.color} </p>
                        <div className='flex items-center mt-2'>
                            <button onClick={()=>handleAddToCart(product.productId,-1,product.quantity,product.size,product.color)} className='border rounded px-2 py-1 text-xl font-medium bg-white hover:bg-red-600 hover:text-white'> - </button>
                            <span className="mx-4">{product.quantity}</span>
                            <button onClick={()=>handleAddToCart(product.productId,+1,product.quantity,product.size,product.color)} className='border rounded px-2 py-1 text-xl font-medium bg-white hover:bg-green-700 hover:text-white'> + </button>
                        </div>
                    </div>
                    <div className='ml-auto text-right'>
                        <p> {product.price}$</p>
                        <button onClick={()=>handleRemoveFromCart(product.productId,product.size,product.color)} className='hover:bg-red-600 hover:text-white h-8 w-8 '> <RiDeleteBin3Line/> </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CartContents
