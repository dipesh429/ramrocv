import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form} from 'informed';
import {Box} from 'reactjs-admin-lte';
import ToggleSwitch from '../../custom_form/toggleswitch';
import {editspecialfeatures} from '../../../actions/employer'; 

class SpecialFeatures extends Component{

    render(){
        return (
            // eslint-disable-next-line
            <Box style="danger" loading={this.props.loading}>
                <Form onSubmit={this.props.editspecialfeatures}>
                    <Box.Header>
                        <Box.Title>Special Features</Box.Title>
                    </Box.Header>
                    <Box.Body>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <th>Dental Plan</th>
                                    <td><ToggleSwitch checked={this.props.DentalPlan} field="DentalPlan"/></td>
                                </tr>
                                <tr>
                                    <th>Medical Plan</th>
                                    <td><ToggleSwitch checked={this.props.MedicalPlan} field="MedicalPlan" /></td>
                                </tr>
                                <tr>
                                    <th>On Site Daycare Plan</th>
                                    <td><ToggleSwitch checked={this.props.OnSiteDayCarePlan} field="OnSiteDayCarePlan" /></td>
                                </tr>
                                <tr>
                                    <th>Retirement Plan</th>
                                    <td><ToggleSwitch checked={this.props.RetirementPlan} field="RetirementPlan" /></td>
                                </tr>
                            </tbody>
                        </table>
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
    loading: state.employer.specialloading,
    DentalPlan: (state.employer.DentalPlan === "true"),
    MedicalPlan: (state.employer.MedicalPlan === "true"),
    OnSiteDayCarePlan: (state.employer.OnSiteDayCarePlan === "true"),
    RetirementPlan: (state.employer.RetirementPlan === "true")
}), dispatch=>({
    editspecialfeatures: data => editspecialfeatures(dispatch, data)
}))(SpecialFeatures);