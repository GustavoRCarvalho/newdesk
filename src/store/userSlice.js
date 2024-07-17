import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {},
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialUser: (state) => {
      state.user = {}
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { initialUser, setUser } = userSlice.actions

export default userSlice.reducer
