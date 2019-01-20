import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import {Box} from 'reactjs-admin-lte';
import Wrapper from '../../partials/wrapper';

import {Form} from 'informed';
import Input from '../../custom_form/input';

import {getcv, createcv, deletecv} from '../../../actions/employee';
import Table from '../../partials/customtable';
import Dialog from '../../partials/dialog';

class ViewCV extends Component{

	state = { delete: null, active: false }

	componentDidMount(){
		this.props.getcv();
	}
	
	render(){
		if(this.state.view){
			return <Redirect push to={`/dashboard/cvmaker/view/${this.state.view}`} />
		}
		if(this.state.edit){
			return <Redirect push to={`/dashboard/cvmaker/edit/${this.state.edit}`} />
		}
		return (
			<Wrapper heading="View CV">
				<div className="row">
					<div className="col-md-6">
						<Box className="box-success" loading={this.props.loading}>
							<Form onSubmit={a => this.props.create(a, this.props.history) }>
								<Box.Header>
			                        <Box.Title>Add CV</Box.Title>
			                    </Box.Header>
			                    <Box.Body>
			  						<Input value={this.props.success ? "" : null } error={this.props.error.name} field="name" placeholder="CV Name" label={{id: "name", heading: "CV Name"}} className="form-control"/>           	
			                    </Box.Body>
			                    <Box.Footer>
			                    	<button type="submit" className="btn btn-info pull-right">Create</button>
			                    </Box.Footer>
		                    </Form>
						</Box>
					</div>

					<div className="col-md-6">
						<Box className="box-primary" loading={this.props.loading}>
							<Box.Header>
		                        <Box.Title>View CV</Box.Title>
		                    </Box.Header>
		                    <Box.Body>
		                    	<Table 
		                    		heading={[
			                    		{name: "CV Name", field: "name"},
			                    		{name: "Created At", field: "created_at"}
			                    	]} 
			                    	data={this.props.cvs} >
		                    		<Table.Action>
		                    			<button className="btn btn-default" data-toggle="tooltip" title="View" onClick={this.view}>
		                    				<i className="fa fa-eye"></i>
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
						</Box>
					</div>
				</div>

				<Dialog
                    title="Delete"
                    modalType="modal-danger" 
                    positiveText="Yes"
                    negativeText="No"
                    negativeCallback={ () => this.setState({ active: false }) }
                    positiveCallback={ () => { this.setState({ active: false }); this.props.deletejob(this.state.delete) } }
                    active={ this.state.active }>
                
                    <p>Do you want to delete ?</p>
                
                </Dialog>
			</Wrapper>
		);
	}

	view = evt => {
		const p2 = evt.target.parentElement.parentElement.dataset.key
		let id = evt.target.parentElement.dataset.key || p2;
		this.setState({view: id});
	}

	edit = evt => {
		const p2 = evt.target.parentElement.parentElement.dataset.key
		let id = evt.target.parentElement.dataset.key || p2;
		this.setState({edit: id});
	}

	del = evt => {
		const p2 = evt.target.parentElement.parentElement.dataset.key
		let id = evt.target.parentElement.dataset.key || p2;
		this.setState({ delete: id, active: true });
	}
}

export default connect(state => ({
	loading: state.employee.cvloading,
	success: state.employee.success,
	cvs: state.employee.cvs,
	error: state.employee.error
}), dispatch => ({
	getcv: () => getcv(dispatch),
	create: (a, history) => createcv(dispatch, a, history),
	deletejob: (id) => deletecv(dispatch, id)
}))(withRouter(ViewCV));