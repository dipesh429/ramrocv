import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import ReactGA from 'react-ga';

import {NavDropdown, MenuItem} from 'react-bootstrap';
import {ROOT_NAVBAR, ENVIRONMENT} from '../../../config.js';

import * as user from '../../../actions/user';

class Navbar extends Component{

	componentDidMount(){
        document.body.className="";
		if(ENVIRONMENT === "production"){
			if(this.props.title){
				document.title = `${this.props.title}| ramrocv.com Job Portal`;
				ReactGA.set({page: `${this.props.title}| ramroCV.com Job Portal`})
				ReactGA.pageview(this.props.location.pathname + this.props.location.search);
			}
		}
		this.setState({ pathname: this.props.location.pathname });
	}

	state = {
		pathname: ""
	}

	componentDidUpdate(props){
		if(ENVIRONMENT === "production"){
			if(this.props.location.pathname !== props.location.pathname || 
			   this.props.location.search !== props.location.search){
			   	if(this.props.title){
					ReactGA.set({page: `${this.props.title}| RamroCV.com Portal`})
					ReactGA.pageview(this.props.location.pathname + this.props.location.search);
			   	}
			}
		}
		if(this.props.location.pathname !== props.location.pathname){
			this.setState({ pathname: this.props.location.pathname });
		}
	}

	render_links = () => {
		let links = [];
		for(let l of ROOT_NAVBAR){
			links.push(
				<li className={ this.state.pathname === l.href ? "active": "" } key={l.name}>
					<Link className="fontnav" to={l.href}>{l.name}</Link>
				</li>
			)
		}
		return links;
	}

	logOut = ()=>{
	    this.props.history.push('/');
	    localStorage.clear();
	    this.props.logOut();
	}

	changepassword = () => {
		localStorage.getItem("type") === "employee" && this.props.history.push('/dashboard/employee/usersettings');
		localStorage.getItem("type") === "employer" && this.props.history.push('/dashboard/employer/usersettings');
	}

	render(){
		const image = ( this.props.user.company && this.props.user.company.image ) || 
						( this.props.user.employee && this.props.user.employee.photo )
		
		return (
			<div>
			<header id="header" className="clearfix">

		       
		        <nav className="custom navbar navbar-default navbar-fixed-top" >
{/*		        <nav className="custom navbar navbar-default" >
*/}	          <div className="container" >

		            <div className="navbar-header">
		              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
		                <span className="sr-only">Toggle navigation</span>
		                <span className="icon-bar" />
		                <span className="icon-bar" />
		                <span className="icon-bar" />
		              </button>
						<Link className="navbar-brand" to="/">
							<img className="img-responsive" src={require('../../../img/logo.png')} alt="Logo" style={{width: "100px",height: "100px"}}/>
						</Link>
		            </div>
		       
		            {/* /navbar-header */}
		            <div className="navbar-left " style={{paddingTop:'30px'}}>
		              <div className="collapse navbar-collapse" id="navbar-collapse">
		                <ul className="custom nav navbar-nav " >
		                  { this.render_links() }
		                </ul>
		              </div>
		            </div>{/* navbar-left */}
		            {/* nav-right */}
		            <div className="nav-right custom" style={{paddingTop:'30px'}}>

		              	{ localStorage.getItem("id") 

		              		? 
		              			(
		              				<ul className="custom nav navbar-nav pull-right ">
										<NavDropdown id="navdown" title={
										<span>  
							                <img style={{width: "25px", height: "25px", marginRight: "10px", borderRadius: "25px"}} src={image ? image: require('../../../img/placeholder_user.jpg')} alt={this.props.name} />
							                <span  style={{color: "#333"}}>{ this.props.user.name }</span>
							              </span>
										}>
											<MenuItem onClick={() => this.props.history.push(this.props.type === "employee" ? "/dashboard/employee" : "/dashboard/employer" ) }>My Dashboard</MenuItem>
											<MenuItem onClick={() => this.props.history.push(this.props.type === "employee" ? "/profile" : "/dashboard/profile") }>Edit Profile</MenuItem>
											{
												this.props.type === "employee" ? 
													<MenuItem onClick={() => this.props.history.push("/dashboard/appliedjobs/view")}>Applied Jobs</MenuItem>
												: 
													<MenuItem onClick={() => this.props.history.push("/dashboard/job/view")}>Your Jobs</MenuItem>
											}
											<MenuItem divider />
											<MenuItem onClick={this.changepassword}>Change Password</MenuItem>
											<MenuItem onClick={this.logOut}>Log Out</MenuItem>
										</NavDropdown>
		              				</ul>
		              			) 
		              		: 
		              			(
		              				<ul className="sign-in">
			              				<li><i className="fa fa-user" /></li>
						                <li><Link className="fontnav" style={{fontSize:'17px'}} to="/login">Sign In</Link></li>
						                <li><i className="fa fa-register" /></li>
						                <li><Link className="fontnav" style={{fontSize:'17px'}} to="/register/all">Register</Link></li>
					                </ul>
	              				)
		              	}
		                
		            </div>
		            
		          </div>
		        </nav>
		       <div style={{marginBottom:'120px'}}></div>
		      </header>
		       </div>
		);
	}
}

export default connect(state => ({
	user: state.auth.user,
	type: localStorage.getItem("type")
}), dispatch => ({
	logOut: () => dispatch(user.logout())
}))(withRouter(Navbar));