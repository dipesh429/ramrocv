import React, {Component} from 'react';

import DatePicker from '../../custom_form/datepicker';

class EducationComponent extends Component{

	state = {
		year: "",
		title: "",
		institution: ""
	}

	componentDidMount(){
		if(this.props.data){
			this.setState({
				year: this.props.data.year,
				title: this.props.data.title,
				institution: this.props.data.institution,
			});
		}
	}

	componentDidUpdate(props, state){
		if( 
			(this.state.year !== state.year) ||
			(this.state.title !== state.title) ||	
			(this.state.institution !== state.institution)
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
						<br/>
						<a className="btn btn-xs btn-danger pull-right" onClick={() => this.props.deleteCallback(this.props.i) }><i className="fa fa-trash" /></a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<div className="form-group">
							<label>Year</label>
							<DatePicker field="year" value={this.state.year} onChange={(val) => { this.setState({year: val}) } }/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>Title</label>
							<input value={this.state.title} placeholder="Award Title" className="form-control" onChange={evt => this.setState({ title: evt.target.value }) }/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>Institution</label>
							<input value={this.state.institution} placeholder="Award Institution" className="form-control" onChange={evt => this.setState({ institution: evt.target.value }) }/>
						</div>
					</div>	
				</div>
			</React.Fragment>
		);
	}
}

export default EducationComponent;

