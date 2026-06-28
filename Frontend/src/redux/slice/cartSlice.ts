import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import type { ApiError, Cart, User } from "../types"

interface CartState {
    cart: Cart;
    loading: boolean;
    error: string | null;
}

interface CartRequest {
    productId?: string | number;
    quantity?: number;
    size?: string;
    color?: string;
    guestId?: string;
    userId?: string;
}

interface MergeCartRequest {
    guestId: string;
    user: User;
}

const getApiError = (error: unknown, fallback: string): ApiError => {
    if (axios.isAxiosError<ApiError>(error)) {
        return error.response?.data ?? { message: error.message }
    }
    return { message: fallback }
}

//Helper Function to load cart from localstorage
const loadCartFromStorage =(): Cart =>{
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : {products :[]}
}

//Helper fucntion to save cart to localStorag
const saveCartToStorage = (cart: Cart) =>{
    localStorage.setItem("cart",JSON.stringify(cart))
}

//Fetch cart for a user or guest 
export const fetchCart = createAsyncThunk<Cart, Pick<CartRequest, "userId" | "guestId">, { rejectValue: ApiError }>("cart/fetchCart",async({userId,guestId},
    {rejectWithValue}) => {
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params : {userId,guestId}
                }
            )
            return  response.data
        }
        catch(error){
            console.error(error)
            return rejectWithValue(getApiError(error, "Failed to fetch cart"))
        }
    }
)

//Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk<Cart, CartRequest, { rejectValue: ApiError }> ("cart/addTocart",async({productId,quantity,size,
    guestId,color,userId},{rejectWithValue}) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                productId,
                quantity,
                size,
                color,
                guestId,
                userId,

            })
            return response.data
        }
        catch(error){
            return rejectWithValue(getApiError(error, "Failed to add to cart"))
        }
    }
)

// Update the qauntity of an item in the cart
export const updateCartItemQuantity=createAsyncThunk<Cart, CartRequest, { rejectValue: ApiError }>(
    "cart/updateCartItemQuantity" ,async({productId,quantity,guestId,userId,size,color},
        {rejectWithValue}) =>{
            try{
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                    productId,
                    quantity,
                    guestId,
                    userId,
                    size,
                    color
                }
                )
                return response.data
            }
            catch(error){
                return rejectWithValue(getApiError(error, "Failed to update item quantity"))
            }
        }
    
)

//Remove an item from the cart
export const removeFromCart = createAsyncThunk<Cart, CartRequest, { rejectValue: ApiError }>("cart/removeFromCart",async({productId,guestId,
    userId,size,color},{rejectWithValue}) =>{
        try{
            const response = await axios({
                method : "DELETE",
                url : `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                data:{productId,guestId,userId,size,color}
            }) 
            return response.data
        }
        catch(error){
            return rejectWithValue(getApiError(error, "Failed to remove item"))
        }
    })

//Merge guest Cart into  user cart 
export const mergeCart = createAsyncThunk<Cart, MergeCartRequest, { rejectValue: ApiError }>("cart/mergeCart",
    async({guestId,user}: MergeCartRequest,{rejectWithValue})=>{
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                {guestId,user},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        }
        catch(error){
            return rejectWithValue(getApiError(error, "Failed to merge cart"))
        }
    }
)

const initialState: CartState = {
    cart:loadCartFromStorage(),
    loading:false,
    error:null
}

const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        clearCart : (state) =>{
            state.cart={products:[]}
            localStorage.removeItem("cart")
        }
    },
    extraReducers :(builder) =>{
        builder
        .addCase(fetchCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload
            saveCartToStorage(action.payload)
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message || action.error.message || "failded to fetch cart"
        })
        .addCase(addToCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload
            saveCartToStorage(action.payload)
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message || action.error.message || "failded to add to cart"
        })
        .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload
            saveCartToStorage(action.payload)
        })
        .addCase(updateCartItemQuantity.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message || action.error.message || "failded to update item quantity"
        })
        .addCase(removeFromCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload
            saveCartToStorage(action.payload)
        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message || action.error.message || "failed to remove item"
        })
        .addCase(mergeCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(mergeCart.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload
            saveCartToStorage(action.payload)
        })
        .addCase(mergeCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message || action.error.message || "failed to merge cart"
        })
    }
})

export const {clearCart} =cartSlice.actions
export default cartSlice.reducer
