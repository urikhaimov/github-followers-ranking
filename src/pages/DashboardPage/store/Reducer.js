import { initialState } from "./initialState";

export function reducer(state, action) {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_FOLLOWERS':
            return { ...state, followers: action.payload };
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'CLEAR':
            return { ...initialState, users: state.users };
        case 'SET_LOADING':
           
            return { ...state, isLoading: true };
        case 'SET_LOADED':
            return { ...state, isLoading: false };

        default:
            return state;
    }
}

