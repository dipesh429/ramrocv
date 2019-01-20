import React, {Component} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class PrivateRoute extends Component{
    
    render(){
        const {component, ...props} = this.props;
        if( this.props.nosettings && localStorage.getItem("provider") ){
	        return <Redirect to="/404" />;
        }
        return (localStorage.getItem("type") === "employee" && this.props.logged_in) ?
        		<Route {...props} component={component}/> : <Redirect to ='/404'/>;
    }
}

export default connect(state => ({
    logged_in: state.auth.logged_in 
}))(withRouter(PrivateRoute))