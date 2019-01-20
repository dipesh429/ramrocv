import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../css/404.css';


class Error404 extends Component{
	
	render(){
		return (
			<div className="body">		
				<h1 style={{fontFamily: 'K2D'}}>404</h1>
				<p>Oops! Something is wrong.</p>
				<div style={{textAlign: "Center"}}>
					<Link to ='/' className="btn" style={{color: "white", border: "1px solid white", margin: "40px 0", borderRadius: "5px"}}>
						Go back to initial page, it's better.
					</Link>
				</div>
			</div>
		)
	}
}


export default Error404

