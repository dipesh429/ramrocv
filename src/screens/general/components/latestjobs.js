import React, {Component} from 'react';
import {connect} from 'react-redux';
import JobItem from './jobitem';
import LoadingOverlay from 'react-loading-overlay';
import ReactTooltip from 'react-tooltip'


import {recentjobs, hotjobs, popularjobs } from '../../../actions/general_actions/job';

class LatestJobs extends Component{
  
  componentDidMount(){
    this.props.get_recentjobs();
    this.props.get_hotjobs();
    this.props.get_popularjobs();
  }

	render(){
		return (
      <div className="section latest-jobs-ads" style={{paddingLeft:'50px'}} >
        <div className="section-title tab-manu">
         <ReactTooltip place="bottom" effect="solid"/>
        
              
          <ul className="custom nav nav-tabs" role="tablist">
            <li role="presentation"><a href="#hot-jobs" data-toggle="tab" aria-expanded="false">Hot Jobs</a></li>
            <li role="presentation"><a href="#recent-jobs" data-toggle="tab" aria-expanded="false">Recent Jobs</a></li>
            <li role="presentation" className="active"><a href="#popular-jobs" data-toggle="tab" aria-expanded="true">Popular Jobs</a></li>
          </ul>


        </div>

        <br/>
        <br/>

        <div className="tab-content">

          <div role="tabpanel" className="tab-pane fade" id="hot-jobs">
            { this.props.hotjobs && this.props.hotjobs.length === 0 && <p className="text-center">No items to show</p>}
            {
              !this.props.hotjobs ?
                <LoadingOverlay 
                  active={true}
                  style={{height: "200px"}}
                  spinner
                  color="#333"
                  text='Loading'
                  background='white' />
              :
                this.props.hotjobs.length >= 1 && 
                <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="fontnav">Company</th>
                        <th className="fontnav">Industry</th>
                        <th className="fontnav">Designation</th>
                        <th className="fontnav">Location</th>
                        <th className="fontnav">Employment Type</th>
                        <th className="fontnav">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.hotjobs.map((d, k) => (
                        <JobItem key={k} data={d}/>
                      )) 
                    }
                    </tbody>                
              </table>
            }
          </div>{/* tab-pane */}
          <div role="tabpanel" className="tab-pane fade" id="recent-jobs">
            { this.props.recentjobs && this.props.recentjobs.length === 0 && <p className="text-center">No items to show</p>}

            {
              !this.props.recentjobs ?
                <LoadingOverlay 
                  active={true}
                  style={{height: "200px"}}
                  spinner
                  color="#333"
                  text='Loading'
                  background='white' />
              :
                this.props.recentjobs.length >= 1 && 
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
                    {
                      this.props.recentjobs.map((d, k) => (
                        <JobItem key={k} data={d}/>
                      )) 
                    }
                    </tbody>                
              </table>
            }	
          </div>{/* tab-pane */}
          <div role="tabpanel" className="tab-pane fade active in" id="popular-jobs">
            { this.props.popularjobs && this.props.popularjobs.length === 0 && <p className="text-center">No items to show</p>}

            {
              !this.props.popularjobs ?
                <LoadingOverlay 
                  active={true}
                  style={{height: "200px"}}
                  spinner
                  color="#333"
                  text='Loading'
                  background='white' />
              :
                this.props.popularjobs.length >= 1 && 
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
                    {
                      this.props.popularjobs.map((d, k) => (
                        <JobItem key={k} data={d}/>
                      )) 
                    }
                    </tbody>                
              </table>
            } 
          </div>{/* tab-pane */}
        </div>{/* tab-content */}
      </div>
		);
	}
}

export default connect(state => ({
  hotjobs: state.general.hotjobs,
  recentjobs: state.general.recentjobs,
  popularjobs: state.general.popularjobs
}), dispatch => ({
  get_recentjobs: () => recentjobs(dispatch),
  get_hotjobs: () => hotjobs(dispatch),
  get_popularjobs: () => popularjobs(dispatch)
}))(LatestJobs);