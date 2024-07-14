import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  alerts: [],
}

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    createAlertSucess: (state, payload) => {
      if (
        payload.payload !== "" &&
        !state.alerts.map(({ message }) => message).includes(payload.payload)
      ) {
        state.alerts.push({ message: payload.payload, color: "#00a708" })
      }
    },
    createAlertError: (state, payload) => {
      if (
        payload.payload !== "" &&
        !state.alerts.map(({ message }) => message).includes(payload.payload)
      ) {
        state.alerts.push({ message: payload.payload, color: "#ff4747" })
      }
    },
    createAlertWarning: (state, payload) => {
      if (
        payload.payload !== "" &&
        !state.alerts.map(({ message }) => message).includes(payload.payload)
      ) {
        state.alerts.push({ message: payload.payload, color: "#d4b500" })
      }
    },
    removeAlert: (state, payload) => {
      const index = state.alerts
        .map(({ message }) => message)
        .indexOf(payload.payload)
      if (index === -1) return
      state.alerts.splice(index, 1)
    },
  },
})

export const {
  createAlertSucess,
  createAlertError,
  createAlertWarning,
  removeAlert,
} = alertSlice.actions

export default alertSlice.reducer
