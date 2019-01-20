import React from 'react';
import {Link} from 'react-router-dom';

let footer = props => {
	return (
    
        <div>
        <div className="bg-mdgray py-4 text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <p className="font-xs text-lightgray text-justify " style={{paddingTop:'7px'}}>
                  RamroCV is a specialized recruitment firm that operates as a sister organization of Renovative Venture Nepal (RVN). RVN is a Management Consultant which was established in August, 2015. We solely facilitate a complete recruitment solution. We are here to help you achieve your desired designation based upon your skills, experience, and existing salary package. RamroCV is a perfect platform where job providers and seekers meet. <Link to="/about" target="_blank">Read more...</Link>
                </p>


              </div>
              <div className="col-md-2">
                <h6>FOR JOBSEEKER</h6>
                <ul className="list-unstyled font-sm">
                  <li ><Link to="/register/employee" target="_blank" className="text-lightgray secondary-hover"> Register</Link></li>
                  <li ><Link to="/jobs" target="_blank" className="text-lightgray secondary-hover"> Search Jobs</Link>
                  </li>
                  <li ><Link to="/login" target="_blank" className="text-lightgray secondary-hover">
                      Login</Link></li>
                  <li ><Link to="/blogs" target="_blank" className="text-lightgray secondary-hover"> RCV BLOGS </Link></li>
                  
                </ul>
              </div>
              <div className="col-md-2">
                <h6>FOR EMPLOYER</h6>
                <ul className="list-unstyled font-sm">
                  <li><Link to="/jobs" target="_blank" className="text-lightgray secondary-hover">Post a
                      Job</Link></li>
                  <li><Link to="/register/employee" target="_blank" className="text-lightgray secondary-hover">Register</Link>
                  </li>
                  <li><Link to="/login" target="_blank" className="text-lightgray secondary-hover">Login</Link>
                  </li>
                  
                </ul>
              </div>
              <div className="col-md-2">
                <h6>ABOUT US</h6>
                <ul className="list-unstyled font-sm">
                  <li><Link to="/about" target="_blank"  className="text-lightgray secondary-hover" >About
                      RamroCV</Link></li>
                  
                  <li><a className="text-lightgray secondary-hover" href="https://www.facebook.com/ramrocv/" target="_blank">Facebook</a></li>
                  <li><a className="text-lightgray secondary-hover" href="https://twitter.com/ramrocv" target="_blank">Twitter</a></li>
                  <li><a className="text-lightgray secondary-hover" href="https://www.linkedin.com/company/ramrocv/" target="_blank">LinkedIn</a></li>
                  <li><a className="text-lightgray secondary-hover" href="https://www.instagram.com/ramrocv/" target="_blank">Instagram</a></li>

                 
                </ul>
              </div>
              <div className="col-md-2">
                <h6>CONTACT US</h6>
                <div className="media">
                  <div className="media-left">
                    <span className="fa fa-map-marker mr-2" />
                  </div>
                  <div className="media-body">
                    <p className="text-lightgray ml-2 font-xs mb-1" >
                      Patan Sundhara<br />Kathmandu, Nepal
                    </p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-left">
                    <span className=" fa fa-phone mr-2" />
                  </div>
                  <div className="media-body">
                    <p className="text-lightgray font-sm mb-1 mt-1">+977 01-5555113</p>
                    <p className="text-lightgray font-sm mb-1 mt-1">+977 01-5555114</p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-left">
                    <span className="fa fa-envelope mr-2" />
                  </div>
                  <div className="media-body">
                    <a className="text-lightgray  font-sm" href="mailto:info@merojob.com">info@ramrocv.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
     
  );

}

export default footer;