import React, {Component} from 'react';
import {connect} from 'react-redux';

import Wrapper from '../../partials/wrapper';
import ProfilePicture from './profile_picture';
import PersonalDetails from './personaldetails';
import ProfileCompleteness from './profilecompleteness';
import {getdata} from '../../../actions/employee';

class Profile extends Component{

	componentDidMount(){
        if(!this.props.got_data){
            this.props.getdata();
        }
    }

	render(){
		return (
			<Wrapper heading="Your Profile">
				<div className="row">
					<div className="col-md-7">
						<ProfilePicture />
						<PersonalDetails />
					</div>
					<div className="col-md-5">
						<ProfileCompleteness />
					</div>
				</div>
			</Wrapper>
		)
	}
}

export default connect(state => ({
	user: state.auth.user,
    got_data: state.employee.got_data
}), dispatch => ({
	getdata : () => getdata(dispatch) 
}))(Profile);
