import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../Slices/auth';
import messageReducer from '../Slices/message';
import placementReducer from '../Slices/placementcycle';
import acadyearReducer from '../Slices/academicYear';
import courseReducer from '../Slices/course';
import departmentReducer from '../Slices/department';
import disciplineReducer from '../Slices/discipline';
import specializationReducer from '../Slices/specialization';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        message: messageReducer,
        placementcycle: placementReducer,
        academicyear: acadyearReducer,
        course: courseReducer,
        department: departmentReducer,
        discipline: disciplineReducer,
        specialization: specializationReducer,
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch