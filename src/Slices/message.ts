import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  open: false,
  type: 'success',
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state: any, action: RTK.Action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.open = true;
    },
    clearMessage: (state: any) => {
      state.message = '';
      state.open = false;
      state.type = 'success';
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;