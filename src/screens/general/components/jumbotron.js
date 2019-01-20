import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';


let banner;

const $ = window.jQuery;

class Jumbotron extends Component{
	
	state = { query: "", location: ""}
	
	default_search = {
		query: "",
		category: "",
		industry: "",
		type: "",
		salary: "",
		location: "",
		jobcategory: "",
		per_page: 10,
		page: 1
	}

	submit = () => {
		const search = { ...this.default_search, ...this.state }
		const query = this.generatequery(search);
		this.props.history.push(`/jobs${query}`);
	}


	generatequery = (search) => {
		let query = "?";
		for(let c of Object.keys(search)){
			query = `${query}${c}=${search[c]}&`
		}
		query = query.substring(0, query.length-1)
		return query;
	}

	changelocation = evt => this.setState({ location: evt.target.innerHTML })

	render(){
		return (
			 <div className="banner-job" style={{ ...banner, padding: this.props.padding || null}}>
	        <div className="banner-overlay" />
	        <div className="container text-center">
	          <h1 className="title">{this.props.title || `The Easiest Way to Get Your New Job`}</h1>
	          <h3>{ this.props.subtitle || `Kickstart your career right now`}</h3>
	          <div className="banner-form">
	            <form action="#" onSubmit={this.submit}>
	              <input className="custom form-control" placeholder="Type your key word" type="text" onChange={evt => this.setState({query: evt.target.value }) }/>
	              <div className="dropdown category-dropdown">						
	                <a data-toggle="dropdown" href="#"><span className="change-text">{ this.state.location || "Job Location" }</span> <i className="fa fa-angle-down" /></a>
	                 <ul className="dropdown-menu category-change">
	                  <li><a onClick={this.changelocation}>Kathmandu</a></li>
	                  <li><a onClick={this.changelocation}>Biratnagar</a></li>
	                  <li><a onClick={this.changelocation}>Dhadhing</a></li>
	                </ul>									
	              </div>


                                  



	              <button type="submit" className="btn btn-primary" value="Search">Search</button>
	            </form>
	          </div>
	          { !this.props.nosocial && 
		          <ul className="banner-socail list-inline">
		            <li><a href="https://www.facebook.com/ramrocv/"  target="_blank" title="Facebook"><i className="fa fa-facebook" /></a></li>
		            <li><a href="https://www.instagram.com/ramrocv/" title="Instagram" target="_blank"><i className="fa fa-instagram" /></a></li>
		          	<li>
		          		<a href="https://twitter.com/CvRamro" target="_blank" title="Twitter">
		          			<i className="fa fa-twitter"></i>
		          		</a>
		          	</li>
		          	<li>
		          		<a href="https://www.linkedin.com/company/ramrocv/" target="_blank">
		          			<i className="fa fa-linkedin"></i>
		          		</a>
		          	</li>

		          </ul>
	          }
	        </div>
	      </div>
		);
	}
}


export default connect(null, null)(withRouter(Jumbotron));

banner = {
	padding: "100px 0",
	backgroundImage: `url(https://picsum.photos/600/300?random)` 
}