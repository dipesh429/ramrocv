import React, {Component} from 'react';
import {get_sidebar} from '../../config';
import { Link, withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';

import moment from 'moment';

const jQuery = window.jQuery;

class Sidebar extends Component{
    
    key = 0;
    active = null;

    state = { number: 0 }

    componentDidMount(){
        jQuery('.sidebar-menu').tree();
        if(this.props.user.created_at){
            this.calculate()
        }
    }

    componentDidUpdate(props){
        if(this.props.user.id !== props.user.id){
            this.calculate();
        }
    }

    calculate = () => {
        this.setState({ number: moment(this.props.user.created_at).fromNow() })
    }

    makeactive = ref => {
        let b = jQuery(ref);
        for(let i = 0; i < 10; i++){
            b = b.parent();
            if(b && b.prop('tagName') === "LI"){
                b.toggleClass("active");
            }
        }
    }

    generate_sidebar = (val = false) => {
        let gen = [];
        let tree_ = (val) ? val : get_sidebar();
        for(let node of tree_){
            switch(node.constructor){
                case String:
                    gen.push(<li className="header" key={this.key++}>{node}</li>);
                    break;
                case Array:
                    let clone = node.slice();
                    if(node[0].href){
                        gen.push([
                            <li key={this.key++}>
                                <Link to={node[0].href ? node[0].href : "#link"}>
                                    <i className={`fa fa-${node[0].icon}`} /> 
                                    <span>{node[0].name}</span>
                                </Link>
                            </li>
                        ], this.generate_sidebar(clone.splice(1)));
                    }else if(node[0].constructor !== Array ){
                        gen.push(
                            <li className={`treeview`} key={this.key++}>
                                <a href="#treview"><i className={`fa fa-${node[0].icon}`} /> <span>{node[0].name}</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className={`treeview-menu`}>
                                    { this.generate_sidebar(clone.splice(1)) }
                                </ul>
                            </li>
                        )
                    }else{
                        gen.push(this.generate_sidebar(node))
                    }
                    break;
                case Object:
                    let a = this.props.location.pathname === node.href;
                    gen.push(
                        <li className={(a) ? 'active' : '' } key={this.key++} ref={ ref => { if(a){ this.makeactive(ref) } } }>
                            <Link to={node.href ? node.href : "#link"}><i className={`fa fa-${node.icon}`} /> <span>{node.name}</span> </Link>
                        </li>
                    )
                    break;
                default:
                    
            }
        }
        return gen;
    } 
    
    render(){
        this.generate_sidebar();
        let image = null;
        if(this.props.user.employee){
            image = this.props.user.employee.photo; 
        }else if(this.props.user.company){
            image = this.props.user.company.image;
        }
        return (
        <aside className="main-sidebar">
            <section className="sidebar">
                {/* Sidebar Menu */}
                <ul className="sidebar-menu" data-widget="tree">
                    <div className="user-panel" style={{padding: "25px 10px"}}>
                        <div className="pull-left image" style={{marginTop: "12px"}}>
                            <img src={ !image ? require('../../img/placeholder_user.jpg') : image } className="img-circle" alt="User" />
                        </div>
                        <div className="pull-left info">
                            <p>{ this.props.user.name } 
                                { this.props.user.verified === "1" && 
                                    <i className="fa fa-check-circle" title="You are verified" data-toggle="tooltip"></i>
                                }
                            
                            </p>
                            <Link to="/dashboard/profile"><i className="fa fa-circle text-success"></i> {this.props.user.email}</Link>
                            <br />
                            <small style={{marginTop: "10px", display: "inline-block", fontSize: "11px", color: "#ccc"}}>Member Since: {this.state.number} </small>
                        </div>
                    </div>
                    { this.generate_sidebar() }
                </ul>
                {/* /.sidebar-menu */}
            </section>
            {/* /.sidebar */}
        </aside>
        );
    }
}

export default connect(state => ({
    user: state.auth.user ? state.auth.user : {}
}), null)(withRouter(Sidebar));