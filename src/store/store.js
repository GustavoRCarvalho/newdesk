import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./homeDataSlice"
import cardReducer from "./cardSlice"
import editorReducer from "./editorSlice"
import modalReducer from "./modalSlice"
import alertReducer from "./alertSlice"
import userReducer from "./userSlice"
import themeReducer from "./themeSlice"

export const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
    card: cardReducer,
    editor: editorReducer,
    modal: modalReducer,
    alert: alertReducer,
    user: userReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
