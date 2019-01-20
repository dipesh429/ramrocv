import React from 'react';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip'


let item = props => {
	const { id, title, companyname, photo, location,locations, type, salary, industrys, companyid } = props.data;
  let sal = salary;
  try{ 
    sal = JSON.parse(sal)
  }catch(e){ }
  return (
    <tr>
      <td>
          
          <div className="item-image-box" data-tip={companyname}>
            <div className="item-image">
            <ReactTooltip place="bottom" effect="solid"/> 

              <Link to={`/company/view/${companyid}`}>
                {
                  !photo && 
                  <div style={{width: "48px", height: "48px", float: "left", position: "relative" }}>
                      <div style={{background: "#db3038", color: "white", height: "100%", borderRadius: "5px"}}>
                          <h3 className="text-center" style={{ marginTop: 0, paddingTop: "10px" }}>{companyname[0].toUpperCase() }</h3>
                      </div>
                  </div>
                }
                { photo &&
                <img src={photo} style={{width: "48px", height: "48px"}} alt="JobItem" className="img-responsive" />
                }
            </Link>
          </div>
        </div>
      </td>
      <td  data-tip={industrys&&industrys.length>20 ? industrys : null }> 
        {industrys&&industrys.length>20 ? industrys.substring(0, 20)+' ...' : industrys}
      </td>
      <td data-tip={title&&title.length>20 ? title : null }>
        <Link className="listingstyle" to={`/job/view/${id}`}>{title&&title.length>20 ? title.substring(0, 20)+' ...' : title}</Link>
      </td>
     
       <td  data-tip={locations&&locations.length>20 ? locations : null }>
        {locations&&locations.length>20 ? locations.substring(0, 20)+' ...' : locations}
      </td>
      <td >
        {type}
      </td>
      <td >
        {sal && sal.min ? `${sal.min} - ${sal.max}` : sal}
      </td>
      <td>
        <div style={{float: "right"}}>
          { localStorage.getItem("type") !== "employer" &&
          <Link to={ localStorage.getItem("type") ? `/dashboard/job/apply/${id}` : '/login'} className="btn btn-primary">Apply Now</Link>
          }
        </div>
      </td>
    </tr>         
	);
}

export default item;