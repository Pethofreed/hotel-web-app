import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rooms: {},
  error: null,
  isLoading: false,
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    startLoadingRooms: (state, action) => {
      state.isLoading = action.payload;
    },
    setRooms: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.rooms = action.payload;
    },
    setRoomsError: (state, action) => {
      state.error = action.payload;
    },
  },
})

export const {
  setRooms,
  setRoomsError,
  startLoadingRooms
} = roomSlice.actions
