import axios from "axios";

const CONTRACT_SUCCESS = 'CONTRACT_SUCCESS';
const CONTRACT_ERROR = 'CONTRACT_ERROR';


const initialState = {
  contracts: {},
  error: null,
}

export const getContracts = () => {
  return async function(dispatch){
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER || 'http://localhost:8000',
        url: '/contracts/get',
      })
      dispatch({type: CONTRACT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({type: CONTRACT_ERROR, payload: error })
    }
  }
}

export function RoomReducer(state = initialState, action){
  switch(action.type) {
    case CONTRACT_SUCCESS:
      return {
        ...state,
        contracts: action.payload,
      }
    case CONTRACT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}