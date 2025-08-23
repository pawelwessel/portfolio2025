import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  action: "",
};

export const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.action = action.payload;
    },
  },
});

export const { setModalVisible } = actionSlice.actions;

export default actionSlice.reducer;
