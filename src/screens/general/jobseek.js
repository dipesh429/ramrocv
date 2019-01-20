// for job seekers
import React, {Component} from 'react';
import ScrollUpButton from "react-scroll-up-button";
import Navbar from './components/navbar';
import Jumbotron from './components/jumbotron';

export default class JobSeek extends Component{
	render(){
		return (
			<div>
        <ScrollUpButton />
				<Navbar title="Home"/>
    		<Jumbotron title="Search your awesome job" subtitle="Make your career right now." padding="20px 0" nosocial/>
      </div>
		);
	}
}