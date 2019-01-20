import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCategory} from '../../../actions/job';
import ReactTooltip from 'react-tooltip'
import LoadingOverlay from 'react-loading-overlay';


class JobsByCategory extends Component{
	
	componentDidMount(){
		this.props.getCategory();
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
			<div style={{padding: "10px", marginTop: "10px"}} id="popular-categories" className="section">
				<h4 style={{textAlign: "center", padding: "10px", color: "#db3038"}}>Jobs By Category</h4>
				<ReactTooltip place="bottom" effect="solid"/> 
				<div>
					
					{this.props.loading && 
						<LoadingOverlay 
						active={true}
						style={{height: "200px"}}
						spinner
						color="#333"
						text=''
						background='white' />
					}

					{!this.props.loading &&
						Object.keys(this.props.category).map((k, d) => (
							<Link key={d} to={`/jobs?query=&category=&industry=&type=&salary=&location=&jobcategory=${this.escape(k)}&per_page=10&page=1`}>
								<div className="category">
									<span class="head" data-tip={ k && k.length > 20 ? k : null }>{ k && k.length > 20 ? k.substring(0,20) + '...' : k }</span>
									<br/> 
									<span>({ this.props.category[k] })</span>
								</div>
							</Link>
						))
					}
				</div>
			</div>
		)
	}
}	

export default connect(state => ({
	category: state.job.category,
	loading: state.progress.jobsbycategoryloading,
}), dispatch => ({
	getCategory: () => getCategory(dispatch),
}))(JobsByCategory);