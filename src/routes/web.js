import React, { Component } from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as user from '../actions/user';

import ReactTooltip from 'react-tooltip'


import PrivateRoute from './privateroute';
import EmployeeRoute from './employeeroute';
import EmployerRoute from './employerroute';

import Error404 from '../screens/404'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// screens declaration
import Login from '../screens/login';
import Root from '../screens/root';
import Register from '../screens/register';
import Jobs from '../screens/general/jobs';
import VerifyMessage from '../screens/general/verifymessage';
import JobIndividual from '../screens/general/jobindividual';
import EmployerIndividual from '../screens/general/employerindividual';
import Blogs from '../screens/general/blogs';
import BlogIndividual from '../screens/general/blogindividual';
import About from '../screens/general/about';
import Contact from '../screens/general/contact';
import Terms from '../screens/general/terms';
import JobSeek from '../screens/general/jobseek';

import InstitutionProfile from '../screens/institution/profile/profile'
import Offer from '../screens/institution/offer'

import Welcome from '../screens/welcome'


// employee screens
import EmployeeUserSettings from '../screens/employee/usersettings';
import EmployeeDashboard from '../screens/employee/dashboard';
import ApplyJob from '../screens/employee/applyjob';
import ViewCV from '../screens/employee/cvmaker/view';
import CVMaker from '../screens/employee/cvmaker/index'; 
import EmployeeProfile from '../screens/employee/profile/index';
import ViewAppliedJobs from '../screens/employee/viewappliedjobs';
import ViewCVIndividual from '../screens/employee/cvmaker/viewindividual';
import FollowSettings from '../screens/employee/follow';


// employer screens 
import EmployerUserSettings from '../screens/employer/usersettings';
import EmployerDashboard from '../screens/employer/dashboard';
import Profile from '../screens/employer/profile/profile';
import JobCreate from '../screens/employer/job/create';
import JobEdit from '../screens/employer/job/create';
import JobView from '../screens/employer/job/view';
import ApplicantView from '../screens/employer/job/applicantview';

class RouteComponent extends Component{
    
    componentWillMount(){
        
        let a =localStorage.getItem('access_token');
        if(a==null){
            this.props.authenticate_client();}
        
        let b= localStorage.getItem('id')
    
        if(b!=null){
            this.props.getUserDetails(b)
        }
    }
   

    render(){
        return (
            <BrowserRouter>
                <React.Fragment>
                    
                    <Switch location={this.props.location}>
                       
                        <Route exact path="/" component={Root} />
                        <Route exact path="/jobs" component={Jobs} />
                        <Route exact path="/jobs/:page" component={Jobs} />
                        
                        <Route path="/login" exact component={Login} />
                        <Route exact path="/register/all" component={Register} />
                        <Route exact path="/register/:type(employee|employer)" component={Register} />
                        <Route exact path="/job/view/:id" component={JobIndividual} />
                        <Route exact path="/company/view/:id" component={EmployerIndividual} />
                        <Route exact path="/register/verify" component={VerifyMessage} />
                        <Route exact path="/verified" component={() => <VerifyMessage verified />} />
                        <Route exact path="/blogs" component={Blogs} />
                        <Route exact path="/blogs/:id" component={BlogIndividual} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/terms" component={Terms} />
                        <Route exact path="/jobseek" component={JobSeek} />

                        <EmployeeRoute exact path="/dashboard/employee/usersettings" component={EmployeeUserSettings} nosettings/>
                        <EmployeeRoute exact path="/dashboard/followed/view" component={FollowSettings} />
                        <EmployeeRoute exact path="/dashboard/employee" component={EmployeeDashboard} />
                        <EmployeeRoute exact path="/dashboard/appliedjobs/view" component={ViewAppliedJobs} />
                        <EmployeeRoute exact path="/dashboard/job/apply/:id" component={ApplyJob} />
                        <EmployeeRoute exact path="/dashboard/cvmaker/view" component={ViewCV} />
                        <EmployeeRoute exact path="/dashboard/cvmaker/view/:id" component={ViewCVIndividual} />
                        <EmployeeRoute exact path="/dashboard/cvmaker/edit/:id" component={CVMaker} />
                        <EmployeeRoute exact path="/profile" component={EmployeeProfile} />
                        

                        <EmployerRoute exact path="/dashboard/employer/usersettings" component={EmployerUserSettings} />
                        <EmployerRoute exact path="/dashboard/employer" component={EmployerDashboard} />
                        <EmployerRoute exact path="/dashboard/job/view/:id/candidates" component={ApplicantView} />
                        <EmployerRoute exact path="/dashboard/profile" component={Profile} />
                        <EmployerRoute exact path="/dashboard/job/create"  component={JobCreate} />
                        <EmployerRoute exact path="/dashboard/job/view/:page" component={JobView} />
                        <EmployerRoute exact path="/dashboard/job/view" component={JobView} />
                        <EmployerRoute exact path="/dashboard/job/edit/:id" component={JobEdit} />

                        <Route component={Error404}/>
                    </Switch>    
                    <ToastContainer />
                </React.Fragment>
            </BrowserRouter>    
        );
    }
}

const mapDispatchToProps = dispatch => (
        {authenticate_client : () => dispatch(user.authenticate_client()),
         getUserDetails:(data) => dispatch(user.getUserDetails(data))  })


export default connect(null,mapDispatchToProps)(RouteComponent);