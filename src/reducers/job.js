let initialState = {
    jobs:{data: []},
    error:[],
    prevJob:{},
    goback:false,
    publicjobs: {data: []},
    category: {},
    type: {},
    location: {}
}

let companyReducer = (state=initialState, action) => {

    switch(action.type){

        case "JOB_ADDED":
            return { ...state, job:action.job, goback:true } 

        case "JOB_ERROR":
        	return { ...state, error:action.message }

        case "JOB_PREVIOUS_VALUE":
            return {...state, prevJob: action.prevJob} 

        case "REMOVE_PREVIOUS_VALUE":
            return {...state, prevJob: {} } 

        case "JOB_LOADING":
            return {...state, ...action.data}

        case "JOBS_RESPONSE":
            return {...state, jobs: action.jobs }
        
        case "CLEAR_DATA":
            return {...state, prevJob: {}, error: []}

        case "JOBS_SEARCH":
            return {...state, publicjobs: action.data || {} }
    
        case "GET_CATEGORY_JOB":
            return {...state, category: action.data }

        case "GET_LOCATION_JOB":
            return {...state, location: action.data }

        case "GET_TYPE_JOB":
            return {...state, type: action.data }

        default:
            return {...state}
    }
}

export default companyReducer;
