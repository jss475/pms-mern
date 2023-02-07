import { createSlice } from "@reduxjs/toolkit";

const jwtTokenSlice = createSlice({
  name: "jwtToken",
  initialState: {
    jwtToken: ""
  },
  reducers: {
    setToken: (state, action) => {
      state.jwtToken = action.payload;
    //   return action.payload;
    },
    removeToken: state => {
      state.jwtToken = null;
    }
  }
});

export const { setToken, removeToken } = jwtTokenSlice.actions;
export const selectToken = state => state.jwtToken;
export default jwtTokenSlice.reducer;