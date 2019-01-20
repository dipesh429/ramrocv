import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
import FeaturedItem from './featureditem';

import { getfeatured } from '../../../actions/general_actions/job';

import { Carousel } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';

class FeaturedJobs extends Component{

  componentDidMount(){
    if(!this.props.jobs){
      this.props.getjobs();
    }
  }

  makechunk = () => {
    let chunks = [], tot = [];
    if(this.props.jobs){
      const CHUNK = 8;
      for(let i = 0; i < (this.props.jobs.length / CHUNK); i++ ){
        chunks = this.props.jobs.slice(0+i*CHUNK,CHUNK+i*CHUNK)
        tot.push(chunks)
      }
    }
    return tot;
  }

  render() {

    return (
          <div className="section category-items  text-center" style={{width: "100%", marginBottom:"15px", paddingTop: "0", marginTop: "30px"}}>
            <div className="section-title">
	            <h4 style={{height:'40px',borderBottom: '2px solid #ddd',paddingTop:'10px'}}>
              <span style={{color:'#db3038'}}><i className="glyphicon glyphicon-fire" ></i> FEATURED </span> <span style={{ color: '#0261a6' }}>JOBS </span></h4>
            </div>
            { this.props.jobs && this.props.jobs.length === 0 && <p className="text-center">No items to show</p>}
            {
              !this.props.jobs ? 
                <LoadingOverlay 
                  active={true}
                  style={{height: "200px"}}
                  spinner
                  color="#333"
                  text=''
                  background='white' />
              : 
                this.props.jobs.length >= 1 && <Carousel interval={null} >
                
                  {
                    this.makechunk().map((d, ky) => (
                        <Carousel.Item key={ky}>
                          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: "100%"}}>
                            {
                              d.map((job, k) => <React.Fragment key={k}>
                                                  <FeaturedItem data={job} history={this.props.history}/>
                                                </React.Fragment>)
                            }
                          </div>
                          
                        </Carousel.Item>
                    ))
                  }
                </Carousel>
            }

          </div>		
    );
  }
}

export default connect(state => ({
  jobs: state.general.featuredjobs
}), dispatch => ({
  getjobs: () => getfeatured(dispatch)
}))(withRouter(FeaturedJobs));

