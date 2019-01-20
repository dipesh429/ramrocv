import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Form, Option, Checkbox } from 'informed';
import * as user from '../actions/user';
import Modal from './partials/modal';
import Select from './custom_form/select';
import Input from './custom_form/input';
import Submit from './custom_form/submit';
import LoadingOverlay from 'react-loading-overlay';
import TagInput from './custom_form/taginput';
import CreatableSelect from 'react-select/lib/Creatable';
import degree from '../degree'
import training from '../training'
import category from '../category'
import industry from '../industry'

const INDUSTRY = require('../industries.json');



let imgstyle;

class Register extends Component{
    constructor(){
        super();
        this.state = {
            user: {},
            modalActivate: false,
            employer: false,
            
        }
        this.select = null;
    }
    
    componentDidMount(){
        this.props.clear_error();
        document.body.className = "sel_background";
    }

    componentDidUpdate(props){
        if(this.props.user.id !== props.user.id){
            if(this.props.user.id !== -1){
                this.setState({registered: true});
            }
        }
    }

    formsubmit = (formstate) => {

        // console.log('done')
        console.log(formstate)
        this.setState({user: formstate});
        
        formstate.access_token = localStorage.getItem('access_token');
        if(this.state.terms){
            this.props.register(formstate);
        }

    }

    
    change = (d) => {
        this.setState({terms: d.values.terms})
        if(d.values.type === "employer"){
            this.setState({employer: true})
        }else{
            this.setState({employer: false})
        }
         if(d.values.type === "institution"){

            this.setState({institution: true})
        }else{
            this.setState({institution: false})
        }
    }

    render(){
        if(this.state.registered){
            return <Redirect to="/register/verify" />
        }
        return (
            <div className="register-box" style={{marginTop: 0, width: "370px"}}>
           
            <div className="register-box-body">
                <div className="progress progress-xxs">
                    <div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow={this.props.register_progress} aria-valuemin="0" aria-valuemax="100" style={{ width: this.props.register_progress+"%" }}>
                    <span className="sr-only">{this.props.register_progress}% Complete (warning)</span>
                    </div>
                </div>
                <div className="register-logo">
                    <Link to="/">
                        <img style={imgstyle} src={require('../img/logo.png')} alt="ramrocv logo"/>
                    </Link>
                </div>
                <h4 className="login-box-msg">Register a new membership</h4>
                <Form onSubmit={this.formsubmit} onChange={this.change}>
                    <hr/>
                        <Select placeholder="Select Registration Type" value={this.props.match.params.type ? this.props.match.params.type : null } field="type" className="form-control" id="reg_type" error={this.props.error.type} >
                            <Option value="employee">Job Seeker</Option>
                            <Option value="employer">Employer</Option>
                            <Option value="institution">Associated Institution</Option>
                        </Select>
                    <hr />
                    <Input className="form-control" field="name" placeholder={ this.state.employer ? "Company Name" : "Full Name" } error={this.props.error.name}>
                        <span className="glyphicon glyphicon-user form-control-feedback"></span>
                    </Input>
                    
                    <Input className="form-control" field="email" placeholder="Email" error={this.props.error.email}>
                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </Input>
                    
                    <Input type="password" className="form-control" field="password" placeholder="Password" error={this.props.error.password}>
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </Input>

                    <Input type="password" className="form-control" field="password_confirmation" placeholder="Retype Password">
                        <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
                    </Input>
                    {this.state.employer && 
                    <div>
                    <Select
                        creatable
                        isClearable
                        field="industry"
                        placeholder='Select Industry you belong'
                        options={industry}
                    />    
                    <br/></div>
                }
                                            
                     {this.state.institution && 
                        <div>
                        <Select
                            isMulti
                            creatable
                            isClearable
                            field="degree"
                            placeholder=' Select degree you Offer'
                            options={degree}
                          />    
                          <br/>

                          <Select
                            creatable
                            isClearable
                            field="industry"
                            placeholder='Select Industry you belong'
                            options={industry}
                    />    
                            <br/>

                          <Select
                            isMulti
                            creatable
                            isClearable
                            field="training"
                            placeholder=' Select Training You Offer'

                            // onInputChange={this.handleInputChange}
                            options={training}
                          />  
                          <br/>  

                          <Select
                            isMulti
                            creatable
                            isClearable
                            field="category"
                            placeholder=' Select Job Category You want to follow'

                            // onInputChange={this.handleInputChange}
                            options={category}
                          />   <br/> </div>                   
                    }
                   
                    <div className={`row form-group has-feedback ${this.props.error.terms ? "has-error" : ""}`} style={{marginBottom: "10px"}}>
                        <div className="col-md-1">
                            <Checkbox field="terms" id="check"/>
                        </div>
                        <div className="col-md-11">
                            Check here to indicate that you have read and agree to the <Link to="/terms" target="_blank">Terms and Conditions of Use</Link>.
                        </div>
                        <span className="help-block">{ (this.props.error.terms) ? this.props.error.terms : "" }</span>
                    </div>
                   
                    <div className="row">
                        <div className="col-xs-7">
                            <Link to="/login" className="text-center" style={{display: "inline-block", padding: "10px 0", fontSize: "13px"}}>I already have a membership</Link>
                        </div>
                        <div className="col-xs-5">
                            <Submit disabled={!this.state.terms} className="btn btn-primary btn-block btn-flat" text="Register" loading={ this.props.loading } />
                        </div>
                    </div>
                    <br />
                </Form>
            </div>
                
            </div>
        );
    }
}

export default connect(state => ({
    user: state.auth.user,
    error: state.auth.error,
    register_progress : (state.progress) ? state.progress.percentage : 0,
    loading: state.progress.loading,
    mailloading: state.progress.mailloading
}), dispatch => ({
    clear_error: () => dispatch({type: "CLEAR_ERROR"}),
    register : (data) => user.register(dispatch, data),
    resendmail: (data) => user.resendmail(dispatch, data),
}))(Register);

imgstyle = {"width":"130px","margin":"15px auto"}
