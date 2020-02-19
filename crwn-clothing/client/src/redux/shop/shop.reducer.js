import shopActionType from './shop.types.js';

const INITAL_STATE = {
    collections: null,
    isFetching: false,
    errorMsg: undefined
};

const shopReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case shopActionType.FETCH_COLLECTIONS_START:
            return {
                state,
                isFetching: true
            }
        case shopActionType.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case shopActionType.FETCH_COLLECTIONS_ERROR:
            return {
                ...state,
                ifFetching: false,
                errorMsg: action.payload
            }   
        default:
            return state;
    }
};

export default shopReducer;
