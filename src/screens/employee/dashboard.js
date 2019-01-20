import React, {Component} from 'react';
import Wrapper from '../partials/wrapper';
import {Box} from 'reactjs-admin-lte'
import GeneralJobs from '../general/components/generaljobs';
import moment from 'moment';
import {Alert} from 'react-bootstrap';
import {connect} from 'react-redux';

import {getdashboard} from '../../actions/employee';

import LoadingOverlay from 'react-loading-overlay';

class Dashboard extends Component{

	componentDidMount(){
		this.props.getdashboard(localStorage.getItem("employee_id"))
	}

    render(){
        return (
            <Wrapper heading="Dashboard">
				<div className="row">
				

					<div className="col-md-9">
						{this.props.loading &&
							<LoadingOverlay 
			                    active={true}
			                    style={{height: "200px"}}
			                    spinner
			                    color="#333"
			                    text=''
			                    background='white' />
						}
						{ !this.props.loading && 
							<React.Fragment>
								<div className="row">
									<div className="col-md-6">
										<div className="info-box bg-red">
											<span className="info-box-icon"><i className="ion ion-ios-checkmark" /></span>
											<div className="info-box-content">
												<span className="info-box-text">CV Completeness</span>
												<span className="info-box-number">{this.props.data.completeness}%</span>
												<div className="progress">
													<div className="progress-bar" style={{width: `${this.props.data.completeness}%`}} />
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="info-box bg-blue">
											<span className="info-box-icon"><i className="ion ion-ios-paper" /></span>
											<div className="info-box-content">
												<span className="info-box-text">CV Created</span>
												<span className="info-box-number">{this.props.data.cv}</span>
											</div>
										</div>
									</div>
								</div>
								
								<div className="row">
								
									<div className="col-md-6">
										<div className="info-box">
											<span className="info-box-icon bg-aqua"><i className="ion ion-ios-paper"></i></span>

											<div className="info-box-content">
												<span className="info-box-text">Applied Jobs</span>
												<span className="info-box-number">{this.props.data.appliedjob}</span>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="info-box">
												<span className="info-box-icon bg-green"><i className="ion ion-eye"></i></span>

											<div className="info-box-content">
												<span className="info-box-text">CV Views</span>
												<span className="info-box-number">{this.props.data.views}</span>
											</div>
										</div>
									</div>
								</div>
							</React.Fragment>
						}

					
					</div>
					<div className="col-md-3">
						<GeneralJobs style={{ marginTop: 0 }}/>
					</div>
				</div>            	
            </Wrapper>
        );
    }
}

export default connect(state => ({
	loading: state.progress.dashboardloading,
	data: state.employee.dashboard
}), dispatch => ({
	getdashboard: (id) => getdashboard(dispatch, id)
}))(Dashboard);