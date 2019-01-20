import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Box } from 'reactjs-admin-lte';

import Wrapper from '../partials/wrapper';
import Table from '../partials/customtable';
import Dialog from '../partials/dialog';

import {getAppliedJobs} from '../../actions/employee';

class ViewAppliedJobs extends Component{

	state = { loading: true, modalActivate: false, delid: null, edit: null}

	componentDidMount(){
		this.props.getAppliedJobs();
	}

	componentDidUpdate(props){
		
	}

	render(){
		
		if(this.state.view){
			return <Redirect to={`/job/view/${this.state.view}`} />
		}
		if(this.state.edit){
			return <Redirect to={ `/dashboard/job/edit/${this.state.edit}` } />
		}

		return (
			<Wrapper heading="Applied Jobs">
				<Box className="box-success" loading = {this.props.loading}>
					<Box.Header>
                        <Box.Title>Applied Jobs </Box.Title>
                    </Box.Header>
                    <Box.Body>
                    	<Table 
                    		heading={[
	                    		{name: "Your CV", field: "cv", link: true},
	                    		{name: "Company Name", field: "company_name"},
	                    		{name: "Job Title", field: "jobtitle"}
	                    	]} 
	                    	data={this.props.jobs} />
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
                    positiveCallback={ () => { this.setState({ modalActivate: false }); /*this.props.deletejob(this.state.delid)*/ } }
                    active={ this.state.modalActivate }>
                
                    <p>Do you want to delete ?</p>
                
                </Dialog>
			</Wrapper>
		);
	}
}

export default connect(state => ({
	jobs: state.employee.applied_jobs,
	loading: state.employee.appliedloading
}), dispatch => ({
	getAppliedJobs: () => getAppliedJobs(dispatch)
}))(ViewAppliedJobs);