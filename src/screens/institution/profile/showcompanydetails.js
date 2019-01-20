import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import {Form, Option} from 'informed';
import Input from '../../custom_form/input';
import Select from '../../custom_form/select';
import { editcompanydetails } from '../../../actions/employer';
import INDUSTRIES from '../../../industries.json';

class ShowCompanyDetails extends Component{

    state = {
        data: {
            company_name: { key: "Company Name", value: "" },
            type: { key: "Company Type", value: ""},
            industry: { key: "Industry", value: ""},
            address: { key: "Address", value: ""},
            phone: { key: "Office Phone No.", value: ""},
            site_url: { key: "Url", value: ""},
            pan_no: { key: "Company PAN Number", value: ""} 
        },
        edit: false
    }

    static getDerivedStateFromProps(props, state){
        let st = state;

        st.data.company_name.value = props.employer && props.employer.name ? props.employer.name : ""
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
            this.setState({ edit: false })
        }
    }

    companydetails = () => {
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
    };

    editcompanydetails = () => (
        <table className="table table-striped">
            <tbody>
                <tr>
                    <th>Company Name</th>
                    <td>

                        <Input value={ this.props.employer.name } field="company_name" placeholder="Company Name" className="form-control" />

                    </td>
                </tr>
                <tr>
                    <th>Company Type</th>
                    <td>
                        <Select id="type" value={this.props.employer.type} field="type" placeholder="Select Company Type" className="form-control">
                            <Option value="Direct">Direct</Option>
                            <Option value="Indirect">Indirect</Option>
                        </Select>
                    </td>
                </tr>
                <tr>
                    <th>Ownership</th>
                    <td>
                        <Select id="ownership" value={this.props.employer.ownership} field="ownership" placeholder="Select Ownership" className="form-control">
                            <Option value="Private">Private</Option>
                            <Option value="Public">Public</Option>
                            <Option value="Government">Government</Option>
                        </Select>
                    </td>
                </tr>
                <tr>
                <th>Industry</th>
                    <td>
                        <Select id="industry" value={this.props.employer.industry} field="industry" placeholder="Select Industry" className="form-control">
                            {
                                INDUSTRIES.map((d,k)=> <Option value={d} key={k}>{d}</Option>)
                            }   
                        </Select>
                    </td>
                </tr>
                <tr>
                <th>Address</th>
                    <td>
                        <Input value={this.props.employer.address} field="address" placeholder="Address" className="form-control" />
                    </td>
                </tr>
                <tr>
                <th>Office Phone No.</th>
                    <td>
                        <Input value={this.props.employer.phone} field="phone" placeholder="Office Phone No." className="form-control" />
                    </td>
                </tr>
                <tr>
                    <th>Url</th>
                    <td>
                        <Input value={this.props.employer.site_url} field="site_url" placeholder="http://ramrocv.com" className="form-control" />
                    </td>
                </tr>
                {/* <tr>
                    <th>Company Description</th>
                    <td>
                        <Input value={this.props.employer.profile} field="profile" placeholder="Company Description" className="form-control" />
                    </td>
                </tr> */}
                <tr>
                    <th>Company PAN Number</th>
                    <td>
                        <Input value={this.props.employer.pan_no} field="pan_no" placeholder="Company PAN Number" className="form-control" />
                    </td>
                </tr>
            </tbody>
        </table>
    )

    render(){
        return (
            // eslint-disable-next-line
            <Box style="primary" loading={this.props.loading}>
                <Form onSubmit={ data => { this.props.editcompanydetails(data) } }>
                    <Box.Header>
                        <Box.Title>Institution Details</Box.Title>
                        <Box.Tools>
                            <a className="btn btn-box-tool" onClick={ ()=>this.setState({ edit: true }) }>
                                <i className="fa fa-edit" />&nbsp; Edit
                            </a>
                        </Box.Tools>
                    </Box.Header>
                    <Box.Body>
                        <div className="row col-md-12">
                            {(this.state.edit) ? this.editcompanydetails() : this.companydetails() }                    
                        </div>
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
    loading: state.employer.companyloading,
    employer: state.employer
}), dispatch => ({
    editcompanydetails: (data) => editcompanydetails(dispatch, data) 
}))(ShowCompanyDetails);