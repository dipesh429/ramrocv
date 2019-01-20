// root screen 
import React, {Component} from 'react';

import { FacebookProvider, Page } from 'react-facebook';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

import Jumbotron from './general/components/jumbotron';
import LatestJobs from './general/components/latestjobs';
import FeaturedJobs from './general/components/featuredjobs';
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

import Jobs from '../screens/general/jobs';
import VerifyMessage from '../screens/general/verifymessage';
import JobIndividual from '../screens/general/jobindividual';
import EmployerIndividual from '../screens/general/employerindividual';
import Blogs from '../screens/general/blogs';
import BlogIndividual from '../screens/general/blogindividual';
import About from '../screens/general/about';
import Contact from '../screens/general/contact';
import Terms from '../screens/general/terms';
import JobSeek from '../screens/general/jobseek';

import InstitutionProfile from '../screens/institution/profile/profile'
import Offer from '../screens/institution/offer'


var _registration = null;

class Initial extends Component{

    state = { active: false }


     componentDidMount(){

        // this.registerServiceWorker();

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
        

   /* sendNotification=()=>{

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
        }*/
            

    render() {
        
        return (
        	<div>
        
        		<Jumbotron />

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

                            <FacebookProvider appId={FB_APP_ID}>
                                <Page href="https://www.facebook.com/ramrocv/?ref=br_rs" tabs="timeline" />
                            </FacebookProvider> 
                            
                            <JobsBy />

                        </div>
                        
                    </div>
                
                    <div className="row">
                        <div className="col-md-12" style={{padding: "20px 0"}}>
                            <JobsByCategory />
                        </div>
                    </div>
                        
                <RegisterFor />


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
}))(Initial);

