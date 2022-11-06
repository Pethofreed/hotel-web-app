const CHANGE_SECTION = 'CHANGE_SECTION'

const initialState = {
  section: 'habitaciones',
}

export function SectionReducer(state = initialState, action){
  switch(action.type) {
    case CHANGE_SECTION:
      return {
        ...state,
        section: action.payload,
      }
    default:
      return state
  }
}