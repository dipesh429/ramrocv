let initialState = {
    detail: {},
    employer: {},
    applicants: [],
    dashboard: {},
    reviews: {
        data: []
    },
    rating: {},
    individual_reviews: {}
}
let employerReducer = (state = initialState, action)=>{
    switch(action.type){
        case "EMPLOYER_LOADING":
            return {...state, ...action.data }
        case "DASHBOARD_DATA":
            return { ...state, dashboard: action.data }
        case "GOT_EMPLOYER_PROFILE":
            return { ...state }
        case "EDIT_EMPLOYER_CONTACT":
            return { ...state }
        case "EDIT_EMPLOYER_COMPANY":
            return { ...state }
        case "EDIT_APPLICANT_INSTRUCTIONS":
            return { ...state }
        case "EDIT_SPECIAL_FEATURES":
            return { ...state }
        case "COMPANY_REVIEWS":
            return { ...state, reviews: action.data };
        case "COMPANY_REVIEWS_INDIVIDUAL":
            return { ...state, individual_reviews: action.data};
        case "COMPANY_REVIEWS_MORE":
            return { ...state, reviews: { ...action.data, data: [ ...state.reviews.data, ...action.data.data ] } };
        case "COMPANY_RATING":
            return { ...state, rating: action.data };
        case "EMPLOYER_CLEAR_INDIVIDUAL":
            return { ...state, individual_reviews: {} }
        default:
            return {...state}
    }
}

export default employerReducer;