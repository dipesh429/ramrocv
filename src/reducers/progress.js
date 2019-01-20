let progressReducer = (state = { 
        loading: 0,
        mailloading: false,
        jobindividual: false,
        employerloading: false
    }, action) => {
    switch(action.type){
        case "USER_LOADING":
            return {...state, userloading: action.loading };
        case 'DASHBOARD_LOADING':
            return {...state, dashboardloading: action.loading}
        case 'PROGRESS_START':
            return {...state, loading: true, percentage: 0 };
        case 'PROGRESS_FINISH':
            return {...state, loading: false, percentage: 0};
        case "MAIL_START":
            return {...state, mailloading: true};
        case "MAIL_FINISH":
            return {...state, mailloading: false};
        case "JOB_SEARCH_LOADING":
            return { ...state, jobsearchloading: action.loading }
        case "PROGRESS_JOB_INDIVIDUAL":
            return { ...state, jobindividual: action.loading }
        case "PROGRESS_EMPLOYER_GENERAL":
            return { ...state, employerloading: action.loading }
        case "PROGRESS_JOBSBY_CATEGORY":
            return { ...state, jobsbycategoryloading: action.loading }
        case "PROGRESS_JOBSBY_LOCATION":
            return { ...state, jobsbylocationloading: action.loading }
        case "PROGRESS_JOBSBY_TYPE":
            return { ...state, jobsbytypeloading: action.loading }
        default:
            return {...state}
    }
}
export default progressReducer;