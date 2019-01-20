import React, {Component} from 'react';
import Wrapper from '../partials/wrapper';
import {Box} from 'reactjs-admin-lte';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {Form, Option} from 'informed';
import Select from '../custom_form/select';
// import { get_employer,follow_company,follow_category,follow_industry,checkiffollowed,unfollow_company,unfollow_category,unfollow_industry } from '../../actions/general_actions/site';

import ReactFileReader from 'react-file-reader';

import { getindividual} from '../../actions/general_actions/job';
import {jobapply} from '../../actions/job';
import { getdegreeOffered, gettrainingOffered} from '../../actions/institution';

import Submit from '../custom_form/submit';
import ReactTooltip from 'react-tooltip'
import FollowCore from '../partials/followcore'
import Search from '../partials/search'

class Offer extends Component{


	state= {

		degreef:'initial',
		degreenf:'initial',
		trainingf:'initial',
		trainingnf:'initial',		
	}

	componentDidMount(){

		// this.props.getdegreeOffered()
		// this.props.gettrainingOffered()
	
	}

    render(){

        return (
            <Wrapper heading="Offered By You">

            	<div className="row">
            		<div className="col-xs-6">
						<Box className="box-success" loading={this.props.loading}>
							<Box.Header>
								<Box.Title>Degree</Box.Title>	
								{this.props.companyfollowing &&  this.props.companyfollowing.length>5 &&
				 <Search items={this.props.companyfollowing} placeholder="Search degree" searchh={(x)=>{this.setState({companyf:x})}} />
				}	
							</Box.Header>

				
						<Box.Body>

				

				 {this.props.companyfollowing && this.props.companyfollowing.length!=0 ?  

				 <FollowCore items={this.state.companyf=='initial' ? this.props.companyfollowing : this.state.companyf} method={(x)=>this.props.unfollowCompany(x,localStorage.getItem('id'))} text="Remove"/>
							: <p>No Degrees Offered</p>}

							 <hr/>

							 <h4>Other Degrees You want to Add</h4>

							 <br/>

				{this.props.companynotfollowing &&  this.props.companynotfollowing.length>5 &&
				 <Search items={this.props.companynotfollowing} placeholder="Search degree" searchh={(x)=>{this.setState({companynf:x})}} />
				}


		         {this.props.companynotfollowing && <FollowCore items={this.state.companynf=='initial' ? this.props.companynotfollowing : this.state.companynf} method={(x)=>this.props.followCompany(x,localStorage.getItem('id'))} text="Add"/>}
							 

					
							</Box.Body>
			            </Box>
            		</div>
            	
            		<div className="col-xs-6">
						<Box className="box-success" loading={this.props.loading}>
							<Box.Header>
								<Box.Title>Training</Box.Title>		
							</Box.Header>
							<Box.Body>

				{this.props.industryfollowing && this.props.industryfollowing.length>5 &&
						 <Search items={this.props.industryfollowing} placeholder="Search Training" searchh={(x)=>{this.setState({industryf:x})}} />
				}


							{this.props.industryfollowing && this.props.industryfollowing.length!=0 ? <FollowCore items={this.state.industryf=='initial' ? this.props.industryfollowing : this.state.industryf}  method={(x)=>this.props.unfollowIndustry(x,localStorage.getItem('id')) } text="Remove"/>
								: <p>No Training Offered</p>}

							 <hr/>

							 <h4>Other Training You want to Add</h4>

							 <br/>

							 		{this.props.industrynotfollowing && this.props.industrynotfollowing.length>5  && 
				 <Search items={this.props.industrynotfollowing} placeholder="Search Training" searchh={(x)=>{this.setState({industrynf:x})}} />
				}


							 {this.props.industrynotfollowing && <FollowCore items={this.state.industrynf=='initial' ? this.props.industrynotfollowing : this.state.industrynf} method={(x)=>this.props.followIndustry(x,localStorage.getItem('id')) } text="Add"/>}
	
							</Box.Body> 
							
			            </Box>
            		</div>
            	            		
            		
            	</div>
    
            </Wrapper>
        );
    }
}


export default 
connect(state => ({

	degree: state.institution.degree,
	tobedegree: state.institution.tobedegree,
	training: state.institution.training,
	tobetraining: state.institution.tobetraining,

	
}), dispatch => ({
	// getdegreeOffered : ()=> getdegreeOffered(dispatch),
	// gettrainingOffered : ()=> gettrainingOffered(dispatch),
	// addCompany: (id,log) => add_company(dispatch, id,log),
	// removeCompany: (id,log) =>	remove_company(dispatch, id,log),
	// addIndustry: (id,log) => add_industry(dispatch, id,log),
	// removeIndustry: (id,log) =>	remove_industry(dispatch, id,log),

}))(Offer)