import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

//retrieve user info and token form localstorage if available
const userFromStorage = localStorage.getItem("userInfo")
 ? JSON.parse(localStorage.getItem("userInfo"))
 : null

 //check for an existing guests ID in the localStorage or generate a new One
const initialGuestId = 
    localStorage.getItem("guestId")|| `guest_${new Date().getTime()}`
localStorage.setItem("guestId" , initialGuestId) 

//inital state
const initialState = {
    user:userFromStorage,
    guestId:initialGuestId,
    loading:false,
    error:null
}

//Async Thunk for User Login
export const loginUser = createAsyncThunk("auth/login",async(userData,{rejectWithValue})=>{
    try{
        const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
            userData
        )
        localStorage.setItem("userInfo",JSON.stringify(response.data.user))
        localStorage.setItem("userToken",response.data.token)
       
        return response.data.user //return the object from the response
    }
    catch(error){
        return rejectWithValue(error.response.data)
    }
})

//Async Thunk for User Registration
export const registerUser = createAsyncThunk("auth/resgisterUser",async(userData,{rejectWithValue})=>{
    try{
        const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
            userData
        )
        localStorage.setItem("userInfo",JSON.stringify(response.data.user))
        localStorage.setItem("userToken",response.data.token)
       
        return response.data.user //return the object from the response
    }
    catch(error){
        return rejectWithValue(error.response.data)
    }
})

//Slice 
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout :(state)=>{
            state.user= null
            state.guestId =`guest_${new Date().getTime()}` // Reset guests ID on logout
            localStorage.removeItem("userInfo")
            localStorage.removeItem("userToken")
            localStorage.setItem("guestId",state.guestId) //set new guests ID in LocalStorage
        },
        generateNewGuestId : (state) =>{
            localStorage.setItem("guestId",state.guestId)
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase (loginUser.pending,(state) =>{
            state.loading = true
            state.error=null
        })
        .addCase (loginUser.fulfilled,(state,action) =>{
            state.loading = false
            state.user = action.payload
            state.error = null
        })
        .addCase (loginUser.rejected,(state,action) =>{
            state.loading = false
            state.error=action.payload.message
        })
        .addCase (registerUser.pending,(state) =>{
            state.loading = true
            state.error=null
        })
        .addCase (registerUser.fulfilled,(state,action) =>{
            state.loading = false
            state.user = action.payload
            state.error = null
        })
        .addCase (registerUser.rejected,(state,action) =>{
            state.loading = false
            state.error=action.payload.message
        })
    }
})


export const {logout,generateNewGuestId} = authSlice.actions
export default authSlice.reducer