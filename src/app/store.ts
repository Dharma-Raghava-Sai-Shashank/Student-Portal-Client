import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../Slices/auth';
import messageReducer from '../Slices/message';
import placementReducer from '../Slices/placementcycle';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        message: messageReducer,
        placementcycle: placementReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch