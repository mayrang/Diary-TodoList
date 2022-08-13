import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import diary from './diary';
import todo from './todo';

const rootReducer = (state, action) => {
    switch(action.type){
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                diary,
                todo,
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;