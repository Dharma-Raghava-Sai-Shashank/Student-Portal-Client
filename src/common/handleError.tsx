import { setMessage } from "../Slices/message";

export const catchError = (error: any, thunkAPI: any) => {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
  thunkAPI.dispatch(setMessage({ message, type: 'error' }));
  return thunkAPI.rejectWithValue(message);
}