import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Form, Option} from 'informed';
import Input from '../../custom_form/input';
import {Box} from 'reactjs-admin-lte';
import DatePicker from '../../custom_form/datepicker';
import Select from '../../custom_form/select';

import {send} from '../../../actions/employee';

class PersonalDetails extends Component{
	
    state = {
        data: {
            "name": { key: "Your Name", value: "" },
            "permanent": { key: "Permanent Address", value: ""},
            "temporary": { key: "Temporary Address", value: ""},
            "blood": {key: "Blood Group", value: ""},
            "phone": { key: "Phone Number", value: ""},
            "website" : { key: "Website", value: ""},
            "dob" : {key: "Date of Birth", value: ""},
            "nationality": {key: "Nationality", value: ""},
            "marital": {key: "Marital Status", value: ""},
            "gender": {key: "Gender", value: ""}
        },
        edit: false
    }

	static getDerivedStateFromProps(props, state){
        let st = state;
        if(props.employee){
            st.data.name.value = props.employee && props.employee.name ? props.employee.name : ""
            for(let key of Object.keys(state.data)){
                if(key in props.employee){
                    st.data[key].value = props.employee[key];
                }
            }
        }
        return st;
    }

    componentDidUpdate(props){
        if(this.props.loading !== props.loading){
            this.setState({edit: false});
        }

        // this.props.notboxed && this.props.edit && this.setState({ edit: true });
    }

    view = () => {
        let ret = [];
        let data = this.state.data;
        for(let c of Object.keys(data)){
            ret.push(
                <tr key={c}>
                    <th>{ data[c].key }</th>
                    <td>{ data[c].value ? data[c].value : "Not Available" }</td>
                </tr>
            )
        }
        return (
            <table className="table table-striped">
                <tbody>
                   {ret} 
                </tbody>
            </table>
        )
    }

	edit = () => (
        <table className="table table-striped">
            <tbody>
                <tr>
                    <th>Your Name</th>
                    <td>

                        <Input value={this.props.employee['name'] ? this.props.employee['name'] : "" } field="name" placeholder="Your Name" className="form-control" />

                    </td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>
                        <Input value={this.props.employee['permanent']} field="permanent" placeholder="Permanent Address" className="form-control" />
                        <Input value={this.props.employee['temporary']} field="temporary" placeholder="Temporary Address" className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>
                        <Input value={this.props.employee['phone']} field="phone" placeholder="Phone Number" className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Blood Group</th>
                    <td>
                        <Select id="blood" value={this.props.employee['blood']} field="blood" placeholder="Your blood group" className="form-control">
                            {
                                ['O negative', 'O positive', 'A negative', 'A positive', 'B negative', 'B positive', 'AB negative', 'AB positive'].map((d,k) =>(
                                    <Option key={k} value={d}>{d}</Option>
                                ))
                            }
                        </Select>
                    </td>
                </tr>
                
                <tr>
                    <th>Website</th>
                    <td>
                        <Input value={this.props.employee['website']} field="website" placeholder="Website" className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Date of Birth</th>
                    <td>
                        <DatePicker current value={this.props.employee['dob']} id="datepicker" field="dob" placeholder="Date of Birth" className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Nationality</th>
                    <td>
                        <Input value={this.props.employee['nationality']} field="nationality" placeholder="Nationality" className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Marital Status</th>
                    <td>
                        <Select id="marital_status" value={this.props.employee['marital']} field="marital" placeholder="Marital Status" className="form-control">
                            <Option value="Married">Married</Option>
                            <Option value="Single">Single</Option>
                            <Option value="Divorced">Divorced</Option>
                            <Option value="Engaged">Engaged</Option>
                        	<Option value="Not Disclosed">Do not specify</Option>
                        </Select>
                    </td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td>
                        <Select id="gender" value={this.props.employee['gender']} field="gender" placeholder="Gender" className="form-control">
                        	<Option value="Male">Male</Option>
                        	<Option value="Female">Female</Option>
                        	<Option value="Other">Other</Option>
                        </Select>
                    </td>
                </tr>
            </tbody>
        </table>
    )
   
	render(){
        if(this.props.edit && this.props.notboxed){
            return (
                <div style={{height: "400px", overflowY: "auto"}}>
                    <Form onSubmit={this.pdsubmit}>
                        { this.edit() }
                    </Form>
                </div>
            ); 
        } 

        return (
            <Box className="box-success" loading={this.props.loading}>
                <Form onSubmit={ data => { this.props.send(data) } }>
                    <Box.Header>
                        <Box.Title>Personal Details</Box.Title>
                        <Box.Tools>
                            <a className="btn btn-box-tool" onClick={ ()=>this.setState({ edit: true }) }>
                                <i className="fa fa-edit" />&nbsp; Edit
                            </a>
                        </Box.Tools>
                    </Box.Header>
                    <Box.Body>
                        {(this.state.edit) ? this.edit() : this.view() }                    
                    </Box.Body>
                    <Box.Footer>
                    {(this.state.edit) ? 
                        (<div>
                            <button type="submit" className="btn btn-primary pull-right">Save</button> 
                            <button className="btn btn-default" onClick={() => this.setState({ edit: false }) }>Cancel</button>
                        </div>)
                        : null}
                    </Box.Footer>
                </Form>
            </Box>
        );
    }
}

export default connect(state => ({
    user: state.auth.user,
	employee: state.employee,
    loading: state.employee.personalloading
}), dispatch => ({
	send: (data) => send(dispatch, data)
}))(PersonalDetails);