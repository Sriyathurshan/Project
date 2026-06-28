import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import type { ApiError, Checkout } from "../types"

interface CheckoutState {
    checkout: Checkout | null;
    loading: boolean;
    error: string | null;
}

//Async thunk to create a checkout session
export const createCheckout = createAsyncThunk<Checkout, unknown, { rejectValue: ApiError }> (
    "checkout/createCheckout",
async (checkoutdata ,{rejectWithValue}) =>{
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
            checkoutdata,
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
    }
    catch(error){
        if (axios.isAxiosError<ApiError>(error)) {
            return rejectWithValue(error.response?.data ?? { message: error.message })
        }
        return rejectWithValue({ message: "Failed to create checkout" })
    }
})

const initialState: CheckoutState = {
    checkout:null,
    loading:false,
    error:null
}

const checkoutSlice = createSlice({
    name:"checkout",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(createCheckout.pending,(state) =>{
            state.loading = true
            state.error = null
        })
        .addCase(createCheckout.fulfilled,(state,action) =>{
            state.loading = false
            state.checkout = action.payload
        })
        .addCase(createCheckout.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload?.message ?? action.error.message ?? "Failed to create checkout"
        })
    }

})

export default checkoutSlice.reducer
