// jobs by category and location here
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Tabs, Tab} from 'react-bootstrap'; 
import {getType, getLocation} from '../../../actions/job';
import LoadingOverlay from 'react-loading-overlay';


class JobsBy extends Component{
	
	componentDidMount(){
		this.props.getType();
		this.props.getLocation();
	}

	escape(data){
		if(data){
			const escapeMap = require('../../../escape.json');
			for(let key of Object.keys(escapeMap)){
				data = data.toString().replace(key, escapeMap[key]);
			}
		}
		return data;
	}

	render(){
		return (
			<div style={{padding: 0, marginTop: '10px', marginBottom: '10px'}} className="section">
				<Tabs defaultActiveKey={2} id="uncontrolled-tab-jobsby">
					<Tab eventKey={1}  title="Jobs by Type">

						<div style={{maxHeight: "400px", overflowY: "auto", padding: "5px"}}>
							
							{this.props.typeloading && 
								<LoadingOverlay 
								active={true}
								style={{height: "200px"}}
								spinner
								color="#333"
								text=''
								background='white' />
							}

							{!this.props.typeloading &&
								Object.keys(this.props.type).map((k, d) => (
									<Fragment key={d}>
								<Link className="listingstyle" to={`/jobs?query=&category=&industry=&type=${this.escape(k)}&salary=&location=&jobcategory=&per_page=10&page=1`}>{k} ({ this.props.type[k] })</Link> <br/> 
									</Fragment>

								))
							}

						</div>
					</Tab>
					<Tab eventKey={2} title="Jobs by Location">
						<div style={{maxHeight: "400px", overflowY: "auto", padding:'5px'}}>
							{this.props.locationloading && 
								<LoadingOverlay 
									active={true}
									style={{height: "200px"}}
									spinner
									color="#333"
									text=''
									background='white' />
							}
							{!this.props.locationloading &&
								Object.keys(this.props.location).map((k, d) => (
									<Fragment key={d}>
										<Link className="listingstyle" to={`/jobs?query=&category=&industry=&type=&salary=&location=${k}&jobcategory=&per_page=10&page=1`}>{k.charAt(0).toUpperCase()+k.slice(1)} ({ this.props.location[k] })</Link> <br/> 
									</Fragment>
								))
							}
						</div>
					</Tab>

				</Tabs>
			</div>
		)
	}
}



export default connect(state => ({
	location: state.job.location,
	type: state.job.type,
	typeloading: state.progress.jobsbytypeloading,
	locationloading: state.progress.jobsbylocationloading
}), dispatch => ({
	getType: () => getType(dispatch),
	getLocation: () => getLocation(dispatch)
}))(JobsBy);