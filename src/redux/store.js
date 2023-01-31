import { configureStore } from "@reduxjs/toolkit"
import { adminUserReducer } from "./adminUserSlice"
import { productReducer } from "./productSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    adminUser: adminUserReducer
  }
}
)