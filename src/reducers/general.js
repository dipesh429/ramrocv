// general reducers to handle all public display requests

const initialstate = {
	featuredjobs: null,
	individualjob: {company: {user: {} } },
	about: "",
	contact: {},
	terms: "",
	recentjobs: null,
	generaljobs: null,
	hotjobs: null,
	popularjobs: null,
	employer: {},
	topemployer: null,
	popup: {},
	checkfollower: '0'

}

let general = (state = initialstate, action) => {
	switch(action.type){
		case "POPUP":
			return {...state, popup: action.data }
		case "CHECK_IF_FOLLLOWED":
			return {...state,checkfollower:action.data}
		case "FEATURED_JOBS":
			return {...state, featuredjobs: action.data }
		case "INDIVIDUAL_JOB":
			return {...state, individualjob: action.data }
		case "GENERAL_JOBS":
			return {...state, generaljobs: action.data }
		case "TOP_EMPLOYER":
			return {...state, topemployer: action.data }
		case "ABOUT":
			return {...state, about: action.data }
		case "CONTACT":
			return {...state, contact: action.data }
		case "TERMS":
			return {...state, terms: action.data }
		case "RECENTJOBS":
			return {...state, recentjobs: action.data }
		case "HOTJOBS":
			return {...state, hotjobs: action.data }
		case "POPULARJOBS":
			return {...state, popularjobs: action.data }
		case "GET_EMPLOYER":
			return {...state, employer: action.data }
		case "GENERAL_LOADING":
			return {...state, loading: action.loading }
		default:
			return {...state};
	}
}

export default general;