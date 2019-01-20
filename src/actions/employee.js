import * as config from '../config';

let savedata = (data, success = null, failure = null) => 
{
    let fd = new FormData();
    for(let key of Object.keys(data)){
        fd.append(key, data[key])
    }
    fd.append("_method", "PUT");
    fetch(`${config.BASE_URL}/users/${localStorage.getItem("id")}/employee`, {
        method: "POST",
        body: fd,
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(res => res.json()).then(data => {
        if(data.data && (success !== null) ){
            success(data);
        }else if(failure !== null){
            failure();
        }
    }).catch(err => { failure(err) });
}

let getfollowedCompany = (dispatch)=>{

     fetch(`${config.BASE_URL}/${localStorage.getItem("id")}/companyfollowing`)
        .then(d=>d.json())
        .then(data=>{
            dispatch({type:"GET_COMPANY_FOLLOWED_NAME",data})
        })
    }

let getfollowedCategory = (dispatch)=>{

     fetch(`${config.BASE_URL}/${localStorage.getItem("id")}/categoryfollowing`)
        .then(d=>d.json())
        .then(data=>{
            dispatch({type:"GET_CATEGORY_FOLLOWED_NAME",data})
        })
    }

let getfollowedIndustry = (dispatch)=>{

     fetch(`${config.BASE_URL}/${localStorage.getItem("id")}/industryfollowing`)
        .then(d=>d.json())
        .then(data=>{
            dispatch({type:"GET_INDUSTRY_FOLLOWED_NAME",data})
        })
    }

let error_message = (dispatch) => {
    dispatch({ type: "EMPLOYEE_LOADING", data: { pictureloading: false }});
    dispatch({ type: "TOAST_ERROR", message: "Photo can't be changed."});
}


let upload = (dispatch, body) => {
    dispatch({type: "EMPLOYEE_LOADING", data: { pictureloading: true, uploaded: false } });
    fetch(config.BASE_URL+"/image/upload?access_token=" + localStorage.getItem("access_token"), {
        method: "POST",
        body
    }).then(res => res.json()).then(d => {
        if(d.uploaded){
            savedata({
                photo: d.url
            }, data => {
                dispatch({ type: "TOAST_SUCCESS", message: "Your photo has been updated."});
                dispatch({ type: "EMPLOYEE_LOADING", data: { pictureloading: false, uploaded: true, photo: data.data.photo }});
            }, error => {
                error_message(dispatch);
            })
        }else{
            error_message(dispatch);
        }
    }).catch(e => { error_message(dispatch) });
}

let send = (dispatch, detail) => {
    dispatch({ type: "EMPLOYEE_LOADING", data: { personalloading: true }});
    savedata(detail, data => {
        dispatch({ type: "EMPLOYEE_LOADING", data: { personalloading: false, ...data.data }});
        dispatch({ type: "TOAST_SUCCESS", message: "Personal Details saved." });
    }, error => {
        dispatch({ type: "EMPLOYER_LOADING", data: { personalloading: false }});
        dispatch({ type: "TOAST_ERROR", message: "Personal Details can't be saved."});
    });
}

let getdata = (dispatch) => {
    let loading = { personalloading: true, pictureloading: true, otherloading: true} 
    dispatch({type: "EMPLOYEE_LOADING", data:loading});
    fetch(`${config.BASE_URL}/users/${localStorage.getItem("id")}/employee`, {
        method: "GET",
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
        } 
    }).then(d => d.json()).then(data => {
        for(let k of Object.keys(loading)){
            loading[k] = false;
        }
        console.log(data);
        dispatch({type: "EMPLOYEE_LOADING", data: { ...loading, ...data.data, got_data: true } });
    });
}


let getdashboard = (dispatch, id) => {
    dispatch({type: "DASHBOARD_LOADING", loading: true });
    fetch(`${config.BASE_URL}/dashboard/employee/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {

        dispatch({type: "DASHBOARD_LOADING", loading: false});
        if(data.error){
            dispatch({type: "TOAST_ERROR", message: "Could not load your dashboard."});
        }else{
            dispatch({type: "DASHBOARD_DATA", data});
        }
    }).catch(e => {
        dispatch({type: "DASHBOARD_LOADING", loading: false});
        dispatch({type: "TOAST_ERROR", message: "Could not load your dashboard."});
    });
}

// create cv
let createcv = (dispatch, data, history) => {
    dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: true, success: false } });
    fetch(`${config.BASE_URL}/${localStorage.getItem("employee_id")}/cv`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(data)
    }).then(a => a.json())
    .then(res => {
        if(res.error){
            dispatch({type: "TOAST_ERROR", message: "Could not create CV."});
            dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: false, error: res.error }} )
        }else if(res.data){
            history.push(`/dashboard/cvmaker/edit/${res.data.id}`);
            dispatch({type: "TOAST_SUCCESS", message: "CV Created."});
            dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: false, success: true}} );
        }
    }).catch(e => {
        dispatch({type: "TOAST_ERROR", message: "Could not create CV"});
        dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false }} );
    })
}

let getcv = (dispatch) => {
    dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: true } });
    fetch(`${config.BASE_URL}/${localStorage.getItem("employee_id")}/cv`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(a => a.json())
    .then(res => {
        if(res.error){
            dispatch({type: "TOAST_ERROR", message: "Could not load CV."});
            dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false, error: res.error }} )
        }else if(res.data){
            dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: false, cvs: res.data }} );
        }
    }).catch(e => {
        dispatch({type: "TOAST_ERROR", message: "Could not load CV"});
        dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false }} );
    })   
}

// let printcv = (dispatch, html) => {
//     dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: true }})
//     let fd = new FormData();
//     fd.append("html", html);
//     fetch(`${config.BASE_URL}/print`, {
//         method: "pOST",
//         body: fd,
//         'Authorization': `Bearer ${ localStorage.getItem("access_token") }`
//     })
//     .then( r => r.blob() )
//     .then(data => {
//         dispatch({ type: "EMPLOYEE_LOADING", data: {cvloading: false }})
//         showFile(data)
//     })
// }

let printcv = (dispatch, html) => {
    dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: true }})
    
    let post_data = {
                
                'employee' : html.employee,
                'data' : html.data,
                'user' : html.user
               
            }

    let fd = new FormData();
    fd.append("html", html);
    fetch(`${config.BASE_URL}/print`, {
        method: "pOST",
         headers: { 'Authorization': `Bearer ${ localStorage.getItem("access_token") }`,
                            'Content-Type': 'application/json' },
        body: JSON.stringify(post_data) 
    
    })
    .then( r => r.blob() )
    .then(data => {
        dispatch({ type: "EMPLOYEE_LOADING", data: {cvloading: false }})
        showFile(data)
    })
}

/*
Source: JayWay.com 
    https://blog.jayway.com/2017/07/13/open-pdf-downloaded-api-javascript/
*/
let showFile = (blob) => {

  var newBlob = blob

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  } 

  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  document.body.append(link);
  link.href = data;
  link.download = "file.pdf";
  link.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(data)
  }, 100)

}


let getcvid = (dispatch, id) => {
    
    dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: true, cv:{
                objective: "",
                awards: [],
                reference: [],
                skill: [],
                experience: [],
                education: []
            } 
        } 
    });
    fetch(`${config.BASE_URL}/cv/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(a => a.json())
    .then(res => {
        if(res.error){
            dispatch({type: "TOAST_ERROR", message: "Could not load CV."});
            dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false, error: res.error }} )
        }else if(res.data){
            dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false, cv: res.data }} );
        }
    }).catch(e => {
        dispatch({type: "TOAST_ERROR", message: "Could not load CV"});
        dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false }} );
    })   

}

let postcv = (dispatch, data, id) => {
    
    let fd = new FormData();
    for(let key of Object.keys(data)){
        let c = data[key];
        if(typeof c === "object"){
            c = JSON.stringify(c);
        }
        fd.append(key, c);
    }
    fd.append("_method", "PUT");
    dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: true, success: false } });
    fetch(`${config.BASE_URL}/cv/${id}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: fd
    }).then(a => a.json())
    .then(res => {
        if(res.error){
            dispatch({type: "TOAST_ERROR", message: "Could not update CV."});
            dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: false, error: res.error }} )
        }else if(res.data){
            dispatch({type: "TOAST_SUCCESS", message: "CV Updated."});
            dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: false, success: true, cv: res.data }} );
        }
    }).catch(e => {
        dispatch({type: "TOAST_ERROR", message: "Could not update CV"});
        dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false }} );
    })
} 

let deletecv = (dispatch, id) => {

    dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: true} });
    let fd = new FormData();
    fd.append("_method", "DELETE");
    fetch(`${config.BASE_URL}/cv/${id}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: fd
    }).then(a => a.json())
    .then(res => {
        if(res.error){
            dispatch({type: "TOAST_ERROR", message: "Could not delete CV."});
            dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false, error: res.error }} )
        }else if(res.data){
            dispatch({type: "TOAST_SUCCESS", message: "CV Deleted."});
            dispatch({type: "EMPLOYEE_LOADING", data: {cvloading: false, cvs: res.data }} );
        }
    }).catch(e => {
        dispatch({type: "TOAST_ERROR", message: "Could not delete CV"});
        dispatch({type: "EMPLOYEE_LOADING", data: { cvloading: false }} );
    })
}

let getAppliedJobs = (dispatch) => {
    dispatch({type: "EMPLOYEE_LOADING", data: {appliedloading: true} })

    fetch(`${config.BASE_URL}/employee/${localStorage.getItem("employee_id")}/cv`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json())
    .then(data => {
        if(data.data){
            dispatch({type: "EMPLOYEE_LOADING", data: {appliedloading: false, applied_jobs: data.data }});
        }else if(data.error){
            dispatch({ type: "TOAST_ERROR", message: "Could not load applied jobs."});
            dispatch({ type: "EMPLOYEE_LOADING", data: {appliedloading: false }});
        }
    }).catch(e => {
        dispatch({ type: "TOAST_ERROR", message: "Could not load applied jobs."});
        dispatch({ type: "EMPLOYEE_LOADING", data: {appliedloading: false }});
    })
}

const rate = (dispatch, data) => {
    dispatch({ type: "EMPLOYEE_LOADING", data: { rateloading: true} });

    fetch(`${config.BASE_URL}/company/rate`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'content-type': "application/json"
        }
    }).then(d => d.json()).then(d => {
        if(d.id){
            if(data.rating){
                dispatch({ type: "TOAST_SUCCESS", message: `Review and Rating Successfull.`});
            }
            const employer = require('./employer.js')
            employer.get_reviews(dispatch, d.company_id, d.employee_id);
            employer.get_rating(dispatch, d.company_id);
            localStorage.getItem("employee_id") && employer.get_individual_reviews(dispatch, d.company_id, d.employee_id);
        } else {
            dispatch({ type: "TOAST_ERROR", message: "Could not rate." });
        }
        dispatch({ type: "EMPLOYEE_LOADING", data: { rateloading: false } });
    }).catch(err => {
        dispatch({ type: "EMPLOYEE_LOADING", data: { rateloading: false } });
        dispatch({ type: "TOAST_ERROR", message: "Could not rate." });
    })
}

export {
    rate,
    printcv,
    upload,
    send,
    getdata,
    createcv,
    getcv,
    deletecv,
    getcvid,
    postcv,
    getAppliedJobs,
    getdashboard,
    getfollowedCompany,
    getfollowedIndustry,
    getfollowedCategory
}