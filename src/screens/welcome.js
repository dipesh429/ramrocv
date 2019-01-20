import React, {Component} from 'react';
import Wrapper from './partials/wrapper';
import {Box} from 'reactjs-admin-lte'

import { BrowserRouter,Switch,Route } from 'react-router-dom';

// employee screens
import EmployeeUserSettings from './employee/usersettings';
import EmployeeDashboard from './employee/dashboard';
import ApplyJob from './employee/applyjob';
import ViewCV from './employee/cvmaker/view';
import CVMaker from './employee/cvmaker/index'; 
import EmployeeProfile from './employee/profile/index';
import ViewAppliedJobs from './employee/viewappliedjobs';
import ViewCVIndividual from './employee/cvmaker/viewindividual';
import FollowSettings from './employee/follow';


// employer screens 
import EmployerUserSettings from './employer/usersettings';
import EmployerDashboard from './employer/dashboard';
import Profile from './employer/profile/profile';
import JobCreate from './employer/job/create';
import JobEdit from './employer/job/create';
import JobView from './employer/job/view';
import ApplicantView from './employer/job/applicantview';


import PrivateRoute from '../routes/privateroute';
import EmployeeRoute from '../routes/employeeroute';
import EmployerRoute from '../routes/employerroute';


export default class Welcome extends Component{

    render(){
        return (
            <React.Fragment>
            
            <Route exact path="/dashboard/employee/usersettings" component={EmployeeUserSettings} nosettings/>
            <Route exact path="/dashboard/followed/view" component={FollowSettings} />
            <Route exact path="/dashboard/employee" component={EmployeeDashboard} />
            <Route exact path="/dashboard/appliedjobs/view" component={ViewAppliedJobs} />
            <Route exact path="/dashboard/job/apply/:id" component={ApplyJob} />
            <Route exact path="/dashboard/cvmaker/view" component={ViewCV} />
            <Route exact path="/dashboard/cvmaker/view/:id" component={ViewCVIndividual} />
            <Route exact path="/dashboard/cvmaker/edit/:id" component={CVMaker} />
            <Route exact path="/profile" component={EmployeeProfile} />

            <Route exact path="/dashboard/employer/usersettings" component={EmployerUserSettings} />
            <Route exact path="/dashboard/employer" component={EmployerDashboard} />
            <Route exact path="/dashboard/job/view/:id/candidates" component={ApplicantView} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route exact path="/dashboard/job/create"  component={JobCreate} />
            <Route exact path="/dashboard/job/view/:page" component={JobView} />
            <Route exact path="/dashboard/job/view" component={JobView} />
            <Route exact path="/dashboard/job/edit/:id" component={JobEdit} />

            </React.Fragment>

        );
    }
}

