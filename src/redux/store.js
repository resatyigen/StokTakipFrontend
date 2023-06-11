import { configureStore } from '@reduxjs/toolkit'

import loginSlice from './slices/loginSlice';
import categorySlice from "./slices/categorySlice";
import productSlice from './slices/productSlice';

export const store = configureStore({
    reducer: {
        loginSlice,
        categorySlice,
        productSlice
    },
    devTools: true
})