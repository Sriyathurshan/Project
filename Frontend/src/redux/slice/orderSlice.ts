import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import type { ApiError, Order } from "../types"

interface OrderState {
    orders: Order[];
    totalOrders: number;
    orderDetails: Order | null;
    loading: boolean;
    error: string | null;
}

//Async thunk to fetch user Orders
export const fetchUserOrders = createAsyncThunk<Order[], void, { rejectValue: ApiError }> (
    "orders/fetchUserOrders",
    async (_,{rejectWithValue})=>{
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        }
        catch(error){
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(error.response?.data ?? { message: error.message })
            }
            return rejectWithValue({ message: "Failed to fetch orders" })
        }
    }
)

//Async thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk<Order, string | number, { rejectValue: ApiError }>(
    "order/fetchOrderDetails",
    async (orderId: string | number,{rejectWithValue})=>{
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        }
        catch(error){
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(error.response?.data ?? { message: error.message })
            }
            return rejectWithValue({ message: "Failed to fetch order details" })
        }
    })

    const initialState: OrderState = {
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null
    }

    const orderSlice = createSlice({
        name:"orders",
        initialState,
        reducers:{},
        extraReducers:(builder) =>{
            builder
            .addCase(fetchUserOrders.pending,(state)=>{
                state.loading=true,
                state.error = null
            })
            .addCase(fetchUserOrders.fulfilled,(state,action)=>{
                state.loading=false,
                state.orders = action.payload
            })
            .addCase(fetchUserOrders.rejected,(state,action)=>{
                state.loading=false,
                state.error = action.payload?.message ?? action.error.message ?? "Failed to fetch orders"
            })
            .addCase(fetchOrderDetails.pending,(state)=>{
                state.loading=true,
                state.error = null
            })
            .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
                state.loading=false,
                state.orderDetails = action.payload
            })
            .addCase(fetchOrderDetails.rejected,(state,action)=>{
                state.loading=false,
                state.error = action.payload?.message ?? action.error.message ?? "Failed to fetch order details"
            })
        }
    })

    export default orderSlice.reducer
