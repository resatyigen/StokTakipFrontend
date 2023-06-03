import { createSlice } from '@reduxjs/toolkit';
import { PostLogin } from "../actions/actions";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserToken, setUserToken } from '../token';

const initialState = {
    authToken: "",
    loginSuccess: false,
    loginError: false,
    loginLoading: false
}

export const postLogin = createAsyncThunk(
    'loginSlice/postLogin',
    async (filter, thunk) => {
        try {
            thunk.dispatch(setLoginLoading(true));
            const result = await PostLogin(filter);
            console.log("postLoginResult : ", result);
            return result.data;
        } catch (error) {
            console.log("postLoginError : ", error);
            // hatalar toast ile gösterilecek.
            thunk.dispatch(setLoginLoading(false));
        }

    }
)

export const loginSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setLoginLoading(state, action) {
            state.loginLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status === "SUCCESS") {
                setUserToken(data.token);
                state.loginSuccess = true;
                state.loginError = false;
            } else {
                state.loginSuccess = false;
                state.loginError = true;
            }
            state.loginLoading = false;
            console.log("posrLoginFulfilled Payload : ", action.payload);
        })
    }
})

// Action creators are generated for each case reducer function
export const { setLoginLoading } = loginSlice.actions

export default loginSlice.reducer