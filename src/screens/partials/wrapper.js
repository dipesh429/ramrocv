import React, { Component } from 'react';
import { Content } from 'reactjs-admin-lte';
import {connect} from 'react-redux';
import Master from './master';
import {Alert} from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import * as user from '../../actions/user';

const jQuery = window.jQuery;

class Wrapper extends Component{

    sendmail = () => {
        this.props.resendmail(this.props.id);
    };

    componentDidMount(){
        jQuery('body').layout('fix'); // fix the half showing layout 
    };


    render(){
        jQuery('body').layout('fix'); // fix the half showing layout 
        document.title = `${this.props.heading} | RamroCV.com Portal`
        return (
            <Master>
                <Content>
                    {
                        !this.props.verified && 
                        <Alert bsStyle="warning">
                            <h4>Please verify your email address</h4>
                            <p>We have sent you confirmation mail in your email account. Login and click the link to verify your email.</p>
                            <p>If you have not received any mail then <a onClick={this.sendmail}>click here</a> to resend email.</p> 
                        </Alert>
                    }

                    <Content.Header>
                        <h1>{this.props.heading}</h1>
                    </Content.Header>

                    <Content.Body> 
                        {this.props.children}
                    </Content.Body>

                    <div className="loading-overlay" style={{display: (this.props.mailloading) ? "block" : "none" }}>
                        <LoadingOverlay 
                            active={this.props.mailloading}
                            style={{ height: "100vh" }}
                            spinner
                            text='Sending Mail'
                            background='rgba(0,0,0,0.6)' />
                    </div>

                </Content>
            </Master>    
        )
    }
}

export default connect(state => ({
    id: state.auth.user.id,
    mailloading: state.progress.mailloading,
    verified: state.auth.user.verified === "1"
}), dispatch => ({
    resendmail: (data) => user.resendmail(dispatch, data),
}))(Wrapper)