import React, {Component} from 'react';
import { FacebookProvider, Page } from 'react-facebook';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

import Navbar from './general/components/navbar';
import Jumbotron from './general/components/jumbotron';
import LatestJobs from './general/components/latestjobs';
import FeaturedJobs from './general/components/featuredjobs';
import Footer from './general/components/footer';
import RegisterFor from './general/components/registerfor';
import GeneralJobs from './general/components/generaljobs';
import TopEmployer from './general/components/topemployer';
import JobsByCategory from './general/components/jobsbycategory';
import ScrollUpButton from "react-scroll-up-button";
import JobsBy from './general/components/jobsby';

import {FB_APP_ID} from '../config.js';
import { get_popup } from '../actions/general_actions/site';
import {Modal} from 'react-bootstrap';
import {BASE_URL} from '../config';

var _registration = null;

class Root extends Component{

    state = { active: false }


     componentDidMount(){

        this.registerServiceWorker();

        if(sessionStorage.getItem('entry')==null){
            sessionStorage.setItem('entry','1');
            if(!this.props.popup.id){
                    this.props.get_popup()
                }
        }
    }

    componentDidUpdate(props){
        if(this.props.popup.id !== props.popup.id && this.props.popup.id){
            this.setState({ active: true })
        }
    }
        

    sendNotification=()=>{

        var data = new FormData();
        data.append('title', 'hello');
        data.append('body', 'whats up dipesh');

        fetch(BASE_URL+"/send-notification/1",{
            method:'POST',
            body: data

        }).then(res=>res.json())
        .then(data=>
            console.log(data))
    }
    
    
    registerServiceWorker=()=> {
        

        return navigator.serviceWorker.register('../../sw.js')
        .then((registration)=> {
            console.log('Service worker successfully registered.');
            // new Notification('CONGRATULATIONS',{body:'Service Worker is successfully registered'})
            new Notification('CONGRATULATIONS',{body:'Welcome to RamroCV'})
            console.log(registration)
            _registration = registration;
            return registration;
        })
        .catch((err)=> {
            console.error('Unable to register service worker.', err);
        });
    }

    askPermission=()=> {

        return new Promise(function(resolve, reject) {
            const permissionResult = Notification.requestPermission(function(result) {
                resolve(result);
        });

            if (permissionResult) {
             permissionResult.then(resolve, reject);
            }
        })

        .then((permissionResult)=> {
        
            if (permissionResult !== 'granted') {
                throw new Error('We weren\'t granted permission.');
        }
            else{
                
                this.subscribeUserToPush();
        }
        });
    }

    urlBase64ToUint8Array=(base64String)=> {

        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }


    getSWRegistration=()=>{
        var promise = new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
            if (_registration != null) {
                resolve(_registration);
        }
            else {
                reject(Error("It broke"));
        }
        });
        return promise;
    }

    subscribeUserToPush=()=> {
        this.getSWRegistration()
            .then((registration)=> {
                console.log(registration);
                const subscribeOptions = {
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(
                "BKnj5ntO8sgxp20mn3Cs+iZnsD6Ue9CMJtr/70zryKPY3NUSlyWZRU7/wI/d56UQUi0X4+8R1VfO/9T+4+epjh4="
        )
    };
        return registration.pushManager.subscribe(subscribeOptions);
    })
        .then((pushSubscription)=> {
                console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                this.sendSubscriptionToBackEnd(pushSubscription);
                return pushSubscription;
    });
    }

    sendSubscriptionToBackEnd(subscription) {

            return fetch(BASE_URL+"/save-subscription/1", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify(subscription)
            })
            .then((response)=> {
                console.log(response)
            //     if (!response.ok) {
            //         throw new Error('Bad status code from server.');
            // }
                return response.json();
            })

            .then((responseData)=> {
                console.log(responseData)
            //     if (!(responseData.data && responseData.data.success)) {
            //         throw new Error('Bad response from server.');
            // }
            });
    }
    
    enableNotifications=()=>{
            //register service worker
            //check permission for notification/ask
            this.askPermission();
        }
            

    render() {
        
        return (
            <div>
                <ScrollUpButton />

               
                <Navbar title="Home"/>
  
                <Jumbotron />

   {/*                 <div onClick={this.enableNotifications} className="btn btn-primary">Ask Permission</div>
                    <div onClick={this.sendNotification} className="btn btn-primary">Send Notification</div>

                */}
                <div style={{background: "white", marginTop: "-20px", padding: "20px 0"}}>
                    <h2 style={{fontFamily: "Muli", textAlign: "center", color: "#333"}}>Four Simple Steps to get your <i style={{color: "#db3038", fontFamily: "Raleway"}}>Ramro</i> Job</h2>
                    <div class="container steps" style={{display: "flex", justifyContent: "space-around", textAlign: "center", padding: "40px 0"}}>
                        <Link to="/jobs?query=&category=&industry=&type=&salary=&location=&jobcategory=&per_page=10&page=1">
                            <i class="fa fa-search fa-5x text-green" />
                            <h3>Search for a job</h3>
                        </Link>
                        <Link to="/register/employee">
                            <i class="fa fa-user-plus fa-5x text-yellow" />
                            <h3>Create an account</h3>
                        </Link>
                        <Link to="/dashboard/cvmaker/view">
                            <i class="fa fa-plus-square fa-5x text-blue" />
                            <h3>Create a CV</h3>
                        </Link>
                        <Link to="">
                            <i class="fa fa-check fa-5x text-green" />
                            <h3>Apply</h3>
                        </Link>
                    </div>
                </div>

                    <div className="row">

                        <div className="col-md-9">

                            <div className="row">
                               <div className="col-md-4" style={{paddingLeft:'30px'}} >
                                    <GeneralJobs />
                                </div>

                                <div className="col-md-8">
                                    <FeaturedJobs />
                                </div>
                                
                            </div>
                            
                            <div className="row">
                                <LatestJobs />
                            </div>
                        </div>

                        <div className="col-md-3" >
                               
                            <TopEmployer />
                            <JobsBy />

                            <FacebookProvider appId={FB_APP_ID}>
                                <Page href="https://www.facebook.com/ramrocv/?ref=br_rs" tabs="timeline" />
                            </FacebookProvider> 
                            

                        </div>
                        
                    </div>
                
                    <div className="row">
                        <div className="col-md-12" style={{padding: "20px 0"}}>
                            <JobsByCategory />
                        </div>
                    </div>
                        
                <RegisterFor />

               
                <Footer />

                <Modal show={this.state.active} onHide={() => this.setState({ active: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.popup.name}</Modal.Title>
                    </Modal.Header> 
                    <Modal.Body>
                        <img src={this.props.popup.photo} alt="popup photo" style={{ width: "100%" }}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    componentWillUnmount(){
        clearInterval(this.generalInterval)
    }
}

export default connect(state => ({
    generaljobs: state.general.generaljobs,
    popup: state.general.popup
}), dispatch => ({
    get_popup: () => get_popup(dispatch)
}))(Root);


// - map: phpmyadmin.com
//       to: /home/vagrant/projects/phpMyAdmin 