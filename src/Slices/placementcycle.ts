import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { catchError } from "../common/handleError";
import * as PlacementCycleService from "../api/placementCycle.service";

import { isOngoing } from "../helpers/index";
interface RequestType {
  type: string;
}

interface InitialState {
  ongoing: PlacementCycle.RootObject[];
  previous: PlacementCycle.RootObject[];
  currCycle: PlacementCycle.RootObject | undefined;
  specializations: Specialization.Response[];
}

const initialState: InitialState = {
  ongoing: [],
  previous: [],
  currCycle: undefined,
  specializations: []
};

export const fetchPlacementCycles = createAsyncThunk(
  "placementCycle/fetchPlacementCycles",
  async ({ type }: RequestType, thunkAPI) => {
    try {
      /*
       * If the type is admin then fetch all the placementCycles
       * else only fetch the cycles in which the student has been enrolled
       */
      const data =
        type === "admin"
          ? await PlacementCycleService.fetchAllPlacementCycles()
          : await PlacementCycleService.fetchEnrolledPlacementCycles();

      if (!data || !data?.success) {
        thunkAPI.dispatch(
          setMessage({
            message:
              data.message ||
              "Error loading Placement Cycles!! Please try again.",
            type: "error",
          })
        );
        return thunkAPI.rejectWithValue(
          data.message || "Error loading Placement Cycles!! Please try again."
        );
      }
      return data;
    } catch (error) {
      return catchError(error, thunkAPI);
    }
  }
);

export const getPlacementCycleById = createAsyncThunk(
  "placementcycle/getPlacementCycleById",
  async (args: { placementCycleId: number }, thunkAPI) => {
    try {
      const data = await PlacementCycleService.fetchPlacementCycleById(args.placementCycleId);

      if (!data || !data?.success) {
        thunkAPI.dispatch(
          setMessage({
            message:
              data.message ||
              "Error loading Placement Cycle Details!! Please try again.",
            type: "error",
          })
        );
        return thunkAPI.rejectWithValue(
          data.message || "Error loading Placement Cycle Details!! Please try again."
        );
      }
      return data;
    } catch (error) {
      return catchError(error, thunkAPI);
    }
  }
);


export const savePlacementCycle = createAsyncThunk(
  "placementcycle/savePlacementCycle",
  async (args: PlacementCycle.RootObject, thunkAPI) => {
    try {
      const data = await PlacementCycleService.createPlacementCycle(args);

      if (!data || !data?.success) {
        thunkAPI.dispatch(
          setMessage({
            message:
              data.message ||
              "Error loading Placement Cycles!! Please try again.",
            type: "error",
          })
        );
        return thunkAPI.rejectWithValue(
          data.message || "Error loading Placement Cycles!! Please try again."
        );
      }
      return data;
    } catch (error) {
      return catchError(error, thunkAPI);
    }
  }
);

export const saveSpecializationForCycle = createAsyncThunk(
  "placementcycle/saveSpecializationForCycle",
  async (args: { placementCycleId: number; specIds: number[] }, thunkAPI) => {
    try {
      const data = await PlacementCycleService.updateSpecializationForCycle(
        args.placementCycleId,
        args.specIds
      );

      if (!data || !data?.success) {
        thunkAPI.dispatch(
          setMessage({
            message:
              data.message ||
              "Error saving specializations for Placement Cycles!! Please try again.",
            type: "error",
          })
        );
        return thunkAPI.rejectWithValue(
          data.message ||
            "Error saving specializations for Placement Cycles!! Please try again."
        );
      }
      thunkAPI.dispatch(getPlacementCycleById({ placementCycleId: data?.placementCycleId }));
      return data;
    } catch (error) {
      return catchError(error, thunkAPI);
    }
  }
);

const placementCycleSlice = createSlice({
  name: "placementcycle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlacementCycles.fulfilled, (state, action: any) => {
      const ongoing: PlacementCycle.RootObject[] = [],
        previous: PlacementCycle.RootObject[] = [];
      action.payload?.cycles?.map((cycle: PlacementCycle.RootObject) => {
        isOngoing(cycle.startDate, cycle.endDate)
          ? ongoing.push(cycle)
          : previous.push(cycle);

        return cycle;
      });
      return { ...state, ongoing, previous };
    });

    builder.addCase(getPlacementCycleById.fulfilled, (state, action: any) => {
      state.currCycle = action.payload.placementCycle
      state.specializations = action.payload.specializations;
      return state;
    })

    builder.addCase(savePlacementCycle.fulfilled, (state, action: any) => {
      const { placementCycle } = action.payload;
      isOngoing(placementCycle?.startDate, placementCycle?.endDate)
        ? state.ongoing.push(placementCycle)
        : state.previous.push(placementCycle);
    });

    builder.addCase(saveSpecializationForCycle.fulfilled, (state, action: any) => {
    })
  },
});

const { reducer } = placementCycleSlice;
export default reducer;
