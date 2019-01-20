import * as config from '../config';

let savedata = (data, success = null, failure = null) => 
{
    let fd = new FormData();
    for(let key of Object.keys(data)){
        fd.append(key, data[key])
    }
    fd.append("_method", "PUT");
    fetch(`${config.BASE_URL}/users/${localStorage.getItem("id")}/company`, {
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

let upload = (dispatch, body) => {
    dispatch({type: "EMPLOYER_LOADING", data: { pictureloading: true } });
    fetch(config.BASE_URL+"/image/upload?access_token=" + localStorage.getItem("access_token"), {
        method: "POST",
        body
    }).then(res => res.json()).then(d => {
        if(d.uploaded){
            savedata({
                image: d.url
            }, data => {
                dispatch({ type: "TOAST_SUCCESS", message: "Your photo has been updated."});
                dispatch({ type: "EMPLOYER_LOADING", data: { pictureloading: false, image: data.data.image }});
            }, error => {
                error_message(dispatch);
            })
        }else{
            error_message(dispatch);
        }
    }).catch(e => { error_message(dispatch) });
}

let error_message = (dispatch) => {
    dispatch({ type: "EMPLOYER_LOADING", data: { pictureloading: false }});
    dispatch({ type: "TOAST_ERROR", message: "Photo can't be changed."});
}

let editcontactdetails = (dispatch, detail) => {
    dispatch({ type: "EMPLOYER_LOADING", data: { contactloading: true }});
    savedata(detail, data => {
        dispatch({ type: "EMPLOYER_LOADING", data: { contactloading: false, ...data.data }});
        dispatch({ type: "TOAST_SUCCESS", message: "Contact Details saved." });
    }, error => {
        dispatch({ type: "EMPLOYER_LOADING", data: { contactloading: false }});
        dispatch({ type: "TOAST_ERROR", message: "Contact Details can't be saved."});
    });

}

let editcompanydetails = (dispatch, detail) => {
    dispatch({ type: "EMPLOYER_LOADING", data: { companyloading: true }});
    savedata(detail, data => {
        dispatch({ type: "EMPLOYER_LOADING", data: { companyloading: false, ...data.data }});
        dispatch({ type: "TOAST_SUCCESS", message: "Company Details saved." });
    }, error => {
        dispatch({ type: "EMPLOYER_LOADING", data: { companyloading: false }});
        dispatch({ type: "TOAST_ERROR", message: "Company Details can't be saved."});
    });
}

let editspecialfeatures = (dispatch, detail) => {
    dispatch({ type: "EMPLOYER_LOADING", data: { specialloading: true }});
    savedata(detail, data => {
        dispatch({ type: "EMPLOYER_LOADING", data: { specialloading: false, ...data.data }});
        dispatch({ type: "TOAST_SUCCESS", message: "Special Features saved." });
    }, error => {
        dispatch({ type: "EMPLOYER_LOADING", data: { specialloading: false }});
        dispatch({ type: "TOAST_ERROR", message: "Special Features cant be saved."});
    });
}

let applicantinstructions = (dispatch, detail) => {
    dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: true }});
    savedata(detail, data => {
        dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false, ...data.data }});
        dispatch({ type: "TOAST_SUCCESS", message: "Applicant Instructions saved." });
    }, error => {
        dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false }});
        dispatch({ type: "TOAST_ERROR", message: "Applicant Instructions could not be saved."});
    });
}

let companydescription = (dispatch, detail) => {
    dispatch({ type: "EMPLOYER_LOADING", data: { descriptionloading: true }});
    savedata(detail, data => {
        dispatch({ type: "EMPLOYER_LOADING", data: { descriptionloading: false, ...data.data }});
        dispatch({ type: "TOAST_SUCCESS", message: "Company Description saved." });
    }, error => {
        dispatch({ type: "EMPLOYER_LOADING", data: { descriptionloading: false }});
        dispatch({ type: "TOAST_ERROR", message: "Applicant Instructions could not be saved."});
    });
}

let getemployerdata = (dispatch) => {
    console.log("data get");
    let loading = { applicantloading:true, specialloading: true, companyloading: true, contactloading: true, descriptionloading: true } 
    dispatch({type: "EMPLOYER_LOADING", data:loading});
    fetch(`${config.BASE_URL}/users/${localStorage.getItem("id")}/company`, {
        method: "GET",
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
        } 
    }).then(d => d.json()).then(data => {
        for(let k of Object.keys(loading)){
            loading[k] = false;
        }
        dispatch({type: "EMPLOYER_LOADING", data: { ...loading, ...data.data, got_data: true } });
    });
}

let getapplicants = (dispatch, jobid) => {
    dispatch({type: "EMPLOYER_LOADING", data: { applicantloading: true, success: false } });
    fetch(`${config.BASE_URL}/job/${jobid}/cv`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {
        if(data.data){
            dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false, success: true, applicants: data.data } });
        }else if(data.error){
            dispatch({ type: "TOAST_ERROR", message: "Job applicants can't be loaded."});
            dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false, success: false } });
        }
    }).catch(e => {
        dispatch({ type: "TOAST_ERROR", message: "Job applicants can't be loaded."});
        dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false, success: false } });
    })
}

let deleteapplicants = (dispatch, applicantid) => {
    dispatch({type: "EMPLOYER_LOADING", data: { applicantloading: true, success: false } });
    let fd = new FormData();
    fd.append("_method", "DELETE");
    fetch(`${config.BASE_URL}/jobapplied/${applicantid}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: fd
    }).then(d => d.json()).then(data => {
        if(data.data){
            dispatch({ type: "TOAST_SUCCESS", message: "Applicant deleted."});
            dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false, success: true, applicants: data.data ? data.data : [] } });
        }else if(data.error){
            dispatch({ type: "TOAST_ERROR", message: "Job applicants can't be deleted."});
            dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false, success: false } });
        }
    }).catch(e => {
        dispatch({ type: "TOAST_ERROR", message: "Job applicants can't be deleted."});
        dispatch({ type: "EMPLOYER_LOADING", data: { applicantloading: false, success: false } });
    })   
}

let getdashboard = (dispatch, id) => {
    dispatch({type: "DASHBOARD_LOADING", loading: true });
    fetch(`${config.BASE_URL}/dashboard/company/${id}`, {
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


const get_rating = (dispatch, company_id) => {
    dispatch({ type: "EMPLOYER_LOADING", data: {rateloading: true} });

    fetch(`${config.BASE_URL}/company/rating/${company_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {
        if(data.success){
            dispatch({ type: "COMPANY_RATING", data: data});
        }else{
            // dispatch({ type: "TOAST_ERROR", message: "Could not get rating." });
        }
        dispatch({ type: "EMPLOYER_LOADING", data: { rateloading: false } });
    }).catch(err => {
        dispatch({ type: "EMPLOYER_LOADING", data: { rateloading: false } });
        // dispatch({ type: "TOAST_ERROR", message: "Could not get rating." });
    })
}

const get_reviews = (dispatch, company_id, emp_id) => {
    dispatch({ type: "EMPLOYER_LOADING", data: {rateloading: true} });

    fetch(`${config.BASE_URL}/company/reviews/${company_id}/not/${emp_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {
        if(data.data){
            dispatch({ type: "COMPANY_REVIEWS", data: data });
        }else{
            // dispatch({ type: "TOAST_ERROR", message: "Could not get reviews." });
        }
        dispatch({ type: "EMPLOYER_LOADING", data: { rateloading: false } });
    }).catch(err => {
        dispatch({ type: "EMPLOYER_LOADING", data: { rateloading: false } });
        // dispatch({ type: "TOAST_ERROR", message: "Could not get reviews." });
    })
}

const get_individual_reviews = (dispatch, company_id, emp_id) => {
    dispatch({ type: "EMPLOYER_CLEAR_INDIVIDUAL" });
    dispatch({ type: "EMPLOYER_LOADING", data: {rate_individual_loading: true}})
    fetch(`${config.BASE_URL}/company/reviews/${company_id}/${emp_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {
        if(data.id){
            dispatch({ type: "COMPANY_REVIEWS_INDIVIDUAL", data: data});
        }
        dispatch({type: "EMPLOYER_LOADING", data: { rate_individual_loading: false }});
    }).catch(e => {
        dispatch({ type: "EMPLOYER_LOADING", data: { rate_individual_loading: false }});
    });
}

const seemore = (dispatch, next_page) => {
    dispatch({ type: "EMPLOYER_LOADING", data: { review_seemoreloading: true } });
    fetch(next_page, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then(d => d.json()).then(data => {
        if(data.data){
            dispatch({ type: "COMPANY_REVIEWS_MORE", data: data });
        }else{
            dispatch({ type: "TOAST_ERROR", message: "Couldnot get reviews"});
        }
        dispatch({ type: "EMPLOYER_LOADING", data: { review_seemoreloading: false } });
    }).catch(err => {
        dispatch({ type: "EMPLOYER_LOADING", data: { review_seemoreloading: false }});
        dispatch({ type: "TOAST_ERROR", message: "Could not get reviews." });
    });
}

export {
    seemore,
    get_individual_reviews,
    get_rating,
    get_reviews,
    editcontactdetails,
    editcompanydetails,
    editspecialfeatures,
    applicantinstructions,
    upload,
    getemployerdata,
    getapplicants,
    deleteapplicants,
    getdashboard,
    companydescription
}