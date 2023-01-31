import { createSlice } from '@reduxjs/toolkit';

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState: {
    adminUser: null,
  },
  reducers: {
    addAdminUser: (state, action) => {
        state.adminUser = action.payload
    },
    removeAdminUser: (state) => {
        state.adminUser = null
    },
  },
});

export const adminUserReducer = adminUserSlice.reducer;
export const {
    addAdminUser,
    removeAdminUser,
} = adminUserSlice.actions;