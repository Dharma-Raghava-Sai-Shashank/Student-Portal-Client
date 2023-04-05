import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import * as AuthService from "../api/auth.service";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  role: string | null;
}

type AuthAction = {
    token: string;
    role: string;
}

const accessToken = localStorage.getItem("token");
const role = localStorage.getItem("role");

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password, type }: User.AuthData, thunkAPI) => {
    try {
      const data = type==='student' ? await AuthService.signin({ username, password }) : await AuthService.adminSignin({ username, password });
      if(!data?.success)
      {
        thunkAPI.dispatch(setMessage({ message: data.message || 'Something went wrong!! Please try again.', type: 'error' }));
        return thunkAPI.rejectWithValue(data.message || 'Something went wrong!! Please try again.');
      }
      else
      thunkAPI.dispatch(setMessage({ message: 'User Sign-in Successfully!!', type: 'success' }));

      return { token: data.token, role: data.role };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage({ message, type: 'error' }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState: AuthState = accessToken
  ? { isLoggedIn: true, accessToken, role }
  : { isLoggedIn: false, accessToken: null, role: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state: AuthState, action: PayloadAction<AuthAction> ) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
      state.role = action.payload.role;
    });
    builder.addCase(login.rejected, (state: AuthState) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.role = null;
    });
    builder.addCase(logout.fulfilled, (state: AuthState) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.role = null;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
