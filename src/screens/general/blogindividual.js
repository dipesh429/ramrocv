// individual blogs implementation
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from './components/navbar';
import Search from './components/search';
import Footer from './components/footer';
import {Link, withRouter} from 'react-router-dom';

import { getblog } from '../../actions/blogs';

class BlogIndividual extends Component{
	
	componentDidMount(){
		let id = this.props.match.params.id;
		if(id){
			this.props.getblog(id);
		}
		window.scrollTo(0,0);
	}


	render(){
		return (
			<div>
				<Navbar title="Blog"/>
				
				<div className="container">
					<div className="section" style={{marginTop: "30px"}}>
						<div className="row">
							<div className={`col-md-${this.props.blog.photo ? 6 : 12 }`}>
								<h2 className="text-red" style={{fontFamily: "raleway"}}>{this.props.blog.title}</h2>
								<p style={{fontSize: "16px", lineHeight: "30px", textAlign: "justify", padding: "30px 0", fontWeight: "500", fontFamily: "roboto"}}>{this.props.blog.description}</p>
								<span style={{color: "#666"}}>
									<i className="fa fa-user"></i>&nbsp; Author: {this.props.blog.author}
								</span>
								<span style={{color: "#666"}}>
									&nbsp; &nbsp;
									<i className="fa fa-clock-o"></i>
									&nbsp; {this.props.blog.created_at ? this.props.blog.created_at.split(" ")[0] : ""}
								</span>
							</div>
							{
								this.props.blog.photo ? 
									<div className="col-md-6">
										<img src={this.props.blog.photo} alt={this.props.blog.title}/>
									</div>
								: null
							}
						</div>
					</div>
				</div>
				
				<div className="container">
					<div className="section">
						<div className="row">
							<div className="col-md-12">
								<div style={{fontSize: "16px", lineHeight: "30px", textAlign: "justify", fontWeight: "500", fontFamily: "roboto"}} dangerouslySetInnerHTML={{
									__html: this.props.blog.body
								}} ref={this.anchorblank}/>
							</div>
						</div>
					</div>
				</div>

				<Footer />
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
	blog: state.blogs.blog
}), dispatch => ({
	getblog: (id) => getblog(dispatch, id)
}))(withRouter(BlogIndividual));