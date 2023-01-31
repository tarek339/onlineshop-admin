import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
  },
  reducers: {
    addProduct: (state, action) => {
        state.product = action.payload
    },
    removeProduct: (state) => {
        state.product = null
    },
  },
});

export const productReducer = productSlice.reducer;
export const {
    addProduct,
    removeProduct,
    editProduct
} = productSlice.actions;