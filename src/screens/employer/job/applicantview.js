import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Box } from 'reactjs-admin-lte';

import Wrapper from '../../partials/wrapper';
import Table from '../../partials/customtable';
import Dialog from '../../partials/dialog';

import { getapplicants, deleteapplicants } from '../../../actions/employer';

class ApplicantView extends Component{

	state = { loading: true, modalActivate: false, delid: null, edit: null}

	componentDidMount(){
		if(this.props.match.params.id){
			this.props.getapplicants(this.props.match.params.id);
		}
	}

	componentDidUpdate(props){

	}

	del = evt => {
		// company id and job id required for delete
		let id = evt.target.parentElement.dataset.key;
		this.setState({ modalActivate: true, delid: id });
	}

	render(){
		return (
			<Wrapper heading="View Jobs">
				<Box className="box-success" loading = {this.props.loading}>
					<Box.Header>
                        <Box.Title>Job Applicant</Box.Title>
                    </Box.Header>
                    <Box.Body>
                    	<Table 
                    		heading={[
	                    		{name: "Job Title", field: "jobtitle"},
	                    		{name: "Applicant Name", field: "employee_name"},
	                    		{name: "CV", field: "cv", link: true}
	                    	]} 
	                    	data={this.props.applicants} >
                    		<Table.Action>
                    			<button className="btn btn-danger" data-toggle="tooltip" title="Delete" onClick={this.del}>
                    				<i className="fa fa-trash"></i>
                    			</button>
                    		</Table.Action>
                    	</Table>
                    </Box.Body>
                    <Box.Footer>

                    </Box.Footer>
				</Box>

				<Dialog
                    title="Delete"
                    modalType="modal-danger" 
                    positiveText="Yes"
                    negativeText="No"
                    negativeCallback={ () => { this.setState({ modalActivate: false }) } }
                    positiveCallback={ () => { this.setState({modalActivate: false }); this.props.deleteapplicants(this.state.delid) } }
                    active={ this.state.modalActivate }>
                
                    <p>Do you want to delete ?</p>
                
                </Dialog>
			</Wrapper>
		);
	}
}

export default connect(state => ({
	loading: state.employer.applicantloading,
	applicants: state.employer.applicants
}), dispatch => ({
	getapplicants : (id) => getapplicants(dispatch, id),
	deleteapplicants: (applicant_id) => deleteapplicants(dispatch, applicant_id)
}))(ApplicantView);