import { callApi } from '../../../api/callApi';
import { startLoadingReservations, setReservations } from "./reservationReducer";

export const getRooms = () => {
  return async ( dispatch, getState ) => {
    dispatch(startLoadingReservations());
    const { data } = await callApi.get('/reservations/get');
    dispatch(setReservations(data));
  };
};
