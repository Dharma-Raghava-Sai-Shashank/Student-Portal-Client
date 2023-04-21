import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as specializationService from '../api/specialization.service';
import { catchError } from '../common/handleError';
import { setMessage } from './message';

const initialState = [] as Specialization.Response[];

interface GetSpecParams {
    courseIds: number[],
    acadYear: string
}

export const getSpecializationsByCourse = createAsyncThunk('specialization/getSpecializationByCourse', async (args: GetSpecParams, thunkAPI) => {
    try {
        const data = await specializationService.fetchSpecializationForCourses(args.courseIds, args.acadYear);

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error loading Specializations!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading Specializations!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
});

export const saveSpecialization = createAsyncThunk('specialization/saveSpecialization', async (args: Specialization.RootObject, thunkAPI) => {
    try {
        const data = await specializationService.createNewSpecialization({ specName: args.specName, discipline: args.discipline });

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error saving Specialization!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error saving Specialization!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
})

const specializationSlice = createSlice({
    name: "specialization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSpecializationsByCourse.fulfilled, (state, action: any) => {
            state = [...action.payload?.specializations]
            return state;
        });
        builder.addCase(saveSpecialization.fulfilled, (state, action: any) => {
            state.push(action.payload?.specialization);
            return state;
        })
    }
});

const { reducer } = specializationSlice;
export default reducer;