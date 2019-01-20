import {BASE_URL} from '../../config';
import {getfollowedCompany} from '../employee';
import {getfollowedIndustry} from '../employee';
import {getfollowedCategory} from '../employee';


let follow_company = (dispatch,id,log) => {

	fetch(`${BASE_URL}/profile/${id}/follow/${log}`)
		.then(d => d.json())
		.then(data =>{
			dispatch({type:'CHECK_IF_FOLLLOWED',data})
			getfollowedCompany(dispatch)
				
		})
}

let unfollow_company = (dispatch,id,log) => {

	fetch(`${BASE_URL}/profile/${id}/unfollow/${log}`)
		.then(d => d.json())
		.then(data => {
			dispatch({type:'CHECK_IF_FOLLLOWED',data})
			getfollowedCompany(dispatch)
				
		})
}

let follow_industry = (dispatch,id,log) => {

	fetch(`${BASE_URL}/industry/${id}/follow/${log}`)
		.then(d => d.json())
		.then(data =>{
			// dispatch({type:'CHECK_IF_FOLLLOWED',data})
			getfollowedIndustry(dispatch)
				
		})
}

let unfollow_industry = (dispatch,id,log) => {

	fetch(`${BASE_URL}/industry/${id}/unfollow/${log}`)
		.then(d => d.json())
		.then(data => {
			// dispatch({type:'CHECK_IF_FOLLLOWED',data})
			getfollowedIndustry(dispatch)
				
		})
}

let follow_category = (dispatch,id,log) => {

	fetch(`${BASE_URL}/category/${id}/follow/${log}`)
		.then(d => d.json())
		.then(data =>{
			// dispatch({type:'CHECK_IF_FOLLLOWED',data})
			getfollowedCategory(dispatch)
				
		})
}

let unfollow_category = (dispatch,id,log) => {

	fetch(`${BASE_URL}/category/${id}/unfollow/${log}`)
		.then(d => d.json())
		.then(data => {
			// dispatch({type:'CHECK_IF_FOLLLOWED',data})
			getfollowedCategory(dispatch)
				
		})
}


let checkiffollowed = (dispatch,id,log) => {

	fetch(`${BASE_URL}/checkiffollowed/${id}/${log}`)
		.then(d => d.json())
		.then(data => dispatch({type:'CHECK_IF_FOLLLOWED',data}))
}

let get_popup = dispatch => {
	fetch(`${BASE_URL}/advertisement/getpopup`, {
		'headers': {
			'Authorization': `Bearer ${localStorage.getItem('access_token')}`
		}
	}).then(d => d.json())
	.then(data => {
		if(!data.error){
			console.log(data)
			dispatch({ type: "POPUP", data })
		}
	}).catch(e => {})
}

let get_about = dispatch => {
	dispatch({ type: "GENERAL_LOADING", loading: true });
	fetch(`${BASE_URL}/settings/aboutus`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.text())
	.then(data => {
		let d = data;
		try{
			d = JSON.parse(data);
		} catch (e) { console.log(e) }

		if(!d.error){
			dispatch({type: "ABOUT", data })
		}
		dispatch({type: "GENERAL_LOADING", loading: false })
	}).catch(e => {
		dispatch({type: "GENERAL_LOADING", loading: false })
	});
}

let get_terms = dispatch => {
	dispatch({ type: "GENERAL_LOADING", loading: true });
	fetch(`${BASE_URL}/settings/terms`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.text())
	.then(data => {
		let d = data;
		try{
			d = JSON.parse(data);
		} catch (e) { console.log(e) }

		if(!d.error){
			dispatch({type: "TERMS", data })
		}
		dispatch({type: "GENERAL_LOADING", loading: false })
	}).catch(e => {
		dispatch({type: "GENERAL_LOADING", loading: false })
	});
}


let get_contact = dispatch => {
	dispatch({ type: "GENERAL_LOADING", loading: true });
	fetch(`${BASE_URL}/settings/contactus`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		if(!data.error){
			dispatch({type: "CONTACT", data })
		}
		dispatch({type: "GENERAL_LOADING", loading: false })
	}).catch(e => {
		dispatch({type: "GENERAL_LOADING", loading: false })
	});
}

let send_feedbacks = (dispatch, data) => {
	dispatch({ type: "GENERAL_LOADING", loading: true });
	fetch(`${BASE_URL}/feedbacks`,{
		method: "POST",
		body: data,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ localStorage.getItem("access_token") }`
		}
	}).then(d => d.json())
	.then(res => {
		if(res.error){
			dispatch({ type: "GENERAL_LOADING", loading: false });
			dispatch({ type: "TOAST_ERROR", message: "Sorry! Could not send your feedbacks."})
		}
	}).catch(err => {
		dispatch({ type: "GENERAL_LOADING", loading: false });
		dispatch({ type: "TOAST_ERROR", message: "Sorry! Could not send your feedbacks."})
	})
}

let get_employer = (dispatch, id) => {
	// dispatch({type: "GENERAL_LOADING", loading: true})
	dispatch({type: "PROGRESS_EMPLOYER_GENERAL", loading: true});
	fetch(`${BASE_URL}/company/${id}`, {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${ localStorage.getItem("access_token") }`
		}
	}).then(d => d.json()).then(res => {
		if(res.error){
			dispatch({ type: "TOAST_ERROR", message: "Could not load employer information."});
			// dispatch({ type: "GENERAL_LOADING", loading: false });
			dispatch({ type: "PROGRESS_EMPLOYER_GENERAL", loading: false});

		}else if(res.data){
			dispatch({ type: "GET_EMPLOYER", data: res.data });
			// dispatch({ type: "GENERAL_LOADING", loading: false });
			dispatch({type: "PROGRESS_EMPLOYER_GENERAL", loading: false});

		}
	}).catch(e => {
		dispatch({ type: "TOAST_ERROR", message: "Could not load employer information."});
		// dispatch({ type: "GENERAL_LOADING", loading: false });
		dispatch({type: "PROGRESS_EMPLOYER_GENERAL", loading: false});

	})
} 

let get_top_employer = (dispatch) => {
	fetch(`${BASE_URL}/topemployer`, {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(res => {
		if(res.data){
			dispatch({ type: "TOP_EMPLOYER", data: res.data })
		}
	}).catch(e => { console.log(e) })
}

export {
	get_about,
	get_contact,
	get_terms,
	get_employer,
	send_feedbacks,
	get_top_employer,
	get_popup,
	follow_company,
	follow_category,
	follow_industry,
	checkiffollowed,
	unfollow_company,
	unfollow_industry,
	unfollow_category
}