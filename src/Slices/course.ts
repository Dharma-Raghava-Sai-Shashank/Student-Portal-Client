import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { catchError } from '../common/handleError';
import { setMessage } from './message';
import * as courseService from '../api/course.service';

const initialState : Course.RootObject[] = []

export const getAllCourses = createAsyncThunk('course/getAllCourses', async (args, thunkAPI) => {
    try {
        const data = await courseService.fetchAllCourses();

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error loading courses!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading courses!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
});

export const saveCourse = createAsyncThunk('course/saveCourse', async (args: Course.RootObject, thunkAPI) => {
    try {
        const data = await courseService.createNewCourse({ courseName: args.courseName, duration: args.duration });

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error saving course!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error saving course!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
})

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action: any) => {
            state = [...action.payload.courses];
            return state;
        });
        builder.addCase(saveCourse.fulfilled, (state, action: any) => {
            state.push(action?.payload?.course);
            return state;
        })
    }
})

const { reducer } = courseSlice;
export default reducer;