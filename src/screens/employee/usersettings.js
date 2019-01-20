import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import Wrapper from '../partials/wrapper';
import Dialog from '../partials/dialog';
import { Form } from 'informed';
import Input from '../custom_form/input';
import Submit from '../custom_form/submit';


import {change_user,delete_user} from '../../actions/user';


import {Modal} from 'react-bootstrap';

class UserSettings extends Component{
	
	state = { show: false, type: "" }

	handleClose = () => this.setState({ show: false })
	show = type => this.setState({ show: true, type })
	
	change = formState => {
		this.props.change(formState)
	}

	render(){
		return (
			<Wrapper heading="Settings">
				<div className="row">
					<div className="col-md-12">
						<Box loading={this.props.loading} className="box-red">
							<Box.Header>
								<Box.Title>User Settings</Box.Title>
							</Box.Header>
							<Box.Body>
								<table className="table table-striped">
									<tbody>
										<tr>
											<th>Full Name: </th>
											<td>{this.props.user.name}</td>
											<td><button className="btn btn-sm btn-default" onClick={() => this.show("name") }>Change</button></td>
										</tr>
										<tr>
											<th>Password: </th>
											<td>********</td>
											<td><button className="btn btn-sm btn-default" onClick={() => this.show("password") }>Change</button></td>
										</tr>
										<tr>
											<th>Email: </th>
											<td>{this.props.user.email}</td>
											<td><button className="btn btn-sm btn-default" onClick={() => this.show("email") }>Change</button></td>
										</tr>
										
									</tbody>
								</table>
								<hr/>
								<button onClick={() => this.show("user") } className="pull-right btn btn-danger"><i className="fa fa-warning"></i> &nbsp; Delete Account</button>
							</Box.Body>
						</Box>
					</div>
				</div>

				<Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
					<Modal.Header >
						<Modal.Title>{ this.state.type === "user" ? <span><i className="fa fa-warning"></i>&nbsp; Deleting Account</span>:`Changing ${this.state.type}` }</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.state.type === "name" &&	
						<Form onSubmit={this.change}>	
							<Input value={this.props.user.name} field="name" label={{id: "name", heading: "Your Name"}} className="form-control" placeholder="Name"/>
							<a className={"btn btn-default "+ (this.props.loading ? "disabled" : "")} onClick={this.handleClose}>Cancel</a>
							<Submit className="btn btn-primary pull-right" loading={this.props.loading}>Change</Submit>
							<div className="clearfix"></div>
						</Form>	
						}
						{this.state.type === "email" &&
						<Form onSubmit={this.change}>
							<p className="alert alert-warning"><i className="fa fa-info"></i> &nbsp; After you change your email. You need to re-verify your email.</p>
							<Input value={this.props.user.email} field="email" label={{id: "email", heading: "Your Email"}} className="form-control" placeholder="Email" />
							<Input type="password" field="password" label={{ id: "password", heading: "Your Password" }} className="form-control" placeholder="Password"/>
							<a className={"btn btn-default "+ (this.props.loading ? "disabled" : "")} onClick={this.handleClose}>Cancel</a>
							<Submit className="btn btn-primary pull-right" loading={this.props.loading}>Change</Submit>
							<div className="clearfix"></div>
						</Form>
						}
						{this.state.type === "password" &&
						<Form onSubmit={this.change}>
							<Input type="password" field="password" label={{id: "password", heading: "Current Password"}} className="form-control" placeholder="Current Password" />
							<Input type="password" field="new_password" label={{id: "newpassword", heading: "New Password"}} className="form-control" placeholder="New Password" />
							<Input type="password" field="conf_password" label={{id: "confpassword", heading: "Confirmation Password"}} className="form-control" placeholder="Confirmation Password" />
							<a className={"btn btn-default "+ (this.props.loading ? "disabled" : "")} onClick={this.handleClose}>Cancel</a>
							<Submit className="btn btn-primary pull-right" loading={this.props.loading}>Change</Submit>
							<div className="clearfix"></div>
						</Form>
						}
						{this.state.type === "user" &&

						<Form onSubmit={(formState)=>this.props.deleteuser(formState,this.props.history)}>

							<p className="alert alert-warning"><i className="fa fa-info"></i> &nbsp; This action cannot be undone. Are you sure you want to continue ?</p>
							<Input type="password" field="password" label={{ id: "password", heading: "Your Password" }} className="form-control" placeholder="Password"/>
							<a className={"btn btn-default "+ (this.props.loading ? "disabled" : "")} onClick={this.handleClose}>Cancel</a>
							<Submit className="btn btn-primary pull-right" loading={this.props.loading}>Yes</Submit>
							<div className="clearfix"></div>
						</Form>
						}
					</Modal.Body>
				</Modal>

			</Wrapper>		
		)
	}
}

export default connect(state => ({
	user: state.auth.user,
	loading: state.progress.userloading	
}), dispatch => ({

	deleteuser: (data,history) => delete_user(dispatch,data,history),
	change: (data) => change_user(dispatch, data)
	
}))(UserSettings);