import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./homeDataSlice"
import cardReducer from "./cardSlice"
import editorReducer from "./editorSlice"
import modalReducer from "./modalSlice"
import alertReducer from "./alertSlice"

export const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
    card: cardReducer,
    editor: editorReducer,
    modal: modalReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
