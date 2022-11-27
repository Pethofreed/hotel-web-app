import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null,
  contracts: [],
  allContracts: [],
  startLoadingContracts: false,
}

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    startLoadingContracts: (state) => {
      state.startLoadingContracts = true;
    },
    setContracts: (state, action) => {
      state.error = null;
      state.contracts = action.payload;
      state.startLoadingContracts = false;
    },
    setAllContracts: (state, action) => {
      state.error = null;
      state.allContracts = action.payload;
      state.startLoadingContracts = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
})

export const {
  setError,
  setContracts,
  setAllContracts,
  startLoadingContracts,
} = contractSlice.actions
