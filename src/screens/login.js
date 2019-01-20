import React, {Component} from 'react';
import {Link, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as user from '../actions/user';
import { Form } from 'informed';
import Input from './custom_form/input';
import Submit from './custom_form/submit';
import '../css/404.css';
import {BASE_URL, FB_APP_ID} from '../config';

import FacebookLogin from 'react-facebook-login';

let imgstyle;

class Login extends Component{
    
    state = {};

    componentDidMount(){

        this.props.clear_error();
        document.body.className="sel_background";
    }

    signIn = (formstate) => {
       
        formstate.access_token = localStorage.getItem('access_token');
        this.props.login(formstate);   

    }

    render(){

        if(this.props.logged_in){
            if(this.props.user.type === "employee"){
                return <Redirect to="/profile" />
            }else if(this.props.user.type === "employer" ){
                return <Redirect to="/dashboard/profile" />
            }
            else if(this.props.user.type === "institution"){
                return <Redirect to="/institution/profile" />
            }
            
        }

        return (
            <div className="login-box">
            <div className="login-box-body">
                <div className="progress progress-xxs">
                <div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: "0%" }}>
                  <span className="sr-only">60% Complete (warning)</span>
                </div>
              </div>
            <div className="login-logo">
                <Link to="/">
                    <img style={imgstyle} src={require('../img/logo.png')} alt="ramrocv logo"/>
                </Link>
            </div>
            <h4 className="login-box-msg">Log in</h4>
            {this.props.error.message ? (<span className="text-red">{ this.props.error.message }</span>): null}
            <Form onSubmit={this.signIn}>
                <Input className="form-control" field="email" placeholder="Email" error={this.props.error.email}>
                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                </Input>
                <Input type="password" className="form-control" field="password" placeholder="Password" error={this.props.error.password}>
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                </Input>
                <div className="row">
                    <div className="col-xs-8">
                        <Link to="/register/all" className="text-center" style={{ display: "inline-block", padding: "5px 0" }}>Register a new membership</Link>
                    </div>
                    <div className="col-xs-4">
                        <Submit className="btn btn-primary btn-block btn-flat" text="Login" loading={ this.props.loading } />
                    </div>
                </div>
            </Form>

            <hr/>
                <div style={{textAlign: "center"}}>
                    <p style={{fontWeight: "bold"}}>OR</p>
                    <FacebookLogin 
                        appId={FB_APP_ID}
                        fields="name,email,picture.type(large)"
                        callback={this.props.signinfacebook}
                        icon="fa-facebook" />
                </div>
            </div>
            </div>
        );
    }    
}

const mapStateToProps=state=>{

    return{
        user: state.auth.user,
        error: state.auth.error,
        loading: state.progress.loading,
        logged_in: state.auth.logged_in
    }
}

const mapDispatchToProps = dispatch => {

    return {
        clear_error: () => dispatch({type: "CLEAR_ERROR"}),
        login: (data) => dispatch(user.login(data)),
        signinfacebook: data => dispatch(user.signinfacebook(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));


imgstyle = {"width":"130px"}