// blogs action creator
import {BASE_URL} from '../config';

let getblogs = (dispatch) => {
	dispatch({ type: "LOADING_BLOGS", loading: true });
	fetch(`${BASE_URL}/blog`, {
		headers: {
			'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
		}
	}).then(d => d.json())
	.then(data => {
		if(data.data){
			dispatch({ type: "GET_BLOGS", data: data, loading: false, got_blogs: true })
		}
	}).catch(err => {
		console.log(err)
	});
}

let getblog = (dispatch, id) => {
	dispatch({ type: "LOADING_BLOGS", loading: true });
	fetch(`${BASE_URL}/blog/${id}`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('access_token')}`
		}
	}).then(d => d.json())
	.then(data => {
		if(data.id){
			dispatch({ type: "GET_BLOG", data: data, loading: false });
		}
	}).catch(e => console.log(e))
}

export {
	getblogs,
	getblog
}