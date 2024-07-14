import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  login: false,
  manipulate: false,
  delete: "",
  environmentId: false,
  changeIcon: { title: "", Icon: "" },
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
    toggleChangeIcon: (state, payload) => {
      if (state.changeIcon.title !== "") {
        state.changeIcon = initialState.changeIcon
      } else {
        state.changeIcon = payload.payload
      }
    },
    toggleEnvironmentId: (state) => {
      state.environmentId = !state.environmentId
    },
  },
})

export const {
  toggleLogin,
  toggleManipulate,
  toggleDelete,
  toggleEnvironmentId,
  toggleChangeIcon,
} = modalSlice.actions

export default modalSlice.reducer
