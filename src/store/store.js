import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./homeDataSlice"
import cardReducer from "./cardSlice"
import editorReducer from "./editorSlice"

export const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
    card: cardReducer,
    editor: editorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
