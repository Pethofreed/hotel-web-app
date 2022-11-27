import { callApi } from '../../../api/callApi';
import { setRooms, startLoadingRooms } from "./roomReducer";

export const getRooms = () => {
  return async ( dispatch, getState ) => {
    dispatch(startLoadingRooms());
    const { data } = await callApi.get('/rooms/get',);
    dispatch(setRooms(data));
  };
};
