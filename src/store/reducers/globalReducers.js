export const initialState = {
    token: null,
    dark: false,
    user: {}
}

export const globalReducer = (state, action) => {
    switch( action.type ) {
        case 'SIGN_IN':
            return {
                ...state,
                token: action.token,
                user: action.user
            };
        case 'SIGN_OUT':
            return {
                ...state,
                token: null,
                user: {}
            }
        case 'DARK_MODE':
            return {
                ...state,
                dark: true
            }
        case 'LIGHT_MODE':
            return {
                ...state,
                dark: false
            }
        case 'GOOGLE_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}