import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import {Form} from 'informed';
import Input from '../../custom_form/input';
import { editcontactdetails } from '../../../actions/employer';

class ShowContactDetails extends Component{

    state = {
        data: {
            "contact-name": { key: "Contact Person", value: "" },
            "contact-designation": { key: "Designation", value: ""},
            "contact-phone": { key: "Mobile Number", value: ""}
        },
        edit: false
    }

    static getDerivedStateFromProps(props, state){
        let st = state;
        if(props.employer){
            for(let key of Object.keys(state.data)){
                if(key in props.employer){
                    st.data[key].value = props.employer[key];
                }
            }
        }
        return st;
    }

    componentDidUpdate(props){
        if(this.props.loading !== props.loading){
            this.setState({edit: false});
        }
    }   


    contact = () => {
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

    editcontactdetails = () => (
        <table className="table table-striped">
            <tbody>
                <tr>
                    <th>Contact Person</th>
                    <td>
                        <Input value={this.props.employer['contact-name']} field="contact-name" placeholder="Contact Person" className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Designation</th>
                    <td>
                        <Input value={this.props.employer['contact-designation']} field="contact-designation" placeholder="Designation" className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Mobile Number</th>
                    <td>
                        <Input value={this.props.employer['contact-phone']} field="contact-phone" placeholder="Mobile Number" className="form-control" />
                    </td>
                </tr>
            </tbody>
        </table>
    )

    render(){
        return (
            <Box className="box-success" loading={this.props.loading}>
                <Form onSubmit={ data => { this.props.editcontactdetails(data) } }>
                    <Box.Header>
                        <Box.Title>Contact Details</Box.Title>
                        <Box.Tools>
                            <a className="btn btn-box-tool" onClick={ ()=>this.setState({ edit: true }) }>
                                <i className="fa fa-edit" />&nbsp; Edit
                            </a>
                        </Box.Tools>
                    </Box.Header>
                    <Box.Body>
                        {(this.state.edit) ? this.editcontactdetails() : this.contact() }                    
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
    loading: state.employer.contactloading,
    employer: state.employer
}), dispatch => ({
    editcontactdetails: (data) => editcontactdetails(dispatch, data) 
}))(ShowContactDetails);