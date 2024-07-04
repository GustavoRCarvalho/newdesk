import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./homeDataSlice"
import cardReducer from "./cardSlice"

export const store = configureStore({
  reducer: { homeData: homeDataReducer, card: cardReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
