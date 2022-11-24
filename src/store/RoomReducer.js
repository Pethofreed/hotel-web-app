import axios from "axios";

const ROOMS_SUCCESS = 'ROOMS_SUCCESS';
const ROOMS_ERROR = 'ROOMS_ERROR';


const initialState = {
  rooms: {},
  error: null,
}

export const getRooms = () => {
  return async function(dispatch){
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_MONARCA_HOST || 'http://localhost:8000',
        url: '/rooms/get',
      })
      dispatch({type: ROOMS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({type: ROOMS_ERROR, payload: error })
    }
  }
}

export function RoomReducer(state = initialState, action){
  switch(action.type) {
    case ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
      }
    case ROOMS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}