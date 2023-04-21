import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as acadYearService from '../api/acadYear.service';
import { setMessage } from './message';
import { catchError } from '../common/handleError';

// const initialState : AcademicYear.RootObject[] = [];
const initialState = {
    currAcadYear: undefined as AcademicYear.RootObject | undefined,
    prevAcadYears: [] as AcademicYear.RootObject[]
};

export const fetchAcadYears = createAsyncThunk('academicyear/fetchAcadYears', async (args, thunkAPI) => {
    try {
        const data = await acadYearService.fetchAllAcadYears();

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error saving Academic Year!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading Academic Year!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI)
    }
});

export const saveAcadYear = createAsyncThunk('academicyear/saveAcadYear',async ({ year } : { year: string }, thunkAPI) => {
    try {
        const data = await acadYearService.createAcademicYear({ year });

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error loading Academic Years!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading Academic Years!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
})

const academicYearSlice = createSlice({
    name: 'academicyear',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAcadYears.fulfilled, (state, action: any) => {
            state.currAcadYear = action.payload?.acadYears.find((acadYear: AcademicYear.RootObject) => acadYear.isCurrent === 1);
            state.prevAcadYears = action.payload?.acadYears.filter((acadYear: AcademicYear.RootObject) => acadYear.isCurrent !== 1);
        });
        builder.addCase(saveAcadYear.fulfilled, (state, action: { payload: { acadYear: AcademicYear.RootObject } }) => {
            state.prevAcadYears.push(action.payload?.acadYear)
        })
    }
})

const { reducer } = academicYearSlice;
export default reducer;