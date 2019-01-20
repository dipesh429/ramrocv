const initialState = {
	blogs: {
		data: []
	},
	blog: {},
	loading: false
}
let blogsReducer = (state = initialState, action) =>{
	switch(action.type){
		case "GET_BLOGS":
			return {...state, blogs: action.data, loading: action.loading, got_blogs: action.got_blogs }
		case "GET_BLOG":
			return {...state, blog: action.data, loading: action.loading}
		case "LOADING_BLOGS":
			return { ...state, loading: action.loading }
		default:
			return {...state}
	}
} 

export default blogsReducer;