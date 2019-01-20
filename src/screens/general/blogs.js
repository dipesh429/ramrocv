import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import Navbar from './components/navbar';
import Search from './components/search';
import Footer from './components/footer';

import {getblogs} from '../../actions/blogs';

class Blogs extends Component{

	componentDidMount(){
		if(!this.props.got_blogs){
			this.props.getblogs();
		}
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
						    <li>Blogs</li>
						  </ol>						
						</div>
						<h2 style={{fontFamily: "raleway"}}>Blogs</h2>
					</div>
				</div>
				
				<div className="container">
					{
						this.props.blogs.data.map(d => (
							<div className="section" style={{marginTop: "30px"}} key={d.id}>
								<div className="row">
									{
										d.photo ?  
										<div className="col-md-4">
											<img src={d.photo} alt={d.title} className="img-responsive"/>
										</div>
										: null
									}
									<div className={`col-md-${d.photo? 8 : 12 }`}>
										<h4 style={{fontFamily: "K2D"}}><Link className="text-danger" to={`/blogs/${d.id}`}>{d.title}</Link></h4>
										<p style={{fontSize: "16px", lineHeight: "30px", textAlign: "justify"}}>{d.description}</p>
										<Link className="btn btn-info pull-right" to={`/blogs/${d.id}`}>Read More</Link>
										<span className="text-gray pull-right" style={{display: "inline-block", margin: "10px"}}><i className="fa fa-clock-o"></i>&nbsp; {d.created_at.split(" ")[0]}</span>
									</div>
								</div>
							</div>
						))
					}
				</div>
	
			</div>
		);
	}
}


export default connect(state => ({
	blogs: state.blogs.blogs,
	got_blogs: state.blogs.got_blogs
}), dispatch => ({
	getblogs: () => getblogs(dispatch)
}))(Blogs);