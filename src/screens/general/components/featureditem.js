import React from 'react';
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip'


let onclickitem = (id, history) => {
	history.push(`/job/view/${id}`);
	return false;
}

const expires = (date) => {
  const start = moment(date, "YYYY-MM-DD");
  const end = moment()
  return Math.ceil(moment.duration(start.diff(end)).asDays()) 
}

let item = props => {
  let sal = props.data.salary;
  try {
    sal = JSON.parse(props.data.salary);
  }catch(e){}
	return (
        <div style={{margin: "10px"}} className="hover">
        
          <div className="category-icon " style={{border: "1px solid #eee"}}>
           <ReactTooltip place="bottom" effect="solid" />
            <Link to={`/job/view/${props.data.id}`}>
             
            {props.data.photo ? 
             

              <img src={ props.data.photo } alt="JobItem" className="img-responsive" style={{ borderRadius: "5px", height: "100px", width: "100px", objectFit: "contain", display: "inline-block"}}/>
              
              :
                 // <Link to={`/job/view/${props.data.id}`}>
                <div style={{ textAlign: "center"}}> 
                  <div style={{display: "inline-block", height: "70px", width: "100px",color: "#fff", background: "#db3038", borderRadius: "10px", marginTop: "20px",marginBottom:'10px'}}>
                    <h2 >{ props.data.companyname[0].toUpperCase() }</h2>
                  </div>
                </div>
                // </Link>
            }
{/*            <Link to={`/company/view/${props.data.companyid}`}>
*/}          

              <p className="fontnav" data-tip={props.data.companyname.length>18 ? props.data.companyname : null } style={{fontWeight: 500, fontSize: "14px", color: "black", textAlign:'left', paddingLeft:'7px', textTransform: "uppercase"}}>{props.data.companyname.length>18 ? props.data.companyname.substring(0, 18)+' ..' : props.data.companyname}</p>
            
          <span className="fontnav" data-tip={props.data.locationss && props.data.locationss.length>11 ? props.data.locations : null } className="category-quantity" style={{textAlign: "left"}}><i className="fa fa-map-marker"></i>&nbsp; {props.data.locations && props.data.locations.length>11 ? props.data.locations.substring(0, 11)+' ...' : props.data.locations?props.data.locations:'Not Available'}</span>
          </Link>
          </div>
          <div style={{textAlign: "left", padding: "10px", background: "#f1f1f1"}}>
            
             
            
            <p>
              <Link className="fontnav" to={ localStorage.getItem("type") ? `/dashboard/job/apply/${props.data.id}` : '/login'} className="btn btn-primary" >Apply Now</Link>
            </p>
          </div>
        </div>
	);
}

export default item;