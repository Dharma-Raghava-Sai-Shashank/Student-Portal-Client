import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { catchError } from '../common/handleError';
import { setMessage } from './message';
import * as departmentService from '../api/department.service';

const initialState : Department.RootObject[] = []

export const getAllDepartments = createAsyncThunk('Department/getAllDepartments', async (args, thunkAPI) => {
    try {
        const data = await departmentService.fetchAllDepartments();

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error loading Departments!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading Departments!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
});

export const saveDepartment = createAsyncThunk('Department/saveDepartment', async (args: Department.RootObject, thunkAPI) => {
    try {
        const data = await departmentService.createNewDepartment({ deptName: args.deptName });

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error saving Department!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error saving Department!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
})

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllDepartments.fulfilled, (state, action: any) => {
            state = [...action.payload.departments];
            return state;
        });
        builder.addCase(saveDepartment.fulfilled, (state, action: any) => {
            state.push(action?.payload?.department);
            return state;
        })
    }
})

const { reducer } = departmentSlice;
export default reducer;