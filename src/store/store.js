import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./homeDataSlice"
import cardReducer from "./cardSlice"
import editorReducer from "./editorSlice"
import modalReducer from "./modalSlice"

export const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
    card: cardReducer,
    editor: editorReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
