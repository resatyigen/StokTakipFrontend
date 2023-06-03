import { createSlice } from '@reduxjs/toolkit';
import { GetCategoryList } from "../actions/actions";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserToken, setUserToken } from '../token';

const initialState = {
    categoryList: [],
    success: false,
    error: false,
    loading: false
}

export const getCategoryList = createAsyncThunk(
    'categorySlice/getCategoryList',
    async (filter, thunk) => {
        try {
            thunk.dispatch(setLoading(true));
            const result = await GetCategoryList();
            console.log("getCategoryList : ", result);
            return result.data;
        } catch (error) {
            console.log("getCategoryList : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setLoading(false));
        }

    }
)

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryList.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status === "SUCCESS") {
                state.categoryList = data.result;
                state.success = true;
                state.error = false;
            } else {
                state.success = false;
                state.error = true;
            }
            state.loading = false;
            console.log("getCategoryList Payload : ", action.payload.result);
        })
    }
})

// Action creators are generated for each case reducer function
export const { setLoading } = categorySlice.actions

export default categorySlice.reducer