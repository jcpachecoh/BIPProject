
import axios from 'axios'

export const SHOW_BIPS = 'SHOW_BIPS'

export function showBips() {
    
    return (dispatch, getState) => {
        axios.get('http://jsonplaceholder.typicode.com/users')
            .then((response) => {
                dispatch( { type: SHOW_BIPS, payload: response.data } ) 
            }) 
    }
    
} 