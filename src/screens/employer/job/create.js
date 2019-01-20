import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import {Form, Option} from 'informed';
import {Redirect} from 'react-router-dom';

import Input from '../../custom_form/input';
import DatePicker from '../../custom_form/datepicker';
import Select from '../../custom_form/select';
import Submit from '../../custom_form/submit';
import * as job from '../../../actions/job';
import Editor from '../../custom_form/ckeditor';
import TextArea from '../../custom_form/textarea';
import TagInput from '../../custom_form/taginput';
import Wrapper from '../../partials/wrapper';
import Slider from '../../partials/slider';

import CATEGORIES from '../../../categories.json';
import LOCATION from '../../../location.json';

class Create extends Component{

     state = {
        value: { min: 50000, max: 90000 },
        values:15000,
        checked:'',
        range:false,
        exact:false,
        success: false 
    }

       static getDerivedStateFromProps(props, state){

        console.log(props)

        if(Object.keys(props.prevJob).length!=0 && props.turn==1){
                props.nullturn()
                try{
                    const json = JSON.parse(props.prevJob.salary)
                    return { value: json }
                }catch(e){
                    console.log(e);
                }

            }

        else return null

    }
    
    componentDidMount(){
        this.props.clear_error_data();
        this.setState({ success: false })
        if(this.props.match.path === "/dashboard/job/edit/:id"){
            this.setState({ edit: true });
            this.props.getjob(this.props.match.params.id);
        }else{
            this.setState({ edit: null });
            this.props.clearjob();
        }
    }

    createoreditjob = (data) => {

         if(this.state.checked == 'SalaryRange'){
            data.salary = JSON.stringify(this.state.value)
        }

        else if(this.state.checked=='exactSalary'){
            data.salary = this.state.values
        }

        else{
            data.salary = 'negotiable'
        }

        if(this.state.edit){
            this.editjob(data)
        }else{
            if(this.props.user.company.id){
                data.company_id = this.props.user.company.id;
                this.props.create(data);
            }
        }
    }
    

    componentDidUpdate(props){
        if((this.props.success !== props.success)){
            this.setState({success: this.props.success })
        }

        if(this.props.match.path !== props.match.path){
            if(this.props.match.path === "/dashboard/job/edit/:id"){
                this.setState({ edit: true });
                this.props.getjob(this.props.match.params.id);
            }else{
                this.setState({ edit: null });
                this.props.clearjob();
            }       
        }
    }

    editjob = (data) => {
        let id = this.props.match.params.id; 
        if(this.props.user.company.id && id){
            data.jobid = id;
            this.props.editjob(data);
        }
    }

    render(){
        if(this.state.success) { return <Redirect to="/dashboard/job/view" />}
        const {
            jobtitle, type, location, Description, Qualification, deadline, industry, number
        } = this.props.prevJob;
        return (
            <Wrapper heading={ this.state.edit ? "Edit Job":"Create Jobs" } >
                <Form onSubmit={ this.createoreditjob } onChange={ formState => this.setState({ checked: formState.values.checked })}>
                    <div className="row">
                        <div className="col-md-8">
                            <Box className="box-primary" loading={this.props.loading}>
                                <Box.Header>
                                    <Box.Title>{this.state.edit ? "Edit":"Create"} Job</Box.Title>
                                </Box.Header>
                                <Box.Body>
                                    <Input value={ jobtitle ? jobtitle : null  } error={this.props.error.jobtitle} className="form-control" field="jobtitle" placeholder="Job Title" label={{id: "jobtitle", heading: "Job Title"}} />
                                    <Editor value={Description ? Description : " "} error={this.props.error.Description} field="Description" label="Description" height="150px" fieldValue="namaste"/>
                                    <Editor value={Qualification ? Qualification : " "} error={this.props.error.Qualification} field="Qualification" label="Qualification" height="150px" />
                                    
                                     <br/>

                                    <br/>



                                    <DatePicker current value={deadline? deadline: null} error={this.props.error.deadline} id="datepicker" field="deadline" placeholder="Deadline" label="Deadline" />                                    
                                </Box.Body>
                                <Box.Footer>
                                    <Submit className="btn btn-info" text={this.state.edit ? "Edit": "Create" } />                              
                                </Box.Footer>
                            </Box>
                        </div>
                        
                        {/* end col-md-8 */}
                        <div className="col-md-4">
                            <Box className="box-success" loading={this.props.loading}>
                                <Box.Header>
                                    <Box.Title>Jobs Information</Box.Title>
                                </Box.Header>
                                <Box.Body>
                                  <Select value={ location || null } error={this.props.error.location} id="location" field="location" label="Location" className="form-control" placeholder="Enter Job Location">
                                        {
                                            LOCATION.map((d,k) => <Option value={d} key={k}>{d}</Option>)
                                        }
                                    </Select>

                                    <Select value={ type ? type : null } error={this.props.error.type} id="type" field="type" label="Type" className="form-control" placeholder="Enter Job Type">
                                        <Option value="Contract">Contract</Option>
                                        <Option value="Full Time">Fulltime</Option>
                                        <Option value="Part Time">Part Time</Option>
                                        <Option value="Intern/Trainees">Intern/Trainees</Option>
                                        <Option value="Full Time/Contract">Full Time/Contract</Option>
                                        <Option value="Part Time/Contract">Part Time/Contract</Option>
                                    </Select>
                                    
                                    <Input value={ number || null  } error={this.props.error.number} className="form-control" field="number" placeholder="Required Candidates" label={{id: "number", heading: "Required Candidates"}} type="number" />

                                    <Select value={ industry || null } error={this.props.error.industry} id="industry" field="industry" label="Category" className="form-control" placeholder="Enter Job Category">
                                        {
                                            CATEGORIES.map((d,k) => <Option value={d} key={k}>{d}</Option>)
                                        }
                                    </Select>

                                    <Select id="checked" value={this.state.checked} placeholder="Select Salary Type" field="checked" label="Expected Salary" className="form-control" placeholder="Select Salary Type">
                                        <Option value="SalaryRange">SalaryRange</Option>
                                        <Option value="exactSalary">exactSalary</Option>
                                        <Option value="negotiable">negotiable</Option>
                                    </Select> 
                                    
                                    {(this.state.checked=='SalaryRange')? 

                                        
                                        <Slider min={5000} max={150000} which='range' currentState={this.state.value} changeState={(value)=>this.setState({ value })} /> 

                                    : null}

                                    {(this.state.checked=='exactSalary')? 

                                        <Slider min={5000} max={150000} which='exact' currentState={this.state.values} changeState={(value)=>this.setState({ values:value })} /> 

                                    : null}

                                      
                                </Box.Body>
                            </Box>
                        </div>
                    </div>
                </Form>
            </Wrapper>
        )
    }
}

export default connect(state => ({
    user: state.auth.user,
    loading: state.job.loading,
    success: state.job.success,
    error: state.job.error,
    prevJob: state.job.prevJob
}), dispatch => ({
    clear_error_data: () => dispatch({ type: "CLEAR_DATA" }),
    create: data => dispatch(job.create(data)),
    editjob: data => dispatch(job.update(data)),
    getjob: jobid => dispatch(job.getPreviousJob(jobid)),
    clearjob: () => dispatch(job.clearjob())
}))(Create);