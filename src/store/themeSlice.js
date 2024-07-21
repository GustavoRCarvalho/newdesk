import { createSlice } from "@reduxjs/toolkit"
import { changeDarkLightMode, changeTheme } from "../utils/functions"

const initialState = {
  darkTheme: false,
  colorTheme: "Blue",
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeColorTheme: (state, action) => {
      state.colorTheme = action.payload
      changeTheme(action.payload)
    },
    changeDarkTheme: (state, action) => {
      state.darkTheme = action.payload
      changeDarkLightMode(action.payload)
    },
  },
})

export const { changeColorTheme, changeDarkTheme } = themeSlice.actions

export default themeSlice.reducer
