import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import authReducer from './reducers/auth_reducer'
import developersReducer from "./reducers/developers_reducer";
import notificationsReducer from "./reducers/notification_reducer";
import profileReducer from "./reducers/profile_reducer";
import projectReducer from './reducers/projects_reducer'
import achReducer from './reducers/ach_reducer'
import workingTimeReducer from './reducers/working_time_requcer'
import tasksReducer from "./reducers/tasks_reducer";

const reducers = combineReducers({
    auth: authReducer,
    projects: projectReducer,
    developers: developersReducer,
    notifications: notificationsReducer,
    profile: profileReducer,
    ach: achReducer,
    wt: workingTimeReducer,
    tasks: tasksReducer
})

// Выбирается функция compose в зависимости от наличия плагина Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export {store}