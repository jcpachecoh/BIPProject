import { combineReducers } from 'redux';
import { showBips } from './bips'

const rootReducer = combineReducers({
  bips: showBips
});

export default rootReducer;