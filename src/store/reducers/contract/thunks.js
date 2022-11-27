import { callApi } from '../../../api/callApi';
import { startLoadingContracts, setContracts, setAllContracts } from "./contractReducer";

export const getContracts = () => {
  return async ( dispatch, getState ) => {
    dispatch(startLoadingContracts());
    const { data } = await callApi.get('/contracts/get');
    dispatch(setContracts(data));
  };
};

export const getAllContracts = () => {
  return async ( dispatch, getState ) => {
    dispatch(startLoadingContracts());
    const { data } = await callApi.get('/contracts/getAll');
    dispatch(setAllContracts(data));
  };
};
