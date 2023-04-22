import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as noticeService from '../api/notice.service';
import { setMessage } from './message';
import { catchError } from '../common/handleError';

const initialState = [] as Notice.RootObject[];

interface GetSpecParams {
    placementCycleId: number,
    noticeDetails: Notice.RootObject
}

export const getNoticeForCycles = createAsyncThunk('notice/getNoticeForCycles', async (cycleIds: number[], thunkAPI) => {
    try {
        const data = await noticeService.fetchNoticesForCycles(cycleIds);

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error loading Notices!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading Notices!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
});

export const saveNotice = createAsyncThunk('notice/saveNotice', async (args: GetSpecParams, thunkAPI) => {
    try {
        const data = await noticeService.createNotice(args.placementCycleId, args.noticeDetails);

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error saving notice!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error saving notice!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI);
    }
})


const noticeSlice = createSlice({
    name: "notice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNoticeForCycles.fulfilled, (state, action: any) => {
            state = [...action.payload?.notices]
            return state;
        });
        builder.addCase(saveNotice.fulfilled, (state, action: any) => {
            state.push(action.payload?.notice);
            return state;
        })
    }
})

const { reducer } = noticeSlice;
export default reducer;