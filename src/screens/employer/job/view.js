import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Box } from 'reactjs-admin-lte';

import Wrapper from '../../partials/wrapper';
import Table from '../../partials/customtable';
import Dialog from '../../partials/dialog';
import Pagination from '../../partials/pagination';

import parser from 'query-string';
import {getCompanyJobs, deletejob} from '../../../actions/job';

class ViewJobs extends Component{

	state = { loading: true, modalActivate: false, delid: null, edit: null}

	componentDidMount(){
		const thisdata = parser.parse(this.props.location.search);
		if(this.props.user.company && this.props.user.company.id){
			this.props.getJobs(this.props.user.company.id, thisdata.page );
		}
	}

	componentDidUpdate(props){
		

		
		if((this.props.loading !== props.loading) && this.props.loading){
			this.setState({ loading: true });
		}

		if(this.props.user.company){
			const thisdata = parser.parse(this.props.location.search);
			const prevdata = parser.parse(props.location.search);
			if(thisdata.page !== prevdata.page){
				this.props.getJobs(this.props.user.company.id, thisdata.page);
			}

			if(this.props.user.company.id !== props.user.company.id){
				this.props.getJobs(this.props.user.company.id, thisdata.page);
			}
		}

	}

	view = evt => {
		// get id from DOM
		
		let id = evt.target.parentElement.dataset.key;
		this.setState({ view: id })
	}

	edit = evt => {
		// company_id and job id required for update
		let id = evt.target.parentElement.dataset.key;
		this.setState({ edit: id })		
	}

	del = evt => {
		// company id and job id required for delete

		let id = evt.target.parentElement.dataset.key;
		this.setState({ modalActivate: true, delid: id });
	}

	viewcandidates = evt => {
		let id = evt.target.parentElement.dataset.key;
		this.setState({ viewcandidates: id });
	}

	render(){
		if(this.state.viewcandidates){
			return <Redirect push to={`/dashboard/job/view/${this.state.viewcandidates}/candidates`} />
		}
		if(this.state.view){
			return <Redirect push to={`/job/view/${this.state.view}`} />
		}
		if(this.state.edit){
			return <Redirect push to={ `/dashboard/job/edit/${this.state.edit}` } />
		}
		return (
			<Wrapper heading="View Jobs">
				<Box className="box-success" loading = {this.props.loading}>
					<Box.Header>
                        <Box.Title>Jobs</Box.Title>
                        <Box.Tools>
                        	<Link to="/dashboard/job/create" className="btn btn-info"><i className="fa fa-plus" /> &nbsp; Create</Link>
                        </Box.Tools>
                    </Box.Header>
                    <Box.Body>
                    	<Table 
                    		heading={[
	                    		{name: "Job Title", field: "jobtitle"},
	                    		{name: "Keywords", field: "keywords"},
	                    		{name: "Type", field: "type"}
	                    	]} 
	                    	data={ this.props.jobs.data } >
                    		<Table.Action>
                    			<button className="btn btn-default" data-toggle="tooltip" title="View" onClick={this.view}>
                    				<i className="fa fa-eye"></i>
                    			</button>
                    			<button className="btn btn-success" data-toggle="tooltip" title="View Candidates" onClick={this.viewcandidates}>
                    				<i className="fa fa-users"></i>
                    			</button>
                    			<button className="btn btn-primary" data-toggle="tooltip" title="Edit" onClick={this.edit}>
                    				<i className="fa fa-edit"></i>
                    			</button>
                    			<button className="btn btn-danger" data-toggle="tooltip" title="Delete" onClick={this.del}>
                    				<i className="fa fa-trash"></i>
                    			</button>
                    		</Table.Action>
                    	</Table>
                    </Box.Body>
                    <Box.Footer>
						<Pagination url="/dashboard/job/view" className="pagniation pagination-sm no-margin pull-right" data={ this.props.jobs } />
                    </Box.Footer>
				</Box>

				<Dialog
                    title="Delete"
                    modalType="modal-danger" 
                    positiveText="Yes"
                    negativeText="No"
                    negativeCallback={ () => { this.setState({ modalActivate: false }) } }
                    positiveCallback={ () => { this.setState({modalActivate: false }); this.props.deletejob(this.state.delid) } }
                    active={ this.state.modalActivate }>
                
                    <p>Do you want to delete ?</p>
                
                </Dialog>
			</Wrapper>
		);
	}
}

export default connect(state => ({
	user: state.auth.user,
	loading: state.job.loading,
	jobs: state.job.jobs
}), dispatch => ({
	getJobs : (id, page) => dispatch(getCompanyJobs(id, page)),
	deletejob: (job_id) => dispatch( deletejob(job_id) )
}))(ViewJobs);