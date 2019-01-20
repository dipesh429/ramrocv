import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from './components/navbar';
import Search from './components/search';
import Footer from './components/footer';
import {Link, withRouter} from 'react-router-dom';
import GeneralJobs from './components/generaljobs';

import { getindividual } from '../../actions/general_actions/job';
import LoadingOverlay from 'react-loading-overlay';


class Jobs extends Component{
	
	componentDidMount(){
		let id = this.props.match.params.id;
		if(id){
			this.props.getdata(id);
		}
		window.scrollTo(0,0);
	}

	componentDidUpdate(props){

		if(props.match.url!= this.props.match.url){
			let id = this.props.match.params.id;
			if(id){
			this.props.getdata(id);
		}
		}
		
	}

	jobapply = () => {
		let id = this.props.match.params.id;
		if(localStorage.getItem("employee_id")){
			this.props.history.push("/dashboard/job/apply/"+id);
		}else{
			this.props.history.push("/login")
		}
	}

	render(){
		return (
			<div>
				<Navbar title="RamroCV Job"/>
					
					<div className="row">

						<div className="col-md-3">
							<GeneralJobs style={{marginTop: "10px", marginLeft: "10px"}}/>
						</div>
						<div className="col-md-9" style={{position: "relative"}}>
							{
								this.props.loading &&
								<div style={{position: "absolute", left: 0, right: 0, height: "100%" }}>
								 <LoadingOverlay 
			                        active={true}
			                        style={{height: "100%"}}
			                        spinner
			                        color="#333"
			                        text='Loading'
			                        background='white' />
								</div>
							}
							
							<div className="section job-ad-item" style={{display: "block", marginTop: "10px", marginRight: "10px"}}>
								<div className="row">
									<div className="col-md-2">
										<img src={ this.props.data.company.image ? this.props.data.company.image : require('../../img/logo_square.png') }  style={{ border: "1px solid #f3f3f3", width: "auto" }} alt="company"/>
									</div>
									<div className="col-md-10">
										<span>
											<a className="title" style={{color: "#db303f"}}><h4 style={{lineHeight: "40px"}}>{this.props.data.jobtitle}</h4></a>
											<Link to={`/company/view/${this.props.data.company.id}`} className="title" style={{color: "#999"}}><h5>{this.props.data.company.user.name}</h5></Link>
										</span>
										<div className="ad-meta custom">
											<ul>
												<li><i className="fa fa-map-marker" />{this.props.data.company.address ? this.props.data.company.address : "Not Available"} </li>
												<li><i className="fa fa-clock-o" />{this.props.data.type}</li>
												<li><i className="fa fa-hourglass-start" />{this.props.data.deadline}</li>
											</ul>
										</div>
									</div>
								</div>

								<div className="row" style={{margin: "20px 0"}}>
									<div className="col-md-12 custom">
										{
											localStorage.getItem("employer_id") ? null : 
											<a style={{cursor: "pointer"}} className="btn-lg btn-info pull-right custom" onClick={this.jobapply }>
												<i className="fa fa-briefcase"></i> &nbsp;
												Apply for this job
											</a>

										}
									</div>
								</div>
				
							</div>


							<div className="row job-details-info">
								<div className="col-md-8">
									<div className="section job-description">
										<div className="description-info">
											<h1 style={{color: "#00c0ef"}}>Description</h1>
											<div dangerouslySetInnerHTML={{ __html: this.props.data.Description }} style={{fontSize: "16px", lineHeight: "30px"}}/>
											<h1 style={{color: "#00c0ef"}}>Qualification</h1>
											<div dangerouslySetInnerHTML={{ __html: this.props.data.Qualification }} style={{fontSize: "16px", lineHeight: "30px"}}/>
											{
												this.props.data.company.InstructionForApplicants ? 
												<React.Fragment>
													<h1 style={{color: "#00c0ef"}}>InstructionForApplicants</h1>
													<div dangerouslySetInnerHTML={{ __html: this.props.data.company.InstructionForApplicants }} style={{fontSize: "16px", lineHeight: "30px"}}/>
												</React.Fragment>
												:
												null
						
											}
										</div>
									</div>
								</div>
								<div className="col-md-4">
									<div className="custom section company-info"  style={{marginRight: "10px"}}>
										<h1 style={{color: "#00c0ef"}}>Contact Information</h1>
										<ul>
											<li>Contact Person: {this.props.data.company['contact-name'] ? this.props.data.company['contact-name'] : "Not Available"}</li>
											<li>Designation: {this.props.data.company['contact-designation'] ? this.props.data.company['contact-designation'] : "Not Available"}</li>
											<li>Phone Number: {this.props.data.company['contact-phone'] ? this.props.data.company['contact-phone'] : "Not Available"}</li>
										</ul>
									</div>
									<div className="custom section company-info" style={{marginRight: "10px"}}>
										<h1 style={{color: "#00c0ef"}}>Company Information</h1>
										<ul>
											<li>Company Name: {this.props.data.company.user.name}</li>
											<li>Address: {this.props.data.company.address}</li>
											<li>Phone Number: {this.props.data.company.phone}</li>
											<li>Website: {this.props.data.company.site_url}</li>
											<li>Email: {this.props.data.company.user.email}</li>
										</ul>
									</div>
								</div>
							</div>

						</div>
					</div>
				<Footer />
			</div>
		);
	}
}


export default connect(state => ({
	data: state.general.individualjob,
	loading: state.progress.jobindividual
}), dispatch => ({
	getdata: (id) => getindividual(dispatch, id)
}))(withRouter(Jobs));