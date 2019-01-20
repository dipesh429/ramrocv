import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip'




import {get_top_employer} from '../../../actions/general_actions/site';

class GeneralJobs extends Component{
	
	state = { pausegeneral: false }
	
	pauseGeneralJobs = () => {
        this.setState({ pausegeneral: true })
    }

    resumeGeneralJobs = () => {
        this.setState({ pausegeneral: false })
    }

    topEmployerDOM = [];

    componentDidMount(){

        this.props.gettopemployer();
        
        document.body.className="";
        
        // this.generalInterval = setInterval(() => {

        //     if(this.props.topemployer && this.props.topemployer.length <= 1){ return; }

        //     if(this.props.topemployer && (this.props.topemployer.length !== 0) && !this.state.pausegeneral ){
        //         let first = this.props.topemployer[0]
        //         let second = this.props.topemployer[1]
        //         let rem = this.props.topemployer.slice(2)
        //         rem.push(first)
        //         rem.push(second)
        //         let ht = window.getComputedStyle(this.topEmployerDOM[0]).height.split("px")[0]
        //         ht = -(Number(ht)+10);
        //         ht = ht + "px";
        //         if(this.gen){
        //             this.gen.style.transition = "transform 500ms ease"
        //             this.gen.style.transform = `translateY(${ht})`; 
        //             setTimeout(() => { 
        //                 this.props.changeTopEmployer(rem)
        //                 if(this.gen){
        //                     this.gen.style.transition = "none";
        //                     this.gen.style.transform = `translateY(0px)`;
        //                 }
        //                 this.topEmployerDOM[0].className = "job-ad-item";
        //             }, 700)
        //         }
        //     }
        // }, 3000) 
    }

    componentWillUnmount(){
        clearInterval(this.generalInterval)
    }
	
	render(){

		let topemployer

        if(this.props.topemployer && (this.props.topemployer.length !== 0)){

            topemployer = this.props.topemployer.map((d,k) => (

                        <div className='col-xs-4' style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#eee'}} key={k} ref={ r => this.topEmployerDOM.push(r) }>
                              <ReactTooltip place="bottom" effect="solid"/>       
                            <Link to={`/company/view/${d.id}`}>
                                {
                                    d.image ? 
                                    <img data-tip={d.company} src={d.image} alt="topemployer" style={{ display: "inline-block", width: "100px", height: "100px",objectFit: "contain", borderStyle: 'solid',borderRadius: "10px" }}/>
                                    :
                                    <div style={{width: "60px", height: "100px"}}>
                                     <div  style={{display: "inline-block",width: "60px", height: "70px", background: "#db3038", color: "#fff", borderRadius: "10px" ,marginTop:'15px'}}>
                                        <h1 data-tip={d.company} style={{marginTop: "20px",marginLeft: "18px"}}>{d.company[0].toUpperCase()}</h1>
                                    </div>
                                        
                                    </div>
                                   
                                }
                            
                              {/* <h5 className="text-danger">{d.company}</h5>*/}
                            </Link>
                        </div>
                   ))
        }


		return (
			<div className="section category-items custom" style={{width: "100%", paddingBottom: "40px", paddingTop: "0", marginTop: "30px"}}>
                
                <div className="section-title text-center">
                    <h4 style={{height:'40px',borderBottom: '2px solid #ddd', paddingTop:'10px'}}>
                           

                      <span style={{color:'#db3038'}}> TOP </span>  <span style={{color:'#0261a6'}}>EMPLOYER</span></h4>
                </div>
                <div style={{ overflowY: "hidden" }} onMouseEnter={this.pauseGeneralJobs} onMouseLeave={this.resumeGeneralJobs}>
	                <div style={{ maxHeight: "545px", padding: "0 10px", overflowY: "hidden", transition: "transform 500ms ease" }} ref={gen => this.gen = gen}>

	                    { this.props.topemployer && this.props.topemployer.length !== 0 ? topemployer 
                                
	                        : <p className="text-center"> No items to show </p>
                        }
                            
	                   {  

                            !this.props.topemployer && <LoadingOverlay 
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
    topemployer: state.general.topemployer
}), dispatch => ({
    gettopemployer: () => get_top_employer(dispatch),
    changeTopEmployer: (data) => dispatch({ type: "TOP_EMPLOYER", data: data })
}))(GeneralJobs);