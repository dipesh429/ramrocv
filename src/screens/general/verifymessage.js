import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from './components/navbar';
import Search from './components/search';
import Footer from './components/footer';
import {Link} from 'react-router-dom';

import * as user from '../../actions/user';

import LoadingOverlay from 'react-loading-overlay';

class VerifyMessage extends Component{

	resendmail = () => {
		this.props.resendmail(this.props.id)
	}

	componentDidMount(){
        document.body.className = "";
	}

	render(){
		let r = (
			<div className="section">
				<h4><span style={{color: "#db3038"}}>Congratulations!</span>, you have successfully created your account.</h4>
				<h5>A verification link has been sent to your email account. If you have not received any mail from us <a onClick={this.resendmail} style={{ cursor: "pointer" }}>click here</a> to resend mail.</h5>
			</div>
		);
		if(this.props.verified){
			r = (
				<div className="section">
					<h4><span style={{color: "#db3038"}}>Congratulations!</span>, you have verified your account.</h4>
					<h5>Please <Link to="/login">log in</Link> to continue</h5>
				</div>
			)
		}
		return (
			<div>
				<Navbar />
				<div className="container" style={{marginTop: "30px"}}>
				{r}
				</div>

				<div className="loading-overlay" style={{display: (this.props.mailloading) ? "block" : "none" }}>
                    <LoadingOverlay 
                        active={this.props.mailloading}
                        style={{ height: "100vh" }}
                        spinner
                        text='Sending Mail'
                        background='rgba(0,0,0,0.6)' />
				</div>
				<Footer />
			</div>
		);
	}
}


export default connect(state => ({
	id: state.auth.user.id,
    mailloading: state.progress.mailloading
}), dispatch => ({
    resendmail: (data) => user.resendmail(dispatch, data),
}))(VerifyMessage);