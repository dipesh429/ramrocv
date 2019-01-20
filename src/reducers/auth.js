let initialState = {
    error: {},
    user:{
        id:-1,
        company: {}
    },
    oauth: {},
    logged_in:false
}

export default (state = initialState, action) => {
    
    switch(action.type){
        case "LOGIN_ERROR":
            return { ...state, error: action.data }
        case "CLIENT_AUTH":
            return {...state, oauth1: action.data }
        case "LOGIN_SUCCESS":
            return {...state, oauth: { ...action.data }, logged_in: action.logged_in }
        case "REGISTER_USER":
            return { ...state, user: { id: -1, ...action.data }  }
        case "USER_LOGIN_DETAIL":
            return {...state, user: action.data || {} }
        case "AUTH_VALIDATION_ERROR":
            return { ...state, error: action.error }
        case "LOGOUT":
            return { ...state, user: {}, logged_in: false }
        case "REGISTER_SUCCESS":
            return {...state, user: action.data || {}, error: {} }
        case "CLEAR_ERROR":
            return {...state, error: {}}
        default:
            return {...state}
    }
}
 
