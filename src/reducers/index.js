import { combineReducers } from 'redux';
import projectsReducer from './projectReducer';

const rootReducer = combineReducers({
    projects: projectsReducer,
});

export default rootReducer;
