import { configureStore } from'@reduxjs/toolkit';
import { roomSlice } from './reducers/rooms';
import { sectionSlice } from './reducers/section';
import { contractSlice } from './reducers/contract';
import { reservationSlice } from './reducers/reservations';


export const store = configureStore({
  reducer: {
    rooms: roomSlice.reducer,
    section: sectionSlice.reducer,
    contract: contractSlice.reducer,
    reservations: reservationSlice.reducer,
  },
});