import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import {Form} from 'informed';
import Editor from '../../custom_form/ckeditor';
import {companydescription} from '../../../actions/employer';

class CompanyDescription extends Component{
    render(){
        return (
            // eslint-disable-next-line
            <Box style="success" loading={this.props.loading}>
                <Form onSubmit={this.props.companydescription}>
                    <Box.Header>
                        <Box.Title>Institution Description</Box.Title>
                    </Box.Header>
                    <Box.Body>
                        <div className="form-group">
                            <Editor value={this.props.profile} field="profile" id="companydetails" height="150px"/>
                        </div>
                    </Box.Body>
                    <Box.Footer>
                            <button type="submit" className="btn btn-primary pull-right">Save</button> 
                    </Box.Footer>
                </Form>
            </Box>
        );
    }
}

export default connect(state => ({
    loading: state.employer.descriptionloading,
    profile: state.employer.profile
}), dispatch => ({
    companydescription: (data) => companydescription(dispatch, data)
}))(CompanyDescription);