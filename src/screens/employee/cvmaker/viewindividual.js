import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getcvid, getdata, printcv} from '../../../actions/employee';

import {Box} from 'reactjs-admin-lte';
import Wrapper from '../../partials/wrapper';

class ViewIndividual extends Component{
	componentDidMount(){
		if(this.props.match.params.id){
			this.props.getcv(this.props.match.params.id);
		}

        if(!this.props.got_data){
            this.props.getdata();
        }
    }

    printCv = () => {
    	
  //   	console.log(this.printable.innerHTML)
  //   	let html = this.printable.innerHTML;
		// this.props.printCv(html)

		this.props.printCv(this.props)

    }
	
	

	render(){
		return (
			<Wrapper heading="CV Maker">
				<div className="row" style={{color: "#333"}}>
					<div className="col-xs-12">
					 <Box className="box-success" loading={this.props.loading}>
					    <Box.Header>
					        <Box.Title>Your CV</Box.Title>
					        <Box.Tools>
					            <a className="btn btn-box-tool" onClick={this.printCv}>
					                <i className="fa fa-print" />&nbsp; Print
					            </a>
					        </Box.Tools>
					    </Box.Header>
					    <Box.Body>
					    	<div ref={a => {this.printable = a}}>
		                    		<div className="resume-content">
										<div className="profile section clearfix" style={{borderTop: "none"}}>
										  <div className="profile-logo pull-right">
										  	{this.props.employee.photo ? 
											    <img className="img-responsive" src={this.props.employee.photo} alt="User" style={{height: "200px", width: "auto"}}/>
										  		: null
										  	}
										  </div>
										  <div className="profile-info">
										    <h1>{this.props.user.name}</h1>
										    <address>
												<p>   
										      		{ this.props.employee.permanent && <span>Address: { this.props.employee.permanent } <br /></span>  } 
										      		{ this.props.employee.phone && <span>Phone: {this.props.employee.phone} <br /> </span>} 
										      		{ this.props.employee.email && <span>Email:<a href={`mailto:${this.props.user.email}`}> {this.props.user.email}</a> <br/></span> }
										    		{ this.props.employee.website && <span>Website: <a href={this.props.employee.website}>{this.props.employee.website}</a></span> }
												</p>
										    </address>
										  </div>					
										</div>
										
										{this.props.data.objective && 
											<div className="career-objective section" style={{borderTop: "none"}}>
											  <div className="icons">
											    <i className="fa fa-black-tie" aria-hidden="true" />
											  </div>   
											  <div className="career-info">
											    <h3>Career Objective</h3>
											    <p>{this.props.data.objective}</p>
											  </div>                                 
											</div>
										}

										{this.props.data.experience.length !== 0 && 
											<div className="work-history section" style={{borderTop: "none"}}>
												<div className="icons">
													<i className="fa fa-briefcase" aria-hidden="true" />
												</div>   
												<div className="work-info custom">
													<h3>Work History</h3>
													<ul>
														{this.props.data.experience.map((d,k) => (
															<li key={k}>
																<h4>{d.designation} @ {d.organization}<span>{d.daterange}</span></h4>
																<div dangerouslySetInnerHTML={{__html: d.responsibilities}} className="work-description"></div>
															</li>
														))}

													</ul>
												</div>                                 
											</div>
										}

										{this.props.data.education.length !== 0 &&

											<div className="educational-background section" style={{borderTop: "none"}}>
												<div className="icons">
													<i className="fa fa-graduation-cap" aria-hidden="true" />
												</div>	
												<div className="educational-info custom">
													<h3>Education Background</h3>
													<ul>
														{ this.props.data.education.map((d, k) => (

															<li key={k}>
																<h4>{d.level} @ {d.school}</h4>
																<ul>
																	<li>Year: <span>{d.daterange}</span> </li>
																	<li>Result: <span>{d.grades}</span></li>
																</ul>
															</li>

														))}
													</ul>
												</div>				
											</div>

										}
										
										<div className="personal-deatils section" style={{borderTop: "none"}}>
										  <div className="icons">
										    <i className="fa fa-user-secret" aria-hidden="true" />
										  </div>  
										  <div className="personal-info">
										    <h3>Personal Details</h3>
										    <ul className="address">
										      { this.props.user.name && <li><h5>Full Name </h5> <span>:</span>{this.props.user.name}</li>}
										      { this.props.employee.dob && <li><h5>Date of Birth </h5> <span>:</span>{this.props.employee.dob}</li> }
										      { this.props.employee.nationality && <li><h5>Nationality </h5> <span>:</span>{this.props.employee.nationality}</li> }
										      { this.props.employee.gender && <li><h5>Gender </h5> <span>:</span>{this.props.employee.gender}</li> }
										      { this.props.employee.blood && <li><h5>Blood Group</h5> <span>:</span>{this.props.employee.blood}</li> }
										      { this.props.employee.permanent && <li><h5>Permanent Address </h5> <span>:</span>{this.props.employee.permanent}</li> }
										      { this.props.employee.temporary && <li><h5>Temporary Address </h5> <span>:</span>{this.props.employee.temporary}</li> }
										    </ul>    	
										  </div>                               
										</div>
										
										{this.props.data.skill.length !== 0 && 
											<div className="language-proficiency section" style={{borderTop: "none"}}>
											  <div className="icons">
											    <i className="fa fa-language" aria-hidden="true" />
											  </div>
											  <div className="proficiency">
											    <h3>Interest and Skills</h3>
											    <ul>
													{
														this.props.data.skill.map((d,k) => (
															<li key={k}>
																<h4>{d.skill}</h4>
																<div dangerouslySetInnerHTML={{__html: d.description }} style={{color: "#333"}}/>
															</li>
														))
													}
											    </ul>
											  </div>
											</div>
										}

										{this.props.data.awards.length !== 0 && 
											<div className="awards section" style={{borderTop: "none"}}>
											  <div className="icons">
											    <i className="fa fa-star" aria-hidden="true" />
											  </div>
											  <div className="proficiency custom">
											    <h3>Awards and Recognitions</h3>
											    <ul>
													{
														this.props.data.awards.map((d,k) => (
															<li key={k}>
																<h5><b>{d.title}</b> @ {d.year} from {d.institution}</h5>
															</li>
														))
													}
											    </ul>
											  </div>
											</div>
										}

										{this.props.data.reference.length !== 0 &&
											<div className="reference section" style={{borderTop: "none"}}>
											  <div className="icons">
											    <i className="fa fa-link" aria-hidden="true" />
											  </div>
											  <div className="proficiency custom">
											    <h3>References</h3>
											    <ul>
													{
														this.props.data.reference.map((d,k) => (
															<li key={k}>
																<h5>{d.name} @ {d.position}</h5>
																<h5>Organization: {d.designation}</h5>
																<h5>Phone: {d.phone} </h5>
																<h5>Email: {d.email} </h5>
															</li>
														))
													}
											    </ul>
											  </div>
											</div>
										}
											

										<p className="pull-right">Created on: ramrocv.com</p>
		                    		</div>
	                    		</div>
					    </Box.Body>
					</Box>
				</div>
			</div>
		</Wrapper>
		);
	}
}

export default connect(state => ({
	user: state.auth.user,
	employee: state.employee,
	data: state.employee.cv,
	got_data: state.employee.got_data,
	loading: state.employee.cvloading || state.employee.otherloading
}), dispatch => ({
	getdata : () => getdata(dispatch),
	getcv: (id) => getcvid(dispatch, id),
	printCv: (html) => printcv(dispatch, html)
}))(ViewIndividual);