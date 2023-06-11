import { createSlice } from '@reduxjs/toolkit';
import {
    GetCategory,
    GetCategoryFilterList,
    GetCategoryList,
    PostAddCategory,
    PutEditCategory,
    DeleteCategory
} from "../actions/actions";
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    getCategoryListState: {
        categoryList: [],
        loading: false,
        success: false
    },
    getCategoryFilterListState: {
        categoryList: [],
        listSize: 0,
        loading: false,
        success: false,
    },
    getCategoryState: {
        category: null,
        loading: false,
        success: false
    },
    postAddCategoryState: {
        loading: false,
        success: false,
        error: false
    },
    putEditCategoryState: {
        loading: false,
        success: false,
        error: false
    },
    deleteCategoryState: {
        loading: false,
        success: false,
        error: false
    },
    selectedCategoryState: {
        category: null
    }
}

export const getCategoryList = createAsyncThunk(
    'categorySlice/getCategoryList',
    async (filter, thunk) => {
        try {
            thunk.dispatch(setGetCategoryListLoading(true));
            const result = await GetCategoryList();
            console.log("getCategoryList : ", result);
            return result.data;
        } catch (error) {
            console.log("getCategoryList : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setGetCategoryListLoading(false));
        }

    }
)

export const getCategoryFilterList = createAsyncThunk(
    'categorySlice/getCategoryFilterList',
    async (filter, thunk) => {
        try {
            console.log("FILTER", filter);
            thunk.dispatch(setGetCategoryFilterListLoading(true));
            const result = await GetCategoryFilterList(filter);
            console.log("getCategoryFilterList : ", result);
            return result.data;
        } catch (error) {
            console.log("getCategoryFilterList : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setGetCategoryFilterListLoading(false));
        }
    }
)

export const getCategory = createAsyncThunk(
    'categorySlice/getCategory',
    async (filter, thunk) => {
        try {
            console.log("FILTER", filter);
            thunk.dispatch(setGetCategoryLoading(true));
            const result = await GetCategory(filter);
            console.log("getCategory : ", result);
            return result.data;
        } catch (error) {
            console.log("getCategory : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setGetCategoryLoading(false));
        }
    }
)

export const postAddCategory = createAsyncThunk(
    'categorySlice/postAddCAtegory',
    async (data, thunk) => {
        try {
            thunk.dispatch(setPostAddCategoryLoading(true));
            const result = await PostAddCategory(data);
            console.log("addCAtegory : ", result);
            thunk.dispatch(getCategoryList());
            return result.data;
        } catch (error) {
            console.log("addCategory : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setPostAddCategoryLoading(false));
        }

    }
)

export const putEditCategory = createAsyncThunk(
    'categorySlice/putEditCategory',
    async (data, thunk) => {
        try {
            thunk.dispatch(setPutEditCategoryLoading(true));
            const result = await PutEditCategory(data);
            thunk.dispatch(getCategory({ id: data.id }));
            console.log("putEditCategory : ", result);
            return result.data;
        } catch (error) {
            console.log("putEditCategory : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setPutEditCategoryLoading(false));
        }

    }
)

export const deleteCategory = createAsyncThunk(
    'categorySlice/deleteCategory',
    async (data, thunk) => {
        try {
            thunk.dispatch(setDeleteCategoryLoading(true));
            const result = await DeleteCategory(data);
            console.log("deleteCategory : ", result);
            thunk.dispatch(getCategoryList());
            return result.data;
        } catch (error) {
            console.log("deleteCategory : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setDeleteCategoryLoading(false));
        }

    }
)

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setGetCategoryListLoading(state, action) {
            state.getCategoryListState.loading = action.payload;
        },
        setGetCategoryFilterListLoading(state, action) {
            state.getCategoryFilterListState.loading = action.payload;
        },
        setPostAddCategoryLoading(state, action) {
            state.postAddCategoryState.loading = action.payload;
        },
        setDeleteCategoryLoading(state, action) {
            state.deleteCategoryState.loading = action.payload;
        },
        setGetCategoryLoading(state, action) {
            state.getCategoryState.loading = action.payload;
        },
        setPutEditCategoryLoading(state, action) {
            state.putEditCategoryState.loading = action.payload;
        },
        setSelectedCategoryState(state, action) {
            state.selectedCategoryState.category = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryList.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.getCategoryListState = {
                    categoryList: data.result,
                    success: true,
                    error: false,
                    loading: false
                }
            } else {
                state.getCategoryListState = {
                    categoryList: [],
                    success: false,
                    error: true,
                    loading: false
                }
            }
            console.log("getCategoryList Payload : ", action.payload.result);
        }).addCase(postAddCategory.fulfilled, (state, action) => {

            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.postAddCategoryState = {
                    success: true,
                    error: false,
                    loading: false
                }
            } else {
                state.postAddCategoryState = {
                    success: false,
                    error: true,
                    loading: false
                }
            }
            console.log("postAddCategory Payload : ", action.payload.result);
        }).addCase(getCategoryFilterList.fulfilled, (state, action) => {

            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.getCategoryFilterListState = {
                    categoryList: data.result.categoryList,
                    listSize: data.result.listSize,
                    success: true,
                    error: false,
                    loading: false
                }
            } else {
                state.getCategoryFilterListState = {
                    categoryList: [],
                    listSize: 0,
                    success: false,
                    error: true,
                    loading: false
                }
            }
            console.log("getCategoryFilterList Payload : ", action.payload.result);
        }).addCase(getCategory.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.getCategoryState = {
                    category: data.result,
                    success: true,
                    error: false,
                    loading: false
                }
            } else {
                state.getCategoryState = {
                    category: null,
                    success: false,
                    error: true,
                    loading: false
                }
            }
            console.log("getCategory Payload : ", action.payload.result);
        }).addCase(putEditCategory.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.putEditCategoryState = {
                    success: true,
                    error: false,
                    loading: false
                }
            } else {
                state.putEditCategoryState = {
                    success: false,
                    error: true,
                    loading: false
                }
            }
            console.log("putEditCategory Payload : ", action.payload.result);
        }).addCase(deleteCategory.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.deleteCategoryState = {
                    loading: false,
                    success: true,
                    error: false
                }
            } else {
                state.deleteCategoryState = {
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("deleteCategory Payload : ", action.payload);
        })
    }
})

// Action creators are generated for each case reducer function
export const {
    setLoading,
    setGetCategoryListLoading,
    setGetCategoryFilterListLoading,
    setPostAddCategoryLoading,
    setDeleteCategoryLoading,
    setGetCategoryLoading,
    setPutEditCategoryLoading,
    setCategoryEdited,
    setCategoryDeleted
} = categorySlice.actions

export default categorySlice.reducer