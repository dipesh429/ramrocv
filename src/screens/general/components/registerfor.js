import React from 'react';
import {Link} from 'react-router-dom';

let topstyle;

let registerfor = () => (
	<div style={topstyle}>
		<div className="banner-overlay" style={{zIndex: "0"}}/>
		<div className="container" style={{padding:'30px 0'}}>
			<div className="row">
				<div className="col-md-12">
					<h1 className="fontnav" style={{margin:'0px' ,paddingBottom: "10px"}}>Start your career here</h1>
				</div>

			</div>
			<div className="row">
				<div className="col-md-6" style={{borderRight: "1px solid white"}}>
					<p style={{padding: "0px"}}><i className="fa fa-industry fa-5x"></i></p>
					<p className="fontnav" style={{fontSize: "16px"}}>
						Register as a company and start posting jobs online and select applicants with ease .
					</p>
					<p style={{paddingTop:'22px'}}><Link to="/register/employer" className="btn btn-info btn-lg">Register for Employer</Link></p>
				</div>
				<div className="col-md-6">
					<p style={{padding: "0px"}}><i className="fa fa-user fa-5x"></i></p>
					<p className="fontnav" style={{fontSize: "16px"}}>
						Kickstart your career here with ramrocv by registering and creating your cv sending it to your favourite company.
					</p>
					<p><Link to="/register/employee" className="btn btn-success btn-lg">Register as Job Seeker</Link></p>

				</div>
			</div>
		</div>
	</div>
)

export default registerfor;

topstyle = {
	padding: "10px 0",
	background: "url(https://picsum.photos/800/400/?random)",
	backgroundSize: "cover",
	textAlign: "center",
	position: "relative",
	color: "white"
}