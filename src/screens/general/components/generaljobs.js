import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip'


import {getgeneral} from '../../../actions/general_actions/job';

class GeneralJobs extends Component{
	
	state = { pausegeneral: false }
	
	pauseGeneralJobs = () => {
        this.setState({ pausegeneral: true })
    }

    resumeGeneralJobs = () => {
        this.setState({ pausegeneral: false })
    }

    generaljobsDOM = [];

    componentDidMount(){

        this.props.getgeneraljobs();
        
        document.body.className="";
        
        this.generalInterval = setInterval(() => {
            
            if( this.props.generaljobs && ( this.props.generaljobs.length <= 1) ){ 
                if(this.gen){
                    this.gen.style.transform = `translateY(0px)`
                }
                return; 
            }

            if( this.props.generaljobs && (this.props.generaljobs.length !== 0) && !this.state.pausegeneral ){
                let first = this.props.generaljobs[0]
                let rem = this.props.generaljobs.slice(1)
                rem.push(first)
                let ht = window.getComputedStyle(this.generaljobsDOM[0]).height.split("px")[0]
                ht = -(Number(ht)+10);
                ht = ht + "px";
                if(this.gen){
                    this.gen.style.transition = "transform 500ms ease"
                    this.gen.style.transform = `translateY(${ht})`; 
                    setTimeout(() => { 
                        this.props.changeGeneralJobs(rem)
                        if(this.gen){
                            this.gen.style.transition = "none";
                            this.gen.style.transform = `translateY(0px)`;
                        }
                        this.generaljobsDOM[0].className = "job-ad-item custom";
                    }, 700)
                }
            }
        }, 2000) 
    }

    componentWillUnmount(){
        clearInterval(this.generalInterval)
    }
	
	render(){

		let generaljobs

        if(this.props.generaljobs && this.props.generaljobs.length !== 0){

            generaljobs = this.props.generaljobs.map((d,k) => (
                        <div className="job-ad-item custom" style={{ padding: "5px 10px", position: "relative" }} key={k} ref={ dom => this.generaljobsDOM.push(dom) }>
                            <Link to={`/job/view/${d.id}`}>
                                <div style={{display: "flex", flexWrap: "wrap"}}>
                                    <div style={{flex: 3, alignSelf: "center"}}>
                                        {d.image ? 
                                            <img src={d.image} alt="jobitem" style={{width: "50px", height: "50px", float: "left", marginTop: "10px", marginRight: "5px" }}/>
                                            :
                                            <div style={{width: "50px", height: "50px", float: "left", position: "relative", marginTop: "10px", marginRight: "5px" }}>
                                                <div style={{background: "#db3038", color: "white", height: "100%", borderRadius: "5px"}}>
                                                    <h3 className="text-center" style={{ marginTop: 0, paddingTop: "10px" }}>{d.companyname[0].toUpperCase() }</h3>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div style={{flex: 8}}>
                                        <h5  data-tip={d.title.length>22 ? d.title : null } className="text-danger">{d.title.length>22 ? d.title.substring(0, 22)+' ...' : d.title}</h5>
                                        <p  data-tip={d.companyname.length>22 ? d.companyname : null } style={{color: "#555"}}>{d.companyname.length>22 ? d.companyname.substring(0, 22)+' ...' : d.companyname}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                   ))
        }


		return (
			<div className="section category-items custom" style={{width: "100%", paddingTop: "0", marginTop: "30px", ...this.props.style }}>
	            <ReactTooltip place="bottom" effect="solid"/>
                            
                <div className="section-title text-center">
	                <h4 style={{height:'40px',borderBottom: '2px solid #ddd',paddingTop:'10px'}}>
	                           <span style={{color:'#db3038'}}> GENERAL </span> <span style={{color:'#0261a6'}}>JOBS </span></h4>

	            </div>
                {this.props.generaljobs && this.props.generaljobs.length === 0 && <p className="text-center">No items to show</p>}
	            <div style={{overflowY: "hidden"}} onMouseEnter={this.pauseGeneralJobs} onMouseLeave={this.resumeGeneralJobs}>
	                <div style={{ maxHeight: "545px", padding: "0 10px", overflowY: "hidden", transition: "transform 500ms ease" }} ref={gen => this.gen = gen}>

	                    { this.props.generaljobs ? generaljobs 

	                        : 
	                        <LoadingOverlay 
	                          active={true}
	                          style={{height: "200px"}}
	                          spinner
	                          color="#333"
	                          text=''
	                          background='white' />
	                    }
	                    
	                </div>
	            </div>
	        </div>

		)

	}
}

export default connect(state => ({
    generaljobs: state.general.generaljobs
    // generaljobs: []
}), dispatch => ({
    getgeneraljobs: () => getgeneral(dispatch),
    changeGeneralJobs: (data) => dispatch({ type: "GENERAL_JOBS", data: data })
}))(GeneralJobs);