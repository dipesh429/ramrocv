import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from './components/navbar';
import Footer from './components/footer';

import {get_about} from '../../actions/general_actions/site';
import LoadingOverlay from 'react-loading-overlay';

class About extends Component{
	
	componentDidMount(){
		this.props.get_about();
	}

	render(){
		return (
			<div>
				
				<div className="banner-job" style={{background: "url(https://picsum.photos/600/300?random)", backgroundSize: "cover" }}>
					<div className="banner-overlay" />
					<div className="container">
						<div className="breadcrumb-section" style={{padding: "10px 0"}}>

						  <ol className="breadcrumb">
						    <li><a href="index.html">Home</a></li>
						    <li>Why RamroCV?</li>
						  </ol>						
						
						</div>
						<h2>Why RamroCV?</h2>
					</div>
				</div>
				<div className="container">
					<div className="section" style={{position: "relative"}}>
						{ this.props.about ? 
							<div style={{lineHeight: "30px"}} dangerouslySetInnerHTML={{ __html: this.props.about }} ref={this.anchorblank}/>
						  :  <LoadingOverlay 
		                        active={true}
		                        style={{height: "200px"}}
		                        spinner
		                        color="#333"
		                        text='Loading'
		                        background='white' />
						}
					</div>
				</div>
			
			</div>
		);
	}
	anchorblank = (ref) => {
		if(ref){
			const anchors = ref.querySelectorAll('a');
			for(let anchor of anchors){
				anchor.target = "_blank";
			}
		}
	}
}


export default connect(state => ({
	about: state.general.about
}),dispatch => ({
	get_about: () => get_about(dispatch)
}) )(About);