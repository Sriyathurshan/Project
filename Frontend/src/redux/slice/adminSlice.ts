import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import type { ApiError, User } from "../types"

interface AdminState {
    users: User[];
    loading: boolean;
    error: string | null;
}

interface UpdateUserPayload {
    id: string;
    name?: string;
    email?: string;
    role?: string;
}

interface UpdateUserResponse {
    updatedUser: User;
}

//fetch all users(admin only)
export const fetchUsers = createAsyncThunk<User[]>("admin/fetchUsers",async()=>{
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {headers : {Authorization : `Bearer ${localStorage.getItem("userToken")}`}}

    )
    return response.data
})

//add the create user action
export const addUser = createAsyncThunk<{ user: User }, Partial<User>, { rejectValue: ApiError }>("admin/addUser",async(userData,{rejectWithValue})=>{
    try{
        const response =await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            userData,
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
        return rejectWithValue({ message: "Failed to add user" })
    }
})

//update user infromation
const getApiError = (error: unknown, fallback: string): ApiError => {
    if (axios.isAxiosError<ApiError>(error)) {
        return error.response?.data ?? { message: error.message }
    }
    return { message: fallback }
}

export const updateUser= createAsyncThunk<User, UpdateUserPayload, { rejectValue: ApiError }>("admin/updateUser",async({id,name,email,role},{rejectWithValue})=>{
    try{
        const response = await axios.put<UpdateUserResponse>(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {name,email,role},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data.updatedUser
    }
    catch(error){
        return rejectWithValue(getApiError(error, "Failed to update user"))
    }
})

// deleet a user
export const deleteUser = createAsyncThunk<string, string, { rejectValue: ApiError }>("/admin/deleteUser" , async(id,{rejectWithValue})=>{
    try{
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return id
    }
    catch(error){
        return rejectWithValue(getApiError(error, "Failed to delete user"))
    }
})


const initialState: AdminState = {
    users:[],
    loading:false,
    error:null
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchUsers.pending,(state) =>{
            state.loading=true
        })
        .addCase(fetchUsers.fulfilled,(state,action) =>{
            state.loading=false
            state.users=action.payload
        })
        .addCase(fetchUsers.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message ?? null
        })
        .addCase(updateUser.fulfilled,(state,action) =>{
            const updateUser = action.payload
            const userIndex = state.users.findIndex(
                (user) => user._id===updateUser._id)
            if (userIndex!== -1){
                state.users[userIndex] = updateUser
            }
        })
        .addCase(updateUser.rejected,(state,action) =>{
            state.error=action.payload?.message ?? action.error.message ?? "Failed to update user"
        })
        .addCase(deleteUser.fulfilled,(state,action) =>{
            state.users= state.users.filter((user)=>user._id !== action.payload)
        })
        .addCase(deleteUser.rejected,(state,action) =>{
            state.error=action.payload?.message ?? action.error.message ?? "Failed to delete user"
        })
        .addCase(addUser.pending,(state) =>{
            state.loading=true
            state.error=null
        })
        .addCase(addUser.fulfilled,(state,action) =>{
            state.loading=false
            state.users.push(action.payload.user)
        })
        .addCase(addUser.rejected,(state,action) =>{
            state.loading=false
            state.error=action.payload?.message ?? action.error.message ?? "Failed to add user"
        })
    }
})

export default adminSlice.reducer
