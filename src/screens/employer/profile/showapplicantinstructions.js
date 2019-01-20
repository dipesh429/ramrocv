import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import {Form} from 'informed';
import Editor from '../../custom_form/ckeditor';
import {applicantinstructions} from '../../../actions/employer';

class ShowApplicantInstructions extends Component{
    render(){
        return (
            // eslint-disable-next-line
            <Box style="success" loading={this.props.loading}>
                <Form onSubmit={this.props.applicantinstructions}>
                    <Box.Header>
                        <Box.Title>Instructions for Applicants</Box.Title>
                    </Box.Header>
                    <Box.Body>
                        <div className="form-group">
                            <Editor value={this.props.instructions} field="InstructionForApplicants" id="instructions" height="150px"/>
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
    loading: state.employer.applicantloading,
    instructions: state.employer.InstructionForApplicants
}), dispatch => ({
    applicantinstructions: (data) => applicantinstructions(dispatch, data)
}))(ShowApplicantInstructions);