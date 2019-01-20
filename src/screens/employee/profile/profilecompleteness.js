import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import Chart from 'chart.js';



let calculate = (props, fields) => {
	let notcomplete = [];
	let i = 0, j = 0;

	for(let field of Object.keys(fields)){
		if(field === "name"){ continue; }
		j++
		if(!props.data[field]){
			i++;
			notcomplete.push(fields[field]);
		}
	}
	return {
		data: notcomplete,
		percentage: i / j 
	};
}


class Completeness extends Component{
	state = { 
		data: [],
		complete: 0,  
		fields: {
			name : "Your Name", 
			permanent: "Permanent Address",
			temporary: "Temporary Address", 
			phone: "Phone Number", 
			website: "Personal Website", 
			dob: "Date of Birth", 
			nationality: "Nationality", 
			marital: "Marital", 
			gender: "Gender", 
			photo: "Profile Picture" 
		}
	} 
	

	chartoption = {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [0, 0],
				backgroundColor: [  '#00a651', '#db3038']
			}],
			labels: [
				'Completed',
				'Not Completed',
			]
		},
		options: {
			legend: { position: 'right'},
			animation: { animateRotate: false }
		}
	}

	
	componentDidMount(){
		if(this.ctx){
			this.chart = new Chart(this.ctx, this.chartoption);
		}
		let nc = calculate(this.props, this.state.fields);
		this.setState({
			data: nc.data,
			complete: (1-nc.percentage).toFixed(2) * 100
		})	
		this.updatechart();
	}

	updatechart = () => {
		this.chart.data.datasets[0].data = [ this.state.complete, (100 - this.state.complete).toFixed(2) ];
		this.chart.update();
	}

	static getDerivedStateFromProps(props, state){
		let notcomplete = calculate(props, state.fields);
		return {
			data: notcomplete.data,
			complete: (1-notcomplete.percentage).toFixed(2) * 100
		}
	}

	componentDidUpdate(props, state){
		if(this.state.complete !== state.complete){
			this.updatechart();
		}
	}

	render(){
		return (
			 <Box className="box-default" loading={this.props.loading}>
                <Box.Header>
                    <Box.Title>Profile Completeness</Box.Title>
                </Box.Header>
                <Box.Body>
                	<canvas ref={ c => { this.ctx = c; }} />
 					<hr />
                    <p className="pull-right">Last Updated on: {this.props.data.updated_at ? this.props.data.updated_at.split(" ")[0] : "N/A"}</p>
                </Box.Body>
                <Box.Footer className="no-padding">
                	<h4 className="text-center text-primary" >{this.state.data.length === 0 ? "Congratulations you have filled everything": "What's left to fill ?"}</h4>
               		<ul className="nav nav-pills nav-stacked">
               			{this.state.data.map(d => (
               				<li key={d}><a>{d}</a></li>
           				))}
               		</ul>
                </Box.Footer>
            </Box>
		);
	}
}


export default connect(state => ({
	data : state.employee,
	loading: state.employee.otherloading
}))(Completeness);