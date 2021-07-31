
const initState = {
    authenticated: false,
    user: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGOUT":
            localStorage.removeItem("auth");
            return {
                ...state,
                authenticated: false
            }
        case "LOGIN":
            localStorage.setItem('auth', JSON.stringify(action.payload));
            return {
                ...state,
                authenticated: true,
                user: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;