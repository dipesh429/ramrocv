import React, {Component} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class PrivateRoute extends Component{
    
    render(){
        const {component, ...props} = this.props;
        return (this.props.logged_in) ?
        		<Route {...props} component={component}/> : <Redirect to ='/login'/>;
    }
}

export default connect(state => ({
    logged_in: state.auth.logged_in 
}))(withRouter(PrivateRoute))