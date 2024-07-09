import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  login: false,
  manipulate: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.login = !state.login
    },
    toggleManipulate: (state) => {
      state.manipulate = !state.manipulate
    },
  },
})

export const { toggleLogin, toggleManipulate } = modalSlice.actions

export default modalSlice.reducer
