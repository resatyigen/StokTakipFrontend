import { createSlice } from '@reduxjs/toolkit';
import { DeleteProduct, GetProduct, GetProductFilterList, PostAddProduct, PutEditProduct } from "../actions/actions";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpError } from '../../Utils/HttpError';

const initialState = {
    postAddProductState: {
        loading: false,
        success: false,
        error: false
    },
    getProductFilterListState: {
        productList: [],
        listSize: 0,
        loading: false,
        success: false,
        error: false
    },
    deleteProductState: {
        loading: false,
        success: false,
        error: false
    },
    getProductState: {
        product: null,
        loading: false,
        success: false,
        error: false
    },
    putEditProductState: {
        loading: false,
        success: false,
        error: false
    }
}

export const postAddProduct = createAsyncThunk(
    'productSlice/addProduct',
    async (data, thunk) => {
        try {
            thunk.dispatch(setPostAddProductLoading(true));
            const result = await PostAddProduct(data);
            console.log("addProduct : ", result);
            return result.data;
        } catch (error) {
            console.log("addProduct : ", error);
            // hatalar toast ile gösterilecek.
            HttpError(error);
            thunk.dispatch(setPostAddProductLoading(false));
        }
    }
)

export const getProductFilterList = createAsyncThunk(
    'productSlice/getProductFilterList',
    async (data, thunk) => {
        try {
            thunk.dispatch(setGetProductFilterListLoading(true));
            const result = await GetProductFilterList(data);
            console.log("getProductFilterList : ", result);
            return result.data;
        } catch (error) {
            console.log("getProductFilterList : ", error);
            // hatalar toast ile gösterilecek.
            HttpError(error);
            thunk.dispatch(setGetProductFilterListLoading(false));
        }
    }
)

export const getProduct = createAsyncThunk(
    'productSlice/getProduct',
    async (filter, thunk) => {
        try {
            thunk.dispatch(setGetProductLoading(true));
            const result = await GetProduct(filter);
            console.log("getProduct : ", result);
            return result.data;
        } catch (error) {
            console.log("getProduct : ", error);
            // hatalar toast ile gösterilecek.
            HttpError(error);
            thunk.dispatch(setGetProductLoading(false));
        }
    }
)

export const putEditProduct = createAsyncThunk(
    'productSlice/putEditProduct',
    async (filter, thunk) => {
        try {
            thunk.dispatch(setPutEditProductLoading(true));
            const result = await PutEditProduct(filter);
            console.log("putEditProduct : ", result);
            return result.data;
        } catch (error) {
            console.log("putEditProduct : ", error);
            // hatalar toast ile gösterilecek.
            HttpError(error);
            thunk.dispatch(setPutEditProductLoading(false));
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'productSlice/deleteProduct',
    async (data, thunk) => {
        try {
            thunk.dispatch(setDeleteProductLoading(true));
            const result = await DeleteProduct(data);
            console.log("deleteProduct : ", result);
            return result.data;
        } catch (error) {
            console.log("deleteProduct : ", error);
            // hatalar toast ile gösterilecek.
            HttpError(error);
            thunk.dispatch(setDeleteProductLoading(false));
        }

    }
)


export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setPostAddProductLoading(state, action) {
            state.postAddProductState.loading = action.payload;
        },
        setGetProductFilterListLoading(state, action) {
            state.getProductFilterListState.loading = action.payload;
        },
        setDeleteProductLoading(state, action) {
            state.deleteProductState.loading = action.payload;
        },
        setPutEditProductLoading(state, action) {
            state.putEditProductState.loading = action.payload;
        },
        setGetProductLoading(state, action) {
            state.getProductState.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postAddProduct.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.postAddProductState = {
                    success: true,
                    error: false,
                    loading: false
                }
            } else {
                state.postAddProductState = {
                    success: false,
                    error: true,
                    loading: false
                }
            }
            console.log("postAddProduct Payload : ", action.payload);
        }).addCase(getProductFilterList.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.getProductFilterListState = {
                    productList: data.result.productList,
                    listSize: data.result.listSize,
                    loading: false,
                    success: true,
                    error: false
                }
            } else {
                state.getProductFilterListState = {
                    productList: [],
                    listSize: 0,
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("getCategoryFilterList Payload : ", action.payload);
        }).addCase(getProduct.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.getProductState = {
                    product: data.result,
                    loading: false,
                    success: true,
                    error: false
                }
            } else {
                state.getProductState = {
                    product: null,
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("getProduct Payload : ", action.payload);
        }).addCase(putEditProduct.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.putEditProductState = {
                    loading: false,
                    success: true,
                    error: false
                }
                state.getProductState = {
                    product: data.result
                }
            } else {
                state.putEditProductState = {
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("getProduct Payload : ", action.payload);
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.deleteProductState = {
                    loading: false,
                    success: true,
                    error: false
                }
            } else {
                state.deleteProductState = {
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("deleteProduct Payload : ", action.payload);
        })
    }
})

// Action creators are generated for each case reducer function
export const {
    setPostAddProductLoading,
    setGetProductFilterListLoading,
    setDeleteProductLoading,
    setPutEditProductLoading,
    setGetProductLoading
} = productSlice.actions

export default productSlice.reducer