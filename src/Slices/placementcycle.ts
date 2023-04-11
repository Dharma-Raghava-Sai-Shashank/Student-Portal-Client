import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { catchError } from "../common/handleError";
import * as PlacementCycleService from '../api/placementCycle.service';

interface RequestType {
    type: string,
}

const initialState = [] as any;

export const fetchPlacementCycles = createAsyncThunk("placementCycle/fetchPlacementCycles", async ({ type }: RequestType, thunkAPI) => {
    try {
        /*
        * If the type is admin then fetch all the placementCycles
        * else only fetch the cycles in which the student has been enrolled
        */
        const data = type==='admin' ? await PlacementCycleService.fetchAllPlacementCycles() : await PlacementCycleService.fetchEnrolledPlacementCycles();

        if(!data || !data?.success)
        {
            thunkAPI.dispatch(setMessage({ message: data.message || 'Error loading Placement Cycles!! Please try again.', type: 'error' }));
            return thunkAPI.rejectWithValue(data.message || 'Error loading Placement Cycles!! Please try again.');
        }
        return data;
    } catch (error) {
        return catchError(error, thunkAPI)
    }
})

const placementCycleSlice = createSlice({
    name: 'placementcycle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlacementCycles.fulfilled, (state, action: any) => {
            state = [...action.payload.cycles]
        })
    },
})

const { reducer } = placementCycleSlice;
export default reducer;