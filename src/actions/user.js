import * as config from '../config';

const signinfacebook = (data) => {
    
    return dispatch => {
        dispatch({ type: "PROGRESS_START"})
        
        fetch(config.BASE_URL+"/auth/facebook", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json'
            }
        }).then(d => d.json()).then(res => {
            dispatch({ type: "PROGRESS_FINISH" });
            if(res.error){
                dispatch({ type: "LOGIN_ERROR", data: { message: "Email or Password is incorrect.", email: " ", password: " " }  });
            }else if(res.success){
                dispatch(login({
                    email: data.email,
                    password: res.token
                }));
            }
        }).catch(err => {
            dispatch({ type: "PROGRESS_FINISH" });
            console.log(err);
        })
    }
}

let login = (data) => {

    return dispatch => {

            console.log(data);

            let post_data = {
                
                'grant_type' : 'password',
                'username' : data.email,
                'password' : data.password,
                'client_id': config.CLIENT_ID,
                'client_secret' : config.CLIENT_SECRET

            }

            dispatch({ type: "PROGRESS_START"});

            fetch(config.BASE_URL+"/oauth/token", {
                method: 'POST',
                headers: { 'Authorization': 'Bearer '+ data.access_token,
                            'Content-Type': 'application/json' },
                body: JSON.stringify(post_data) 

            }).then(res => res.json() )

            .then(res => {

                console.log(res)
                dispatch({ type: "PROGRESS_FINISH" });
                if(res.error){

                    dispatch({ type: "LOGIN_ERROR", data: { message: "Email or Password is incorrect.", email: " ", password: " " }  });
                }else{
                    localStorage.setItem('access_token',res.access_token);
                    fetch(`${config.BASE_URL}/users/get/${data.email}`)
                        .then(res=>res.json())
                        .then(ress=>{

                            if(ress.data){
                                if(ress.data.type !== 'admin'){
                                    dispatch({type:'USER_LOGIN_DETAIL',data:ress.data})
                                    localStorage.setItem('id', ress.data.id)
                                    localStorage.setItem('type', ress.data.type);
                                    ress.data.provider && localStorage.setItem('provider', ress.data.provider);
                                    dispatch(getUserDetails(ress.data.id));
                                    dispatch({type: "LOGIN_SUCCESS", logged_in: true });
                                }else{
                                    dispatch({ type: "LOGIN_ERROR", data: { message: "Email or Password is incorrect.", email: " ", password: " " }  });
                                }
                            }
                        })
                        .catch(err=>console.log(err))
                }

            })
            .catch(err => {
                dispatch({ type: "PROGRESS_FINISH" });
                console.log(err);
            })    

            }   
};

let authenticate_client = () => {
    
    return dispatch =>{

            let post_data = {

                'grant_type' : 'client_credentials',
                'client_id': config.CLIENT_ID,
                'client_secret' : config.CLIENT_SECRET
            }
    
            fetch(config.BASE_URL+"/oauth/token", {
                method: "POST",
                body:JSON.stringify(post_data) ,
                headers: { 'Content-Type': 'application/json' }
            }).then(d => d.json())
            .then(res => {
              
                if(!res.error){
                    console.log(res)
                    localStorage.setItem('access_token',res.access_token);
                }
            })
            .catch(err => {
                console.error(err);
            })   
            }
}

const getUserDetails= id => {

    return dispatch => {
            
            dispatch({type: "LOGIN_SUCCESS", logged_in: true })

            fetch(`${config.BASE_URL}/users/${id}`)
                .then(res=>res.json())
                .then(ress=> {
                    if(ress.data && ress.data.employee){
                        localStorage.setItem("employee_id", ress.data.employee.id)
                    }
                    if(ress.data && ress.data.company){
                        localStorage.setItem("employer_id", ress.data.company.id)
                    }
                    dispatch({type:'USER_LOGIN_DETAIL', data: ress.data })
                });                    
    }
}

let make_data = (data) => ({client_id: config.CLIENT_ID, client_secret: config.CLIENT_SECRET, ...data });

let register = (dispatch, data) => {

    let post_data = make_data(data);
    post_data.grant_type = "client_credentials";

    fetch(config.BASE_URL+"/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post_data)
    }).then(res => res.json()).then(response => {
        dispatch({type: "REGISTER_USER", data});
        if(response.error){
            dispatch({ type: "AUTH_VALIDATION_ERROR", error: response.error });
            dispatch({ type: "PROGRESS_FINISH" });
        }else{
            dispatch({type: "REGISTER_SUCCESS", data: response.data});
            dispatch({ type: "PROGRESS_FINISH" });
        }
    })
    .catch(err => {
        dispatch({ type: "PROGRESS_FINISH" });
        console.error(err);
    });
    dispatch({type: "PROGRESS_START"});
}

let resendmail = (dispatch, data) => {
    dispatch({ type: "MAIL_START" });
    fetch(config.BASE_URL+"/users/"+data+"/resend", {
        method: "GET"
    }).then(res=>res.json())
    .then(resp => {
        dispatch({ type: "MAIL_FINISH" });
    })
    .catch(err => {
        dispatch({ type: "MAIL_FINISH" });
        console.error(err);
    })
}

const logout= ()=>{

    return {
        type:'LOGOUT'
    }
} 

const change_user = (dispatch, data) => {
    const fd = new FormData();
    fd.append("_method", "PUT");

    for(let k of Object.keys(data)){
        fd.append(k, data[k]);
    }
    
    dispatch({ type: "USER_LOADING", loading: true});
    fetch(`${config.BASE_URL}/users/${localStorage.getItem("id")}`, {
        method: "POST",
        body: fd,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {
        dispatch({ type: "USER_LOADING", loading: false});
        if(data.error){
            dispatch({ type: "TOAST_ERROR", message: "Could not change user settings."});
        }else if(data.msg){
            dispatch({ type: "TOAST_ERROR", message: data.msg});
        }else{
            dispatch({ type: "TOAST_SUCCESS", message: "User settings changed."});
            dispatch(getUserDetails(localStorage.getItem("id")));
        }
    }).catch(e => {
        dispatch({ type: "USER_LOADING", loading: false });
    })
}


const delete_user = (dispatch,data,history) => {


    const fd = new FormData();
    fd.append("_method", "DELETE");

    for(let k of Object.keys(data)){
        fd.append(k, data[k]);
    }

     dispatch({ type: "USER_LOADING", loading: true});

     fetch(`${config.BASE_URL}/users/${localStorage.getItem("id")}`, {
        method: "POST",
        body: fd,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {
        dispatch({ type: "USER_LOADING", loading: false});
        if(data.error){
            dispatch({ type: "TOAST_ERROR", message: "Could not change user settings."});

        }else if(data.msg){
            dispatch({ type: "TOAST_ERROR", message: data.msg});
        }else{
            dispatch({ type: "TOAST_SUCCESS", message: "User deleted."});
            dispatch(logout())

            history.push('/')
            localStorage.clear();
            dispatch({type:'LOGOUT'});
        }
    }).catch(e => {
        dispatch({ type: "USER_LOADING", loading: false });
        

    })
    

}


export {
    login,
    logout,
    authenticate_client,
    getUserDetails,
    register,
    resendmail,
    change_user,
    delete_user,
    signinfacebook
};