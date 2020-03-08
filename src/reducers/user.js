const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'ADD':
            return {...state, ...action.payload};
        case 'TRUNCATE':
            return {};
        default:
            return state;
    }
}

export default userReducer;