import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../Slices/auth';
import messageReducer from '../Slices/message';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        message: messageReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch