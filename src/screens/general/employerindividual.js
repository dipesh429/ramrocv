import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from './components/navbar';
import Footer from './components/footer';
import {Link, withRouter} from 'react-router-dom';

import LoadingOverlay from 'react-loading-overlay';

import GeneralJobs from './components/generaljobs';

import { rate } from '../../actions/employee';


import { get_employer,follow_company,checkiffollowed,unfollow_company } from '../../actions/general_actions/site';

import { get_reviews, get_rating, seemore, get_individual_reviews } from '../../actions/employer';

import {Tabs, Tab} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import * as moment from 'moment';

import Rating from 'react-rating';
import Submit from '../custom_form/submit';

import Pagination from '../partials/pagination';

import Dialog from '../partials/dialog';

class EmployerIndividual extends Component{
	
	componentDidMount(){
		let id = this.props.match.params.id;
		this.props.checkiffollowed(this.props.match.params.id,localStorage.getItem('id'))

		if(id){
			const emp_id = localStorage.getItem("employee_id");
			this.props.getdata(id);
			this.props.getrating(id);
			this.props.getreviews(id, emp_id || "no");
			emp_id && this.props.get_individual_reviews(id, emp_id || "no");
		}
		window.scrollTo(0,0);
	}

	componentDidUpdate(props){
		if(this.props.match.params.id !== props.match.params.id){
			const id = this.props.match.params.id;
			if(id){
				const emp_id = localStorage.getItem("employee_id");
				this.props.getdata(id);
				this.props.getrating(id);
				this.props.getreviews(id, emp_id || "no");
				emp_id && this.props.get_individual_reviews(id, emp_id || "no");
			}
		}
	}

	state = {
		see_more: true,
		act: false,
		rating: 0
	}

	ratingchanged = (val) => this.setState({ rating: val });

	changereview = evt => {
		this.review = evt.target.value;
	}

	savereview = () => {
		const review = {
			rating: this.state.rating * 2,
			review: this.review.length > 0 ? this.review : null,
			company_id: this.props.match.params.id,
			employee_id: localStorage.getItem("employee_id")
		};
		console.log(review);
		this.props.rate(review);
		this.review = "";
	}

	render(){
		let data;
		let a= this.props.data.DentalPlan
		let b= this.props.data.MedicalPlan
		let c= this.props.data.OnSiteDayCarePlan
		let d= this.props.data.RetirementPlan
		if(this.state.see_more){
			data = this.props.data.jobs && this.props.data.jobs.slice(0, 4);			
		}else{
			data = this.props.data.jobs;
		}
		return (
			<div>
				<Navbar />
					<div className="row">
						<div className="col-md-3">
							<GeneralJobs style={{marginTop: "10px", marginLeft: "10px"}}/>
						</div>
						<div className="col-md-9" style={{padding: 0}}>
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
							
							<div className="section job-ad-item no_hover_color" style={{display: "block", padding: 0}}>
								<div className="row">
									<div className="col-md-3">
										<img src={ this.props.data.image ? this.props.data.image : require('../../img/logo_square.png') }  style={{ border: "1px solid #f3f3f3", width: "auto" }} alt="company"/>
									</div>
									<div className="col-md-9">

										<div>
											<div className="title" style={{color: "#db303f", margin: 0}}>
												<h4 style={{lineHeight: "40px", margin: 0}}>
													{this.props.data.user ? this.props.data.user.name : ""} 
													&nbsp; 
													<small>
														&nbsp;
														{this.props.data.site_url ?
															<React.Fragment> 
																<i className="fa fa-link"></i> &nbsp; 
																<a href={this.props.data.site_url} target="_blank">{this.props.data.site_url}</a>
															</React.Fragment>
														:null}
													</small>
													<span className="label label-info pull-right">{this.props.data.ownership}</span>
												</h4>
											</div>

											<div style={{marginRight:'80px'}} >
														{
															localStorage.getItem("employee_id") ?  

															this.props.checkiffollow!='1' ?
															<a style={{cursor: "pointer"}} className="btn-lg btn-info pull-right custom" onClick={()=>this.props.followCompany(this.props.match.params.id,localStorage.getItem('id')) }>
																<i className="fa fa-plus"></i> &nbsp;
																
																Follow
															</a>

															:

															<a style={{cursor: "pointer"}} className="btn-lg btn-info pull-right custom" onClick={()=>this.props.unfollowCompany(this.props.match.params.id,localStorage.getItem('id')) }>
																<i className="fa fa-minus"></i> &nbsp;
																
																UnFollow
															</a> : null

														
													}
											</div>
											
											<Rating 
												start={0}
												stop={5}
												step={1}
												fractions={2}
												readonly
												placeholderRating={ this.props.rating.rating / 2 }
												placeholderSymbol="fa fa-star fa-2x text-yellow"
												emptySymbol="fa fa-star-o fa-2x"
											/> 
											<span>&nbsp; &nbsp; { this.props.rating.rating ? Number(this.props.rating.rating / 2).toFixed(2) : 0 } of 5 stars (out of { this.props.rating.count } ratings)</span> 
											&nbsp; &nbsp;
											{
												localStorage.getItem("employee_id") &&
													<a className={`btn btn-sm btn-danger`} disabled={this.props.rateloading} style={{margin: "10px 0"}} onClick={() => this.setState({act: true}) }>
														{ this.props.rateloading && <i className="fa fa-spin fa-refresh" style={{marginRight: "10px"}}></i> }
														Rate this company
													</a>
											}

											<br />
											{/* <span style={{display: "inline-block", paddingBottom: "10px", textAlign: "justify"}}>{ this.props.data.profile }</span> */}
										</div>
										<div className="ad-meta custom" style={{marginTop: "15px", display: "inline-block", width: "inherit", lineHeight: "30px"}}>
											<ul style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
												<li style={{margin: 0}}><i className="fa fa-map-marker" />{this.props.data.address ? this.props.data.address : "Not Available"} </li>
												<li style={{margin: 0}}><i className="fa fa-phone" />{this.props.data.phone ? this.props.data.phone : "Not Available"} </li>
												<li style={{margin: 0}}><i className="fa fa-globe" />{this.props.data.phone ? this.props.data.phone : "Not Available"} </li>
												<li style={{margin: 0}}><i className="fa fa-building" />{this.props.data.industry ? this.props.data.industry : "Not Available"} </li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						{
							this.props.data.profile && this.props.data.profile.length >= 0 &&
							<div className="row section" style={{padding: "10px", margin: 0}}>
								<h4 style={{color: "#db3038"}}>Company Description</h4>
								<div className="col-md-12" style={{padding: 0}} dangerouslySetInnerHTML={{ __html: this.props.data.profile }}/>				
							</div>
						}

						<div className="row section" style={{padding: "0", margin: 0}}>
							<div className="col-md-8 tab-manu no-float" style={{ padding: 0 }}>
								<Tabs defaultActiveKey={2} id="tab_company">
									<div className="clearfix" />
										
									{a && b && c && d && <Tab eventKey={1} title="Company Features">
										<ul style={{padding: "20px 5px", fontSize: "16px"}}>
											{a && <li> Dental Plan:  "Available"  </li>}
											{b && <li> Medical Plan:  "Available" </li>}
											{c && <li> On Site Day Care Plan:  "Available" </li>}
											{d && <li> Retirement Plan: "Available"   </li>}
										</ul>
									</Tab>}
									<Tab eventKey={2} title="Contact Information">
										<ul style={{padding: "20px 5px", fontSize: "16px"}}>
											<li>Contact Person: {this.props.data['contact-name'] ? this.props.data['contact-name'] : "Not Available"}</li>
											<li>Designation: {this.props.data['contact-designation'] ? this.props.data['contact-designation'] : "Not Available"}</li>
											<li>Phone Number: {this.props.data['contact-phone'] ? this.props.data['contact-phone'] : "Not Available"}</li>
										</ul>
									</Tab>
									{this.props.data.InstructionForApplicants && <Tab eventKey={3} title="Instruction for Applicants">
										<div dangerouslySetInnerHTML={{ __html: this.props.data.InstructionForApplicants }} style={{padding: "20px 5px", fontSize: "16px"}}/>
									</Tab>}
								</Tabs>
							</div>
							<div className="col-md-4">
								<h4 style={{color: "#db3038", fontFamily:"Oswald"}}>Company Jobs</h4>
								{
									data && 
									data.map((d,k) => (
										<div className="job-ad-item custom" style={{ padding: "5px 10px", position: "relative" }} key={k}>
			                  <Link to={`/job/view/${d.id}`}>
								<ReactTooltip place="bottom" effect="solid"/>
			                      <div style={{display: "flex", flexWrap: "wrap"}}>
			                          <div style={{flex: 1}}>
                                    <h5  data-tip={d.jobtitle.length>22 ? d.jobtitle : null } className="text-danger">{d.jobtitle.length > 22 ? d.jobtitle.substring(0, 22)+' ...' : d.jobtitle}</h5>
                                    <p  style={{color: "#555"}}>Expires in: { moment(d.deadline).fromNow() }</p>
                                </div>
			                      </div>
			                  </Link>
			              </div>
									))
								}
								{
									this.props.data.jobs && this.props.data.jobs.length > 5 &&
									<a className="btn btn-danger" onClick={() => this.setState({see_more: !this.state.see_more })}>See {this.state.see_more ? "More" : "Less" }</a>
								}
							</div>
						</div>
						<div className="row section" style={{padding: 0, margin: 0}}>
							
							<div className="col-md-12">
								{
									localStorage.getItem("employee_id") && 
									<React.Fragment>
										<h4 style={{color: "#db3038"}}> Your Review </h4>
										<Rating 
											start={0}
											stop={5}
											step={1}
											placeholderRating={this.props.individual_reviews.rating && this.props.individual_reviews.rating / 2}
											fractions={2}
											placeholderSymbol="fa fa-star text-danger"
											emptySymbol="fa fa-star-o text-default"
											// fullSymbol="fa fa-star text-danger"
											readonly /> 
										<p>{this.props.individual_reviews.review}</p>
									</React.Fragment>
								}

								<hr />
							
								<h4 style={{color: "#db3038"}}>Reviews from other users</h4>
								
								{
									this.props.employer_rateloading &&
									<div style={{position: "relative", height: "300px"}}>
										<div style={{position: "absolute", left: 0, right: 0, height: "100%", zIndex: 0 }}>
											<LoadingOverlay 
												active={true}
												style={{height: "100%"}}
												spinner
												color="#333"
												background='white' />
										</div>
									</div>
								}

								{
									!this.props.employer_rateloading && this.props.reviews.data.length === 0 &&
									<p>There are no reviews recorded.</p>
								}

								{ !this.props.employer_rateloading && this.props.reviews.data.map((d, k) => (
										<React.Fragment key={k}>
											<div style={{paddingRight: "10px", display: "flex", alignItems: "center"}}>
												<img src={ d.employee.photo || require('../../img/placeholder_user.jpg') } style={{height: "60px", width: "60px", borderRadius: "40px", margin: "10px", objectFit: "cover" }}/>
												<div>
													<h5 style={{color: "#db3038"}}>{ d.employee.user.name }</h5>
													<Rating 
														start={0}
														stop={5}
														step={1}
														placeholderRating={d.rating / 2}
														fractions={2}
														placeholderSymbol="fa fa-star text-danger"
														emptySymbol="fa fa-star-o text-default"
														// fullSymbol="fa fa-star text-danger"
														readonly
													/> 
													<span style={{color: "#999"}}> { d.rating / 2 } out of 5 </span>
													<br />
													<p>
														{ d.review }
													</p>
												</div>
											</div>
											<hr />
										</React.Fragment>
									)) 
								}

								{ 
									this.props.reviews.next_page_url != null && <div className="text-center" style={{marginBottom: "10px"}}>
										<a className="btn btn-primary" disabled={ this.props.review_seemoreloading } onClick={() => !this.props.review_seemoreloading && this.props.seemore(this.props.reviews.next_page_url)}>
											{	this.props.review_seemoreloading && <React.Fragment> 
													<i className="fa fa-spin fa-refresh"></i> &nbsp;
												</React.Fragment>
											}
											See More
										</a>
									</div>
								}

								{/* <Pagination url="/dashboard/job/view" className="pagniation pagination-sm no-margin pull-right" data={ this.props.jobs } /> */}

							</div>
						</div>					
					</div>
				</div>
				
				<Dialog
					title="Rating and Reviews"
					modalType="modal-success" 
					positiveText="Save"
					negativeText="Cancel"
					negativeCallback={ () => this.setState({ act: false }) }
					positiveCallback={ () => { this.setState({ act: false }); this.savereview() } }
					active={ this.state.act }>

					<p>Rating: </p>
					<Rating 
						start={0}
						stop={5}
						step={1}
						fractions={2}
						initialRating={this.state.rating}
						fullSymbol="fa fa-star fa-2x text-yellow"
						emptySymbol="fa fa-star-o fa-2x text-default"
						onChange={this.ratingchanged} /> 
					<span> &nbsp; { this.state.rating } out of 5</span>
					<br />
					<br />
					<p>Review</p>
					<textarea className="form-control" placeholder="Write your review of the company here." onChange={this.changereview}>
					</textarea>
				</Dialog>

				<Footer />
			</div>
		);
	}
}


export default connect(state => ({
	data: state.general.employer,
	loading: state.progress.employerloading,
	reviews: state.employer.reviews,
	rating: state.employer.rating,
	checkiffollow : state.general.checkfollower,
	rateloading: state.employee.rateloading,
	employer_rateloading: state.employer.rateloading,
	review_seemoreloading: state.employer.review_seemoreloading,
	individual_reviews: state.employer.individual_reviews
}), dispatch => ({
	rate: (data) => rate(dispatch, data),
	getdata: (id) => get_employer(dispatch, id),
	getreviews: (id, emp_id) => get_reviews(dispatch, id, emp_id),
	getrating: (id) => get_rating(dispatch, id),
	seemore: (next_page) => seemore(dispatch, next_page),
	get_individual_reviews: (id, emp_id) => get_individual_reviews(dispatch, id, emp_id),
	followCompany: (id,log) => follow_company(dispatch, id,log),
	unfollowCompany: (id,log) => unfollow_company(dispatch, id,log),
	checkiffollowed: (id,log)=> checkiffollowed (dispatch, id,log),
}))(withRouter(EmployerIndividual));

