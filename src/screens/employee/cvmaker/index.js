import React, {Component} from 'react';
import {connect} from 'react-redux';

import Wrapper from '../../partials/wrapper';
import {Box} from 'reactjs-admin-lte';
import {Form} from 'informed';

import TextArea from '../../custom_form/textarea';

import {getdata, getcvid, postcv} from '../../../actions/employee';

import ExperienceComponent from './experiencecomponent';
import EducationComponent from './educationcomponent';
import SkillComponent from './skillcomponent';
import AwardsComponent from './awardscomponent';
import ReferenceComponent from './referencescomponent';
import ProjectsComponent from './projectscomponent';

import Editor from '../../custom_form/ckeditor';

import {Tabs, Tab} from 'react-bootstrap'

import Dialog from '../../partials/dialog';
import AddRemoveWrapper from './addremovewrapper'

import PersonalDetails from '../profile/personaldetails';
import ProfilePicture from '../profile/profile_picture';

class CVMaker extends Component{

	state = {
		activate: false
	}

	componentDidMount(){
		if(this.props.match.params.id){
			this.props.getcv(this.props.match.params.id);
		}
        if(!this.props.got_data){
            this.props.getdata();
        }
    }

	render(){
		return (
			<Wrapper heading="CV Maker">
				<div className="row">
					<div className="col-md-8">
						<PersonalDetails />
					</div>
					<div className="col-md-4">
						<ProfilePicture />
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
					 {/* <Box className="box-success" loading={this.props.loading}>
		                    <Box.Header>
		                        <Box.Title>Your CV 
									<button className="btn btn-primary pull-right btn-sm" style={{marginLeft: "20px", marginTop: "-5px"}} onClick={() => this.setState({ activate: true })}>Edit Your Profile</button>
								</Box.Title>
		                    </Box.Header>
		                    <Box.Body>
		                    	<div className="row" >
		                    		<div className="col-md-7">
		                    			<ul className="nav nav-pills nav-stacked">
			                    			<li><a><h3 className="text-blue">{this.props.user.name}</h3></a></li>
		                    				<li><a>Location: {this.props.employee.address ? this.props.employee.address : "Not Available" }</a></li>
		                    				<li><a>Phone: {this.props.employee.phone}</a></li>
		                    				<li><a>Email: {this.props.user.email}</a></li>
		                    				<li><a>Website: {this.props.employee.website}</a></li>
		                    			</ul>
		                    		</div>
		                    		<div className="col-md-5 text-center">
		                    			{ this.props.employee.photo ?
		                    				<img className="img-responsive" src={this.props.employee.photo} alt="user" style={{display: "inline-block", width: "60%", padding: "30px 10px"}}/>
		                    			: null
		                    			}
		                    		</div>
		                    	</div>
		                    	<hr/>
		                    	<div className="row">
		                    		<div className="col-md-12">
		                    			<h4 className="text-blue">PERSONAL DATA</h4>
		                    			<ul className="nav nav-pills nav-stacked">
		                    				<li><a>Date of Birth: {this.props.employee.dob}</a></li>
		                    				<li><a>Nationality: {this.props.employee.nationality}</a></li>
		                    				<li><a>Marital Status: {this.props.employee.marital}</a></li>
		                    				<li><a>Gender: {this.props.employee.gender}</a></li>
		                    			</ul>
		                    		</div>
		                    	</div>

		                    </Box.Body>
			            </Box> */}

			            

						<Box className="box-success" loading={this.props.loading}>
							<Form onSubmit={a => this.props.postcv(a, this.props.match.params.id ) }>
								<Box.Body>
									<Tabs defaultActiveKey={6} id="uncontrolled_tab">
										<Tab eventKey={6} title="Objective">
			                    			<TextArea value={this.props.data.objective} className="form-control" field="objective"></TextArea>
										</Tab>
										<Tab eventKey={1} title="Work Experience">
											<AddRemoveWrapper field="experience" internalComponent={ExperienceComponent} data={this.props.data.experience ? this.props.data.experience : []} />
										</Tab>
										<Tab eventKey={2} title="Academic">
										  	<AddRemoveWrapper field="education" internalComponent={EducationComponent} data={this.props.data.education ? this.props.data.education : []} />
										</Tab>
										<Tab eventKey={3} title="InterestAndSkills">
											<AddRemoveWrapper field="skills" internalComponent={SkillComponent} data={this.props.data.skill? this.props.data.skill : []} />
										</Tab>
										<Tab eventKey={4} title="Awards and Recognition">
					                    	<AddRemoveWrapper field="awards" internalComponent={AwardsComponent} data={this.props.data.awards? this.props.data.awards : []} />
										</Tab>
										<Tab eventKey={5} title="References">
											<AddRemoveWrapper field="reference" internalComponent={ReferenceComponent} data={this.props.data.reference ? this.props.data.reference: []} />
										</Tab>
										<Tab eventKey={7} title="Academic Projects">
											<AddRemoveWrapper field="projects" internalComponent={ProjectsComponent} data={this.props.data.project ? this.props.data.project : []} />
										</Tab>
									</Tabs>
								</Box.Body>
								<Box.Footer>
	                    			<button type="submit" className="btn btn-info pull-right"><i className="fa fa-save" /> &nbsp; Save</button>
								</Box.Footer>
							</Form>
						</Box>

					</div>
				</div>

				<Dialog 
					active={ this.state.activate }
					modalType="modal-default"
					title="Edit your profile"
					positiveButtonClassName="btn-primary"
					negativeButtonClassName="btn-default"
					positiveCallback={ () => { this.setState({ activate: false }) } }
					negativeCallback={ () => this.setState({ activate: false }) }
					>
					<PersonalDetails notboxed edit/>
				</Dialog>
			</Wrapper>
		)
	}
}

export default connect(state => ({
	user: state.auth.user,
	data: state.employee.cv,
    got_data: state.employee.got_data,
    employee: state.employee,
    loading: state.employee.otherloading || state.employee.cvloading
}), dispatch => ({
	getdata : (id) => getdata(dispatch,id),
	getcv: (id) => getcvid(dispatch, id),
	postcv: (data, id ) => postcv(dispatch, data, id )
}))(CVMaker);
