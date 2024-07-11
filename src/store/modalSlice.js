import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  login: false,
  manipulate: false,
  delete: "",
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
    toggleDelete: (state, payload) => {
      if (state.delete !== "") {
        state.delete = ""
      } else {
        state.delete = payload.payload
      }
    },
  },
})

export const { toggleLogin, toggleManipulate, toggleDelete } =
  modalSlice.actions

export default modalSlice.reducer
