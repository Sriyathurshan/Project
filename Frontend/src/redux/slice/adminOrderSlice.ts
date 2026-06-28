import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import type { ApiError, Order } from "../types"

interface AdminOrderState {
    orders: Order[];
    totalOrders: number;
    totalSales: number;
    loading: boolean;
    error: string | null;
}

interface OrderStatusPayload {
    id: string;
    status: string;
}

const getApiError = (error: unknown, fallback: string): ApiError => {
    if (axios.isAxiosError<ApiError>(error)) {
        return error.response?.data ?? { message: error.message }
    }
    return { message: fallback }
}

// fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk<Order[], void, { rejectValue: ApiError }>("adminOrders/fetchAllOrders",
    async (_,{rejectWithValue}) =>{
        try{
            const reponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return reponse.data
        }
        catch(error){
            return rejectWithValue(getApiError(error, "Failed to fetch orders"))
        }
    }
)

// update order delivery status (admin only)
export const updateOrderStatus = createAsyncThunk<Order, OrderStatusPayload, { rejectValue: ApiError }>("adminOrders/updateOrderStatus",
    async ({id,status},{rejectWithValue}) =>{
        try{
            const reponse = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {status},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return reponse.data
        }
        catch(error){
            return rejectWithValue(getApiError(error, "Failed to update order status"))
        }
    }
)


// delete an order delivery status (admin only)
export const deleteOrder = createAsyncThunk<string, Pick<OrderStatusPayload, "id">, { rejectValue: ApiError }>("adminOrders/deleteOrder",
    async ({id},{rejectWithValue}) =>{
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return id
        }
        catch(error){
            return rejectWithValue(getApiError(error, "Failed to delete order"))
        }
    }
)

const initialState: AdminOrderState = {
    orders:[],
    totalOrders:0,
    totalSales:0,
    loading:false,
    error:null
}

const adminOrderSlice = createSlice({
    name:"adminOrders",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllOrders.pending,(state)=>{
            state.loading=true
            state.error= null
        })
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading=false
            state.orders= action.payload
            state.totalOrders=action.payload.length

            state.totalSales = action.payload.reduce((acc,order)=>{
                return acc + (order.totalPrice ?? 0)
            },0)
        })
        .addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload?.message ?? action.error.message ?? "Failed to fetch orders"
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            const updatedOrder = action.payload
            const orderIndex = state.orders.findIndex((order) =>order._id === updatedOrder._id)
            if (orderIndex !== -1){
                state.orders[orderIndex]=updatedOrder
            }
        })
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            state.orders=state.orders.filter(
                (order)=>order._id !==action.payload
            )
        })
    }


})


export default adminOrderSlice.reducer
