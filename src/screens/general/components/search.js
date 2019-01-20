import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Select from '../../custom_form/select';

import parser from 'query-string';

class Search extends Component{
	
	state = { query: "" }

	componentDidMount(){
		const data = parser.parse(this.props.location.search);
		this.setState({ query: data.query })
	}

	change = evt => {
		this.setState({ query: evt.target.value })
	}

	send = evt => {
		if(this.props.onChange){
			this.props.onChange({...this.state})
		}
		evt.preventDefault()
	}
	
	render(){

		return (
			<React.Fragment>
				<h3 >Search Jobs</h3>
				<div className="banner-form banner-form-full job-list-form">
				  <form onSubmit={this.send}>
				    <input type="text" className="form-control" placeholder="Type your key word" defaultValue={this.state.query} onChange={this.change}/>
				    <button type="submit" className="btn btn-primary" value="Search" onClick={ this.send }>Search</button>
				  </form>
				</div>
			</React.Fragment>
		);
	}
}

export default connect()(withRouter(Search));