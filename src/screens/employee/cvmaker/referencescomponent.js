import React, {Component} from 'react';

class ExperienceComponent extends Component{

	state = {
		name: "",
		position: "",
		designation: "",
		phone: "",
		email: ""
	}

	componentDidMount(){
		if(this.props.data){

			this.setState({
				name: this.props.data.name,
				position: this.props.data.position,
				designation: this.props.data.designation,
				phone: this.props.data.phone,
				email: this.props.data.email
			});
		}
	}


	componentDidUpdate(props, state){
		if( 
			(this.state.name !== state.name) ||
			(this.state.position !== state.position) ||
			(this.state.designation !== state.designation) ||
			(this.state.phone !== state.phone) ||
			(this.state.email !== state.email)
		){
			if(this.props.updateCallback){
				this.props.updateCallback(this.props.i, this.state);
			}
		}
	}

	render(){
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<br />
						<a className="btn btn-xs btn-danger pull-right" onClick={() => this.props.deleteCallback(this.props.i) }><i className="fa fa-trash" /></a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<div className="form-group">
							<label>Name</label>
							<input value={this.state.name} placeholder="Name" className="form-control" onChange={evt => this.setState({ name: evt.target.value }) }/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>Position</label>
							<input value={this.state.position} placeholder="Position" className="form-control" onChange={evt => this.setState({ position: evt.target.value }) }/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>Organization</label>
							<input value={this.state.designation} placeholder="Organization" className="form-control" onChange={evt => this.setState({ designation: evt.target.value }) }/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>Phone</label>
							<input value={this.state.phone} type="text" className="form-control" placeholder="Phone" onChange={evt => this.setState({phone: evt.target.value})}/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Email</label>
							<input value={this.state.email} type="email" className="form-control" placeholder="Email" onChange={evt => this.setState({ email: evt.target.value })}/>
						</div>
					</div>
				</div>
				<hr />
			</React.Fragment>
		);
	}

}

export default ExperienceComponent;

