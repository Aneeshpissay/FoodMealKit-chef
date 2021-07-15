export const initialState = {
    token: null,
    dark: false,
}

export const globalReducer = (state, action) => {
    switch( action.type ) {
        case 'SIGN_IN':
            return {
                ...state,
                token: action.token,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                token: null
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
        default:
            return state;
    }
}