let initialState = {
    detail: {},
    employer: {},
    error: {},
    cvs: [],
    cv:{
        objective: "",
        awards: [],
        reference: [],
        skill: [],
        experience: [],
        education: [],
        projects: []
    },
    applied_jobs: [],
    dashboard: {}
}
let employerReducer = (state = initialState, action)=>{
    switch(action.type){
        case "GET_COMPANY_FOLLOWED_NAME":
            return {...state, companyfollowing:action.data.followed,companynotfollowing:action.data.other}
        case "GET_CATEGORY_FOLLOWED_NAME":
            return {...state, categoryfollowing:action.data.followed,categorynotfollowing:action.data.other}
        case "GET_INDUSTRY_FOLLOWED_NAME":
            return {...state, industryfollowing:action.data.followed,industrynotfollowing:action.data.other}
        case "EMPLOYEE_LOADING":
            return {...state, ...action.data }
        case "DASHBOARD_DATA":
            return {...state, dashboard: action.data}
        case "GOT_EMPLOYEE_PROFILE":
            return { ...state }
        // case "EDIT_EMPLOYER_CONTACT":
        //     return { ...state }
        // case "EDIT_EMPLOYER_COMPANY":
        //     return { ...state }
        // case "EDIT_APPLICANT_INSTRUCTIONS":
        //     return { ...state }
        // case "EDIT_SPECIAL_FEATURES":
        //     return { ...state }
        default:
            return {...state}
    }
}

export default employerReducer;