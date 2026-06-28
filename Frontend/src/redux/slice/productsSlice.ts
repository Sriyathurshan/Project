import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { ApiError, Product, ProductFilters } from "../types"

interface ProductsState {
    products: Product[];
    selectedProduct: Product | null;
    similarProducts: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
}

interface UpdateProductPayload {
    id: string | number;
    productData: Partial<Product>;
}

const getApiError = (error: unknown, fallback: string): ApiError => {
    if (axios.isAxiosError<ApiError>(error)) {
        return error.response?.data ?? { message: error.message }
    }
    return { message: fallback }
}

//Async thunks to fetch Products by Vollection and optional Filters
export const fetchProductsByFilters = createAsyncThunk<Product[], ProductFilters, { rejectValue: ApiError }>(
    "products/fetchByFilters",
async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit
}, {rejectWithValue}) =>{
    try{
    const query = new URLSearchParams()
    if (collection) query.append("collection",collection)
    if (size) query.append("size",size)
    if (color) query.append("color",color)
    if (gender) query.append("gender",gender)
    if (minPrice) query.append("minPrice",minPrice)
    if (maxPrice) query.append("maxPrice",maxPrice)
    if (sortBy) query.append("sortBy",sortBy)
    if (search) query.append("search",search)
    if (category) query.append("category",category)
    if (material) query.append("material",material) 
    if (brand) query.append("brand",brand)
    if (limit) query.append("limit",String(limit))


    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`)

    return response.data
    }
    catch(error){
        return rejectWithValue(getApiError(error, "Failed to fetch products"))
    }

}
)

export const fetchProductDetails=createAsyncThunk<Product, string | number, { rejectValue: ApiError }>("products/fetchProductDetails" , async(id,{rejectWithValue}) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
        return response.data
    }
    catch(error){
        return rejectWithValue(getApiError(error, "Failed to fetch product details"))
    }
})

//Async thunk to fetch smilar products
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async({id,productData}: UpdateProductPayload) =>{
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,
            {
                headers :{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
    }
)

//Asyn thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async ({id}: { id: string | number }) =>{
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`)
        return response.data
    }
    
)

const initialState: ProductsState = {
    products:[],
    selectedProduct:null,
    similarProducts:[],
    loading:false,
    error:null,
    filters:{
        category:"",
        size:"",
        color:"",
        gender:"",
        brand:"",
        minPrice:"",
        maxPrice:"",
        sortBy:"",
        search:"",
        material:"",
        collection:""
    },
}

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers :{
        setFilters:(state,action: PayloadAction<ProductFilters>)=>{
            state.filters={...state.filters,...action.payload}
        },
        clearFilters:(state)=>{
            state.filters={
                category:"",
                size:"",
                color:"",
                gender:"",
                brand:"",
                minPrice:"",
                maxPrice:"",
                sortBy:"",
                search:"",
                material:"",
                collection:""
            }
        }
    },
    extraReducers:(builder) =>{
        builder
        //handle fetching products with filter
        .addCase(fetchProductsByFilters.pending,(state) =>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchProductsByFilters.fulfilled,(state,action) =>{
            state.loading=false,
            state.products = Array.isArray(action.payload) ? action.payload :[]
        })
        .addCase(fetchProductsByFilters.rejected,(state,action) =>{
            state.loading=false,
            state.error=action.payload?.message ?? action.error.message ?? "Failed to fetch products"
        })
        //Handle fetching single product details
        .addCase(fetchProductDetails.pending,(state) =>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchProductDetails.fulfilled,(state,action) =>{
            state.loading=false,
            state.selectedProduct = action.payload
        })
        .addCase(fetchProductDetails.rejected,(state,action) =>{
            state.loading=false,
            state.error=action.payload?.message ?? action.error.message ?? "Failed to fetch product details"
        })
        //Handle updating Product
        .addCase(updateProduct.pending,(state) =>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateProduct.fulfilled,(state,action) =>{
            state.loading=false
            const updatedProduct = action.payload as Product
            const index =state.products.findIndex((product) =>product._id === updatedProduct._id)
            if (index !== -1){
                state.products[index] =updatedProduct
            }
        })
        .addCase(updateProduct.rejected,(state,action) =>{
            state.loading=false,
            state.error=action.error.message ?? null
        })
        .addCase(fetchSimilarProducts.pending,(state) =>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action) =>{
            state.loading=false,
            state.similarProducts= action.payload
        })
        .addCase(fetchSimilarProducts.rejected,(state,action) =>{
            state.loading=false,
            state.error=action.error.message ?? null
        })
    }
})

export const {setFilters,clearFilters} =productsSlice.actions
export default productsSlice.reducer
