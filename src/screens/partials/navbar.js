
import React, {Component} from 'react';
import {connect}  from 'react-redux';
import * as user from '../../actions/user'
import {withRouter, Link} from 'react-router-dom'
import {ROOT_NAVBAR} from '../../config';

import { NavDropdown, MenuItem } from 'react-bootstrap';

const jQuery = window.jQuery;

class Navbar extends Component{

  toggle = null;

  componentDidMount(){
    jQuery(this.toggle).pushMenu();
  }
  
  logOut = ()=>{
    this.props.history.push('/login');
    localStorage.clear();
    this.props.logOut();
  }

  render_links = () => {
    let links = [];
    let path = this.props.location.pathname;
    for(let l of ROOT_NAVBAR){
      links.push(
        <li className={ path === l.href ? "active": "" } key={l.name}>
          <Link to={l.href} style={{color: "#333"}}>{l.name}</Link>
        </li>
      )
    }
    return links;
  }

  gotoprofile = () => {
    if(localStorage.getItem("type") === "employer"){
      this.props.history.push("/dashboard/profile");
    } else {
      this.props.history.push("/profile");
    }
  }

  render(){
    
    return (
      <nav className="custom navbar navbar-static-top" style={{background: "white"}}>
        {/* Menu toggle button */}
        <a style={{color: "#333"}} href="#toggle" className="sidebar-toggle" data-toggle="push-menu" role="button" ref={a => (this.toggle = a)}>
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="custom nav navbar-nav">
            { /*this.render_links() */}
          {this.props.email ?
            <NavDropdown id="usermenu" className="user-menu" title={
              <span>  
                <img style={{width: "25px", height: "25px", marginRight: "10px", borderRadius: "25px"}} src={this.props.image ? this.props.image: require('../../img/placeholder_user.jpg')} alt={this.props.name} />
                <span  style={{color: "#333"}}>{ this.props.name }</span>
              </span>
              }>
              <MenuItem onClick={() => this.props.history.push("/")}>
                <i className="fa fa-home"></i> &nbsp; Home
              </MenuItem>
              <MenuItem onClick={this.gotoprofile}><i className="fa fa-user"></i> &nbsp; Profile</MenuItem>
              <MenuItem onClick={this.logOut}><i className="fa fa-power-off"></i> &nbsp; Log Out</MenuItem>
            </NavDropdown>
            /*<li>
              <Link to="/dashboard/profile" className="btn" style={{textTransform: "none", color: "#333" }}><i className="fa fa-user"/> &nbsp; {this.props.email}</Link>
            </li>*/: null
          }
        
          </ul>
        
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => (

    {
      email:state.auth.user.email,
      name: state.auth.user.name,
      image:  ( state.auth.user.company && state.auth.user.company.image ) || 
              ( state.auth.user.employee && state.auth.user.employee.photo )
    })

const mapDispatchToProps = (dispatch) => (
      
      {logOut: ()=> dispatch(user.logout())}

  )

export default withRouter (connect(mapStateToProps,mapDispatchToProps)(Navbar))