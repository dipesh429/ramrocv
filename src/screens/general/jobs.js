import React, {Component} from 'react'; 
import {connect} from 'react-redux';

import Navbar from './components/navbar';
import Search from './components/search';
import Footer from './components/footer';
import LoadingOverlay from 'react-loading-overlay';
import {PanelGroup, Panel} from 'react-bootstrap';

import JobSidebar from './components/jobsidebar';
import JobItem from './components/jobitem';
import Pagination from '../partials/pagination';

import {withRouter} from 'react-router';

import parser from 'query-string';

import {searchjobs } from '../../actions/general_actions/job';

class Jobs extends Component{

	state = { 
		activeKey: '1', 
		sortText: "Most Relevant", 
		search: {
			query: "",
			category: "",
			industry: "",
			type: "",
			salary: "",
			location: "",
			jobcategory: "",
			per_page: 10,
			page: 1,

		} 
	}

	componentDidMount(){
		const query = parser.parse(this.props.location.search);
		this.setState(st => {
			st.search = {
				...this.state.search,
				...query
			}
			this.props.search(this.props.location.search)
			return st;
		})
	}

	handleSelect = a => this.setState({ activeKey: a }) 
	
	push = false;
	componentDidUpdate(props, state){
		
		let query = this.generatequery();
		
		if(!this.push){
			query = this.props.location.search;
			this.props.history.replace(this.props.location.pathname + query)
			this.push = true;
		}else{
			(this.props.location.search !== query) && 
			this.props.history.push(this.props.location.pathname + query);
		}
		
		(props.location.search !== this.props.location.search) && this.props.search(query);
		
		
	}

	escape(data){
		if(data){
			const escapeMap = require('../../escape.json');
			for(let key of Object.keys(escapeMap)){
				data = data.toString().replace(key, escapeMap[key]);
			}
		}
		return data;
	}

	generatequery = () => {
		let query = "?";
		for(let c of Object.keys(this.state.search)){
			const search = this.escape(this.state.search[c]);
			query = `${query}${c}=${search}&`
		}
		query = query.substring(0, query.length-1)
		return query;
	}


	salary = ""
	sidebarchange = data => {
		this.setState( st => { 
			for(let k of Object.keys(st.search)){
				if(data[k] !== undefined){
					st.search[k] = data[k];
				}
			}
			return st;
		})
		if(data.salary){ this.salary = data.salary }
	}

	pagechange = data => this.setState({ 
		search: {
			...this.state.search,
			page: data.page
		}
	});

	searchchange = data => this.setState({
		search: {
			...this.state.search,
			query: data.query
		}
	})

	render(){
		return (
			<div>
			<div className="banner-job" style={{padding: "10px",background: "url(https://picsum.photos/600/300?random)", backgroundSize: "cover" }}>
					<div className="banner-overlay" />
					<div className="container">
						<Search onChange={this.searchchange}/>
					</div>
			</div>
				
				{/* -------------------------------------------- */}


					<div className="category-info">	
					  <div className="row">
					    <div className="col-md-4 col-sm-4">
							<JobSidebar onChange={this.sidebarchange}/>
					    </div>

					    {/* recommended-ads */}
					    <div className="col-sm-8 col-md-8">				
					      <div className="section job-list-item" style={{padding: "20px 0"}}>
					        <div className="featured-top">
					          { this.props.jobs.data.length !== 0 && 
					          	<h4>Showing {this.props.jobs.from}-{this.props.jobs.to} of {this.props.jobs.total} jobs</h4>
					          }
					    							
					        </div>{/* featured-top */}	
					        
					        { !this.props.loading && 
					        	<table className="table table-striped">
					        		<thead>
										<tr>
											<th>Company</th>
											<th>Industry</th>
											<th>Designation</th>
											<th>Location</th>
											<th>Employment Type</th>
											<th>Salary</th>
										</tr>
					        		</thead>
					        		<tbody>
							        	{ this.props.jobs.data.map((d,k) => <JobItem data={d} key={k} />)  }
					        		</tbody>
					        	</table>
					        }

					        { 	this.props.jobs.data.length === 0 && 
					        	!this.props.loading && 
					        	<h5 className="text-center" style={{margin: "30px 0"}}>Sorry! There are no items to show. Please refine your query and filters.</h5>							
					        }

							{this.props.loading &&
								<LoadingOverlay 
				                  active={ true }
				                  style={{ height: "200px" }}
				                  spinner
				                  color="#333"
				                  text=''
				                  background='white' />
							}

					        <div className="text-center">
								<Pagination url={this.props.match.url} data={this.props.jobs} noshow onChange={this.pagechange}/>	          
						    </div>
					    </div>
					    </div>

					  </div>	
					</div>

				
			</div>
		);
	}
}


export default connect(state => ({
	loading: state.progress.jobsearchloading,
	jobs: state.job.publicjobs
}), dispatch => ({
	search: query => searchjobs(dispatch, query)
}))(withRouter(Jobs));