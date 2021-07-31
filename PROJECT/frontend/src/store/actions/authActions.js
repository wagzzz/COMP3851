export const login = (user) => {
    return dispatch => {
        dispatch({
            type: "LOGIN",
            payload: user
        });
    }
}

export const logout = (user) => {
    return dispatch => {
        dispatch({
            type: "LOGOUT"
        });
    }
}