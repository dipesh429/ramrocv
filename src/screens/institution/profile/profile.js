import React, {Component} from 'react';
import {connect} from 'react-redux';
import Wrapper from '../../partials/wrapper';

import ShowCompanyDetails from './showcompanydetails';
import ShowContactDetails from './showcontactdetails';
import ShowApplicantInstructions from './showapplicantinstructions';
import SpecialFeatures from './specialfeatures';
import ShowProfilePicture from './showprofilepicture';
import CompanyDescription from './companydescription';

import { getemployerdata } from '../../../actions/employer';

class Profile extends Component{

    componentDidMount(props){
        if(!this.props.got_data){
            this.props.getdata();
        }
    }

    render(){
        return (
            <Wrapper heading="Your Profile">
                <div className="row">
                        <div className="col-md-6">
                            <ShowProfilePicture />
                            <ShowCompanyDetails />
                            <SpecialFeatures />
                        </div>
                        <div className="col-md-6">
                            <ShowContactDetails />
                            <ShowApplicantInstructions />
                            <CompanyDescription />
                        </div>
                    </div>
            </Wrapper>
        )
    }
}

export default connect(state => ({
    user: state.auth.user,
    got_data: state.employer.got_data
}), dispatch => ({
    getdata: () => getemployerdata(dispatch)
}))(Profile);