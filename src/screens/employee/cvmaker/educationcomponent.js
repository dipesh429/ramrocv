import React, {Component} from 'react';

import DateRange from '../../custom_form/daterange';

class EducationComponent extends Component{

	state = {
		daterange: "",
		school: "",
		grades: "",
		level: ""
	}

	componentDidMount(){
		if(this.props.data){
			console.log(this.props.data);
			this.setState({
				daterange: this.props.data.daterange,
				school: this.props.data.school,
				grades: this.props.data.grades,
				level: this.props.data.level
			});
		}
	}

	componentDidUpdate(props, state){
		if( 
			(this.state.daterange !== state.daterange) ||
			(this.state.school !== state.school) ||	
			(this.state.grades !== state.grades) ||
			(this.state.level !== state.level)
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
							<label>Date Range</label>
							<DateRange value={this.state.daterange} onChange={(val) => { this.setState({daterange: val}) } }/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Level</label>
							<input value={this.state.level} placeholder="level (eg; SLC)" className="form-control" onChange={evt => this.setState({ level: evt.target.value }) }/>
						</div>

						<div className="form-group">
							<label>Grades</label>
							<input value={this.state.grades} placeholder="grades (eg; 81%, 5.6 GPA)" className="form-control" onChange={evt => this.setState({ grades: evt.target.value }) }/>
						</div>
					</div>	
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group">
							<label>Institution</label>
							<input value={this.state.school} placeholder="School (eg; Example High School)" className="form-control" onChange={evt => this.setState({ school: evt.target.value })}/>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default EducationComponent;

