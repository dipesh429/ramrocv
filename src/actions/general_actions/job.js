import {BASE_URL} from '../../config';


// to get featured jobs
let getfeatured = (dispatch) => {
	fetch(BASE_URL+"/featuredjob", {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		dispatch({ type: "FEATURED_JOBS", data: data.data || [] })
	}).catch(e => console.log(e));
}

let searchjobs = (dispatch, data) => {
	
	if(!data) return; 

	dispatch({ type: "JOB_SEARCH_LOADING", loading: true })

	fetch(`${BASE_URL}/jobsearch${data}`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json()).then(data => {
		dispatch({ type: "JOB_SEARCH_LOADING", loading: false });
		if(data.data){
			dispatch({ type: "JOBS_SEARCH", data: data })			
		}else if(data.error){
			dispatch({ type: "TOAST_ERROR", message: "Sorry! Search for job could not be completed."})
		}
	}).catch(e => {
		dispatch({ type: "JOB_SEARCH_LOADING", loading: false })
		dispatch({ type: "TOAST_ERROR", message: "Sorry! Search for job could not be completed."});
	})
}

let getgeneral = (dispatch) => {
	fetch(BASE_URL+"/generaljob?per_page=30",{
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		dispatch({ type: "GENERAL_JOBS", data: data.data || [] });
	}).catch(e => console.log(e))
}

let getindividual = (dispatch, id) => {
	dispatch({ type: "PROGRESS_JOB_INDIVIDUAL", loading: true });
	fetch(BASE_URL+"/jobad/"+id, {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		if(data.data){
			dispatch({ type: "INDIVIDUAL_JOB", data: data.data })
		}
		dispatch({ type: "PROGRESS_JOB_INDIVIDUAL", loading: false });
	}).catch(e => {
		console.log(e)
		dispatch({ type: "PROGRESS_JOB_INDIVIDUAL", loading: false });
	});
}

let hotjobs = (dispatch) => {
	fetch(BASE_URL+"/hotjob?per_page=10", {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token") }`
		}
	}).then(d => d.json())
	.then(data => {
		if(data.data && (data.data.length !== 0)){
			dispatch({ type: "HOTJOBS", data: data.data })
		}else{
			dispatch({ type: "HOTJOBS", data: [] })
		}
	}).catch(e => console.log(e));
} 

let recentjobs = (dispatch) => {
	fetch(BASE_URL+"/recentjob?per_page=10", {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token") }`
		}
	}).then(d => d.json())
	.then(data => {
		if(data.data && (data.data.length !== 0)){
			dispatch({ type: "RECENTJOBS", data: data.data })
		}else{
			dispatch({ type: "RECENTJOBS", data: [] })
		}
	}).catch(e => console.log(e));
}

let popularjobs = (dispatch) => {
	fetch(BASE_URL+"/popularjob?per_page=10", {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token") }`
		}
	}).then(d => d.json())
	.then(data => {
		if(data.data && (data.data.length !== 0)){
			dispatch({ type: "POPULARJOBS", data: data.data })
		}else{
			dispatch({ type: "POPULARJOBS", data: [] })
		}
	}).catch(e => console.log(e));
}



export {
	getfeatured, getindividual, recentjobs, getgeneral, hotjobs, popularjobs, searchjobs
}