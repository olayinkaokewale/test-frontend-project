import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user';

function saveToLocalStorage(state) {
    try {
        localStorage.setItem('state', JSON.stringify(state)); 
    } catch(err) {
        console.log("Save Error =>", err);
    }
}

function loadFromLocalStorage() {
    try {
        const storedData = localStorage.getItem('state');
        if (storedData === null) return undefined;
        return JSON.parse(storedData);
    } catch (err) {
        console.log("Get From Local Storage Error =>", err);
        return undefined;
    }
}

const savedState = loadFromLocalStorage();

const reducer = combineReducers({
    user: userReducer
});

const store = createStore(reducer, savedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;