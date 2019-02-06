const initialState = {
    user: {},
    isAuthenticated: false,
    isAdmin: false
}

const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
// const IS_ADMIN = 'IS_ADMIN'

export default function reducer(state = initialState, action){
    switch (action.type) {
        case USER_LOGGED_IN:
            return { ...state, isAuthenticated: true, user: action.payload}

        case USER_LOGGED_OUT:
            return { ...state, isAuthenticated: false, user: {}}

        default:
            return state;
    }
}

export function userLoggedIn(user){
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export function userLoggedOut(){
    return {
        type: USER_LOGGED_OUT
    }
}