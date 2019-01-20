import * as config from '../config';

let create = data => {
	return dispatch => {
		dispatch({type: "JOB_LOADING", data: { loading: true, success: false } });
		fetch(`${config.BASE_URL}/jobad`,{
			method:'POST',
			headers: { 
				'Authorization': 'Bearer '+ localStorage.getItem("access_token"),
                'Content-Type': 'application/json' ,
            	'Accept': 'application/json'
            },
            body: JSON.stringify(data) 
		})
		.then(res=> res.json())
		.then(ress=> {
			if(ress.error){
				dispatch({type: "JOB_LOADING", data: { loading: false } });
                dispatch({ type: "JOB_ERROR", message: ress.error  });
           		dispatch({ type: "TOAST_ERROR", message: "Job could not be created."});	
            }else{
				dispatch({type: "JOB_LOADING", data: { loading: false, success: true } });
				dispatch({type:'JOB_ADDED',job:ress.data})
				dispatch({type: "TOAST_SUCCESS", message: "Job created"});
			}
		}).catch(err=>{
			dispatch({type: "JOB_LOADING", data: { loading: false } });
			dispatch({ type: "TOAST_ERROR", message: "Job could not be created."});
		});
	}
}

let update = data => {
	return dispatch => {

		let fd = new FormData();
		dispatch({type: "JOB_LOADING", data: { loading: true, success: false } });

		for (let key of Object.keys(data)){
				fd.append(key,data[key])
		}

		fd.append("_method",'PUT');

		fetch(`${config.BASE_URL}/jobad/${data.jobid}`,{

			method:'POST',
			headers: { 'Authorization': 'Bearer '+ localStorage.getItem("access_token") },
            body: fd

		})
		.then(res=> res.json())
		.then(ress=> {
			if(ress.error){
				dispatch({type: "JOB_LOADING", data: { loading: false } });
                dispatch({ type: "JOB_ERROR", message: ress.error  });
                dispatch({ type: "TOAST_ERROR", message: "Job could not be updated."});
            }else{
				console.log(ress)
				dispatch({type: "JOB_LOADING", data: { loading: false, success: true } });
				dispatch({type:'JOB_ADDED',job:ress.data})
				dispatch({type: "TOAST_SUCCESS", message: "Job updated."});
		}})
		.catch(err=>console.log(err))

	}
}

let deletejob = id => {
	return dispatch => {

		let fd = new FormData();
		dispatch({type: "JOB_LOADING", data: { loading: true } });

		fd.append("_method",'DELETE');

		fetch(`${config.BASE_URL}/jobad/${id}`,{

			method:'POST',
			headers: { 'Authorization': 'Bearer '+ localStorage.getItem("access_token") },
            body: fd

		})
		.then(res=> res.json())
		.then(ress=> {
			
			dispatch({ type: "JOB_LOADING", data: { loading: false } });
			dispatch({ type:'JOBS_RESPONSE', jobs: ress.data.a })
			dispatch({ type: 'TOAST_SUCCESS', message: "Job deleted successfully." });
		
		}).catch(err=>{

			dispatch({type: 'TOAST_ERROR', message: "Job couldnot be deleted"});
			dispatch({type: "JOB_LOADING", data: { loading: false } });

		});
	}
}

let  getPreviousJob = (jobid) =>{
	
	return dispatch=>{
		dispatch({type: "REMOVE_PREVIOUS_VALUE"});
		dispatch({type: "JOB_LOADING", data: { loading: true, success: false } });
		fetch(`${config.BASE_URL}/jobad/${jobid}`,{
			headers: { 'Authorization': 'Bearer '+ localStorage.getItem("access_token") },
		})
		.then(res=> res.json())
		.then(ress=> {
			dispatch({type: "JOB_LOADING", data: { loading: false } });
			dispatch({type:'JOB_PREVIOUS_VALUE',prevJob:ress.data})
		});
	}

}

let getCompanyJobs = (id, page=1) => {
	return dispatch=>{
		dispatch({type: "JOB_LOADING", data: { loading: true } });
        fetch(config.BASE_URL+"/company/"+id+'/jobs?per_page=8&page='+page,{
        	 headers: { 'Authorization': 'Bearer '+ localStorage.getItem("access_token") },
        }).then(res => res.json() )
		.then(ress => {
			if(ress.data){
				dispatch({type: "JOB_LOADING", data: { loading: false } });
			}
			if(ress.data.length !== 0){
				dispatch({ type:'JOBS_RESPONSE', jobs: ress })
			}
			if(ress.error){
				dispatch({ type: "TOAST_ERROR", message: "Couldnot load jobs."});
				dispatch({type: "JOB_LOADING", data: { loading: false } });
			}
		})
	}
}

let clearjob = () => dispatch => {
	dispatch({ type: "REMOVE_PREVIOUS_VALUE" });
}


let getCategory = (dispatch) => {
	// const category = require('../categories.json');
	// let data = {};
	// for(let ind of category){
	// 	data[ind] = 0;
	// }
	dispatch({ type: "PROGRESS_JOBSBY_CATEGORY", loading: true});
	fetch(`${config.BASE_URL}/jobad/category/count`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		dispatch({ type: "PROGRESS_JOBSBY_CATEGORY", loading: false});
		dispatch({ type: "GET_CATEGORY_JOB", data: data });
	}).catch(e => {
		dispatch({ type: "PROGRESS_JOBSBY_CATEGORY", loading: false});
	});
	// dispatch({ type: "GET_CATEGORY_JOB", data: data });
}

let getLocation = (dispatch) => {
	// const location = require('../location.json');
	// let data = {};
	// for(let loc of location){
	// 	data[loc] = 0;
	// }
	dispatch({ type: "PROGRESS_JOBSBY_LOCATION", loading: true});
	fetch(`${config.BASE_URL}/jobad/location/count`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		dispatch({ type: "PROGRESS_JOBSBY_LOCATION", loading: false});
		dispatch({ type: "GET_LOCATION_JOB", data: data });
	}).catch(e => { 
		console.log(e)
		dispatch({ type: "PROGRESS_JOBSBY_LOCATION", loading: false});
	});

	// dispatch({ type: "GET_LOCATION_JOB", data: data });
}

let getType = (dispatch) => {
	// const types = require('../types.json');
	// let data = {};
	// for(let loc of types){
	// 	data[loc] = 0;
	// }
	dispatch({ type: "PROGRESS_JOBSBY_TYPE", loading: true});
	fetch(`${config.BASE_URL}/jobad/type/count`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		dispatch({ type: "GET_TYPE_JOB", data: data });
		dispatch({ type: "PROGRESS_JOBSBY_TYPE", loading: false});
	}).catch(e => {
		dispatch({ type: "PROGRESS_JOBSBY_TYPE", loading: false});
	});

	// dispatch({ type: "GET_TYPE_JOB", data: data });
}

let jobapply = (dispatch, jobid, data = {}, companyid) => {

	let fd = new FormData();
	dispatch({ type: "JOB_LOADING", data: {loading: true, success: false }})

	if(Object.keys(data).length!=1){

		fetch(`${config.BASE_URL}/${localStorage.getItem("employee_id")}/${companyid}/${jobid}/apply`, {
		method: "POST",
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
			'Content-Type': 'application/json' 
		},

		body: JSON.stringify(data)
	})
			.then(d => d.json())
	.then(data => {
		if(data.data){
			dispatch({type: "TOAST_SUCCESS", message: "Congratulations! You have applied for the job."});
			dispatch({ type: "JOB_LOADING", data: { loading: false, success: true }});
		}else{
			dispatch({type: "TOAST_ERROR", message: "Sorry, Could not apply for the job." });
			dispatch({ type: "JOB_LOADING", data: {loading: false, success: false }})
		}
	}).catch(e => {
		dispatch({type: "TOAST_ERROR", message: "Sorry, Could not apply for the job." });
		dispatch({ type: "JOB_LOADING", data: {loading: false, success: false }})
	})
	}
	else{

		fd.append('cvv', data.cvv)

		fetch(`${config.BASE_URL}/${localStorage.getItem("employee_id")}/${companyid}/${jobid}/apply`, {
		method: "POST",
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
			
		},

		body: fd
	})
			.then(d => d.json())
	.then(data => {
		if(data.data){
			dispatch({type: "TOAST_SUCCESS", message: "Congratulations! You have applied for the job."});
			dispatch({ type: "JOB_LOADING", data: { loading: false, success: true }});
		}else{
			dispatch({type: "TOAST_ERROR", message: "Sorry, Could not apply for the job." });
			dispatch({ type: "JOB_LOADING", data: {loading: false, success: false }})
		}
	}).catch(e => {
		dispatch({type: "TOAST_ERROR", message: "Sorry, Could not apply for the job." });
		dispatch({ type: "JOB_LOADING", data: {loading: false, success: false }})
	})
	}


}

export {
    create,
    update,
    deletejob,
    getPreviousJob,
    getCompanyJobs,
    clearjob,
    jobapply,
    getCategory,
    getLocation,
    getType
}