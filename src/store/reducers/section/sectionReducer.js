import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  section: 'habitaciones',
}

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    changeSection: (state, action) => {
      state.section = action.payload;
    },
  },
})

export const { changeSection } = sectionSlice.actions
