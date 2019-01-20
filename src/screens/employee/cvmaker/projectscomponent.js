import React, {Component} from 'react';

class ExperienceComponent extends Component{

	state = {
		title: "",
		duration: "",
		description: "",
	}

	componentDidMount(){
		if(this.props.data){

			this.setState({
				title: this.props.data.title,
				duration: this.props.data.duration,
				description: this.props.data.description,
			});
		}
	}


	componentDidUpdate(props, state){
		if( 
			(this.state.title !== state.title) ||
			(this.state.duration !== state.duration) ||
			(this.state.description !== state.description)
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
					<div className="col-md-6">
						<div className="form-group">
							<label>Title</label>
							<input value={this.state.title} placeholder="Title" className="form-control" onChange={evt => this.setState({ title: evt.target.value }) }/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Duration</label>
							<input value={this.state.duration} placeholder="Position" className="form-control" onChange={evt => this.setState({ duration: evt.target.value }) }/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group">
							<label>Description</label>
							<textarea value={this.state.description} cols="10" onChange={evt => this.setState({ description: evt.target.value })} className="form-control" />
						</div>
					</div>
				</div>
				<hr />
			</React.Fragment>
		);
	}

}

export default ExperienceComponent;

