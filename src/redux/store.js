import { configureStore } from '@reduxjs/toolkit'

import loginSlice from './slices/loginSlice';
import categorySlice from "./slices/categorySlice";
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
    reducer: {
        loginSlice,
        categorySlice,
        productSlice,
        userSlice
    },
    devTools: true
})