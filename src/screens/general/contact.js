
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from './components/navbar';
import Footer from './components/footer';

import {get_contact, send_feedbacks} from '../../actions/general_actions/site';

import LoadingOverlay from 'react-loading-overlay';
import {Form, Text, TextArea} from 'informed';
import Input from '../custom_form/input';
import Submit from '../custom_form/submit';

import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

class About extends Component{
	
	componentDidMount(){
		this.props.get_contact();
	}

	rendercontact = () => {
		return (
				<div className="row">
					<div className="col-md-8">
						<Form onSubmit={ data => this.props.send(data) }>
							<Input field="name" placeholder="Enter Full Name" label={{id: "name", heading: "Your Name"}} className="form-control"/>
							<Input field="subject" placeholder="Enter Subject" label={{id: "subject", heading: "Subject"}} className="form-control"/>
							<div className="form-group">
								<label>Email</label>
								<div className="input-group">
									<span className="input-group-addon"><span className="glyphicon glyphicon-envelope"></span>
									</span>
									<Text field="email" className="form-control" id="email" placeholder="Enter email" type="email" />
								</div>	
							</div>
							<div className="form-group">
								<label>Body</label>
								<TextArea field="body" rows={5} className="form-control"/>					
							</div>
							<Submit text="Send" loading={this.props.loading} className="btn btn-danger pull-right"/>
						</Form>
					</div>
					<div className="col-md-4">
						<legend>
							<span className="glyphicon glyphicon-globe"></span>
							&nbsp; Contact Information
						</legend>
						<div dangerouslySetInnerHTML={{__html: this.props.contact.contact }} ref={this.anchorblank}/>
					</div>
				</div>
		)
	}

	anchorblank = (ref) => {
		if(ref){
			const anchors = ref.querySelectorAll('a');
			for(let anchor of anchors){
				anchor.target = "_blank";
			}
		}
	}


	render(){
		const MapComponent = withScriptjs(withGoogleMap(() => 
			<GoogleMap
				defaultZoom={8}
				defaultCenter={{ lat: Number(this.props.contact.latitude), lng: Number(this.props.contact.longitude) }}
				>
				<Marker position={{ lat: Number(this.props.contact.latitude), lng: Number(this.props.contact.longitude) }} />
			</GoogleMap> ))
		
		return (
			<div>
				
				<div className="banner-job" style={{background: "url(https://picsum.photos/600/300?random)", backgroundSize: "cover" }}>
					<div className="banner-overlay" />
					<div className="container">
						<div className="breadcrumb-section" style={{padding: "10px 0"}}>

						  <ol className="breadcrumb">
						    <li><a href="index.html">Home</a></li>
						    <li>Contact Us</li>
						  </ol>						
						
						</div>
						<h2>Contact Us</h2>
					</div>
				</div>
				<div className="container">
					<div className="custom section">
						{ this.props.contact ? 
						
							this.rendercontact()

						  :  <LoadingOverlay 
		                        active={true}
		                        style={{height: "200px"}}
		                        spinner
		                        color="#333"
		                        text='Loading'
		                        background='white' />
						}
					</div>
				</div>

				{/*<div style={{height: "400px"}}>
					<MapComponent 
						googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDEyofqgY8wQ2VtnY1k4BBBcM51OEePrAk"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: `400px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
						/>
				</div>
*/}
				
			</div>
		);
	}
}


export default connect(state => ({
	loading: state.general.loading,
	contact: state.general.contact
}),dispatch => ({
	get_contact: () => get_contact(dispatch),
	send: (data) => send_feedbacks(dispatch, data)
}) )(About);