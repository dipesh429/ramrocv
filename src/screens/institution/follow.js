import React, {Component} from 'react';
import Wrapper from '../partials/wrapper';
import {Box} from 'reactjs-admin-lte';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {Form, Option} from 'informed';
import Select from '../custom_form/select';
import { get_employer,follow_company,follow_category,follow_industry,checkiffollowed,unfollow_company,unfollow_category,unfollow_industry } from '../../actions/general_actions/site';

import ReactFileReader from 'react-file-reader';

import { getindividual} from '../../actions/general_actions/job';
import {jobapply} from '../../actions/job';
import { getcv, getfollowedCompany,getfollowedIndustry,getfollowedCategory } from '../../actions/employee';

import ViewIndividual from './cvmaker/printablecv';
import Submit from '../custom_form/submit';
import ReactTooltip from 'react-tooltip'
import FollowCore from '../partials/followcore'
import Search from '../partials/search'

class Follow extends Component{


	state= {

		companyf:'initial',
		companynf:'initial',
		categoryf:'initial',
		categorynf:'initial',
		industryf:'initial',
		industrynf:'initial'
	}


	componentDidMount(){

		this.props.getfollowedCompany()
		this.props.getfollowedIndustry()
		this.props.getfollowedCategory()
	}

    render(){

        return (
            <Wrapper heading="Followed By You">

            	<div className="row">
            		<div className="col-xs-4">
						<Box className="box-success" loading={this.props.loading}>
							<Box.Header>
								<Box.Title>Company</Box.Title>	
								{this.props.companyfollowing &&
				 <Search items={this.props.companyfollowing} placeholder="Search Company" searchh={(x)=>{this.setState({companyf:x})}} />
				}	
							</Box.Header>

				
						<Box.Body>

				

				 {this.props.companyfollowing && this.props.companyfollowing.length!=0 ?  

				 <FollowCore items={this.state.companyf=='initial' ? this.props.companyfollowing : this.state.companyf} method={(x)=>this.props.unfollowCompany(x,localStorage.getItem('id'))} text="UnFollow"/>
							: <p>No followed Company</p>}

							 <hr/>

							 <h4>Other Company You Wish to Follow</h4>

							 <br/>

				{this.props.companynotfollowing &&
				 <Search items={this.props.companynotfollowing} placeholder="Search Company" searchh={(x)=>{this.setState({companynf:x})}} />
				}


		         {this.props.companynotfollowing && <FollowCore items={this.state.companynf=='initial' ? this.props.companynotfollowing : this.state.companynf} method={(x)=>this.props.followCompany(x,localStorage.getItem('id'))} text="Follow"/>}
							 

					
							</Box.Body>
			            </Box>
            		</div>
            	
            		<div className="col-xs-4">
						<Box className="box-success" loading={this.props.loading}>
							<Box.Header>
								<Box.Title>Industry</Box.Title>		
							</Box.Header>
							<Box.Body>

				{this.props.industryfollowing &&
						 <Search items={this.props.industryfollowing} placeholder="Search Industry" searchh={(x)=>{this.setState({industryf:x})}} />
				}


							{this.props.industryfollowing && this.props.industryfollowing.length!=0 ? <FollowCore items={this.state.industryf=='initial' ? this.props.industryfollowing : this.state.industryf}  method={(x)=>this.props.unfollowIndustry(x,localStorage.getItem('id')) } text="UnFollow"/>
								: <p>No followed Industry</p>}

							 <hr/>

							 <h4>Other Industry You Wish to Follow</h4>

							 <br/>

							 		{this.props.industrynotfollowing &&
				 <Search items={this.props.industrynotfollowing} placeholder="Search Industry" searchh={(x)=>{this.setState({industrynf:x})}} />
				}


							 {this.props.industrynotfollowing && <FollowCore items={this.state.industrynf=='initial' ? this.props.industrynotfollowing : this.state.industrynf} method={(x)=>this.props.followIndustry(x,localStorage.getItem('id')) } text="Follow"/>}
	
							</Box.Body> 
							
			            </Box>
            		</div>
            	            		
            		<div className="col-xs-4">
						<Box className="box-success" loading={this.props.loading}>
							<Box.Header>
								<Box.Title>Job Category</Box.Title>		
							</Box.Header>
							<Box.Body>

									{this.props.categoryfollowing &&
				 <Search items={this.props.categoryfollowing} placeholder="Search Category" searchh={(x)=>{this.setState({categoryf:x})}} />
				}



							{this.props.categoryfollowing && this.props.categoryfollowing!=0 ? <FollowCore items={this.state.categoryf=='initial' ? this.props.categoryfollowing : this.state.categoryf} method={(x)=>this.props.unfollowCategory(x,localStorage.getItem('id')) } text="UnFollow"/>
								: <p>No followed Category</p>}

							 <hr/>

							 <h4>Other Category You Wish to Follow</h4>

							 <br/>

					{this.props.categorynotfollowing &&
				 <Search items={this.props.categorynotfollowing} placeholder="Search Category" searchh={(x)=>{this.setState({categorynf:x})}} />
				}


							{this.props.categorynotfollowing && <FollowCore items={this.state.categorynf=='initial' ? this.props.categorynotfollowing : this.state.categorynf} method={(x)=>this.props.followCategory(x,localStorage.getItem('id')) } text="Follow"/>}

									
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

	companyfollowing: state.employee.companyfollowing,
	companynotfollowing: state.employee.companynotfollowing,
	industryfollowing: state.employee.industryfollowing,
	industrynotfollowing: state.employee.industrynotfollowing,
	categoryfollowing: state.employee.categoryfollowing,
	categorynotfollowing: state.employee.categorynotfollowing,
	

	
}), dispatch => ({
	getfollowedCompany : ()=> getfollowedCompany(dispatch),
	getfollowedIndustry : ()=> getfollowedIndustry(dispatch),
	getfollowedCategory : ()=> getfollowedCategory(dispatch),
	followCompany: (id,log) => follow_company(dispatch, id,log),
	unfollowCompany: (id,log) => unfollow_company(dispatch, id,log),
	followIndustry: (id,log) => follow_industry(dispatch, id,log),
	unfollowIndustry: (id,log) => unfollow_industry(dispatch, id,log),
	followCategory: (id,log) => follow_category(dispatch, id,log),
	unfollowCategory: (id,log) => unfollow_category(dispatch, id,log),

}))(Follow)