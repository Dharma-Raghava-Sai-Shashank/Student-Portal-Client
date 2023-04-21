import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { catchError } from '../common/handleError';
import { setMessage } from './message';
import * as disciplineService from '../api/discipline.service';

const initialState : Discipline.RootObject[] = []

export const getAllDisciplines = createAsyncThunk('iscipline/getAllDisciplines', async (args, thunkAPI) => {
    try {
        const data = await disciplineService.fetchAllDisciplines();

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error loading Disciplines!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading Disciplines!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
});

export const saveDiscipline = createAsyncThunk('discipline/saveDiscipline', async (args: Discipline.RootObject, thunkAPI) => {
    try {
        const data = await disciplineService.createNewDiscipline({ disciplineName: args.disciplineName, dept: args.dept, course: args.course });

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error saving Discipline!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error saving Discipline!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
})

const DisciplineSlice = createSlice({
    name: 'discipline',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllDisciplines.fulfilled, (state, action: any) => {
            state = [...action.payload.disciplines];
            return state;
        });
        builder.addCase(saveDiscipline.fulfilled, (state, action: any) => {
            state.push(action?.payload?.discipline);
            return state;
        })
    }
})

const { reducer } = DisciplineSlice;
export default reducer;