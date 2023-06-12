import { createSlice } from '@reduxjs/toolkit';
import { GetUserInfo, PutChangePassword, PutEditUserInfo } from "../actions/actions";
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    getUserInfoState: {
        user: null,
        loading: false,
        success: false,
        error: false
    },
    putEditUserInfoState: {
        loading: false,
        success: false,
        error: false
    },
    putChangePasswordState: {
        loading: false,
        success: false,
        error: false
    }
}

export const getUserInfo = createAsyncThunk(
    'userSlice/getUserInfo',
    async (_, thunk) => {
        try {
            thunk.dispatch(setGetUserInfoLoading(true));
            const result = await GetUserInfo();
            console.log("getUserInfo : ", result);
            return result.data;
        } catch (error) {
            console.log("getUserInfo : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setGetUserInfoLoading(false));
        }

    }
)

export const putEditUserInfo = createAsyncThunk(
    'userSlice/putEditUserInfo',
    async (data, thunk) => {
        try {
            thunk.dispatch(setPutEditUserInfoLoading(true));
            const result = await PutEditUserInfo(data);
            console.log("putEditUserInfo : ", result);
            return result.data;
        } catch (error) {
            console.log("putEditUserInfo : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setPutEditUserInfoLoading(false));
        }

    }
)

export const putChangePassword = createAsyncThunk(
    'userSlice/putChangePassword',
    async (data, thunk) => {
        try {
            thunk.dispatch(setPutChangePasswordLoading(true));
            const result = await PutChangePassword(data);
            console.log("putChangePassword : ", result);
            return result.data;
        } catch (error) {
            console.log("putChangePassword : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setPutChangePasswordLoading(false));
        }

    }
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setGetUserInfoLoading(state, action) {
            state.getUserInfoState.loading = action.payload;
        },
        setPutEditUserInfoLoading(state, action) {
            state.putEditUserInfoState.loading = action.payload;
        },
        setPutChangePasswordLoading(state, action) {
            state.putChangePasswordState.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.getUserInfoState = {
                    user: data.result,
                    loading: false,
                    success: true,
                    error: false
                }
            } else {
                state.getUserInfoState = {
                    user: null,
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("getUserInfo Payload : ", action.payload);
        }).addCase(putEditUserInfo.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.putEditUserInfoState = {
                    loading: false,
                    success: true,
                    error: false
                }
                state.getUserInfoState.user = data.result;
            } else {
                state.putEditUserInfoState = {
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("putEditUserInfo Payload : ", action.payload);
        }).addCase(putChangePassword.fulfilled, (state, action) => {
            const data = action.payload;
            if (data?.status === "SUCCESS") {
                state.putChangePasswordState = {
                    loading: false,
                    success: true,
                    error: false
                }
            } else {
                state.putChangePasswordState = {
                    loading: false,
                    success: false,
                    error: true
                }
            }
            console.log("putEditUserInfo Payload : ", action.payload);
        })
    }
})

// Action creators are generated for each case reducer function
export const {
    setGetUserInfoLoading,
    setPutEditUserInfoLoading,
    setPutChangePasswordLoading
} = userSlice.actions

export default userSlice.reducer