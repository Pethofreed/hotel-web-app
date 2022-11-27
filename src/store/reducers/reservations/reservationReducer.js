import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null,
  reservations: {},
  startLoadingReservations: false,
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    startLoadingReservations: (state) => {
     state.startLoadingReservations = true;
    },
    setReservations: (state, action) => {
      state.error = null;
      state.reservations = action.payload;
      state.startLoadingReservations = false;
    },
    setReservationsError: (state, action) => {
      state.error = action.payload;
    },
  },
})

export const {
  setReservations,
  setReservationsError,
  startLoadingReservations
} = reservationSlice.actions
