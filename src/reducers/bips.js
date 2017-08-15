import { SHOW_BIPS } from '../actions'

const initialState = {
    list: []
}

export function showBips(state = initialState, action) {
    
    switch (action.type) {
        case SHOW_BIPS:
            return Object.assign({}, state, {list: action.payload})
        default:
            return state 
    }
    
}