import {toast} from 'react-toastify';

let toastReducer = (state = {}, action) => {
    let position = toast.POSITION.BOTTOM_RIGHT;
    switch(action.type){
        case "TOAST_SUCCESS":
            toast.success(action.message, { position });
            break;
        case "TOAST_ERROR":
            toast.error(action.message, {position});
            break;
        case "TOAST_WARN":
            toast.warn(action.message, { position });
            break;
        default:
            break;        
    }
    return {...state};
}

export default toastReducer;