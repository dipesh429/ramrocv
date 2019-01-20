import React, { Component } from 'react';
import {Layout, MainHeader} from 'reactjs-admin-lte';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { Redirect } from 'react-router-dom';

export default class Master extends Component{
    state = {}
    
    render(){
        if(this.state.go){
            return <Redirect to="/" />
        }
        return (
            <Layout skin="blue" type="fixed">
                <MainHeader>
                    <MainHeader.Logo onClick={() => this.setState({go: true})}>
                            <span className="logo-mini" style={{cursor: "pointer"}}>
                                <b>R</b>CV
                            </span>
                            <span className="logo-lg" style={{cursor: "pointer"}}>
                                <b>Ramro</b>CV
                            </span>
                    </MainHeader.Logo>
                    <Navbar />
                </MainHeader>
                <Sidebar location={this.props.location}/>
                    { this.props.children }
            </Layout>
        );
    }
}