// login modal component
import React, {Component} from 'react';

import {Modal} from 'react-bootstrap';

export default class LoginModal extends Component{
	
	render(){
		return (
			<Modal show={this.props.show} onHide={this.props.onClose}>
					<Modal.Header closeButton>
						<Modal.Title>Login to RamroCV.com</Modal.Title>
					</Modal.Header>
			
					<Modal.Body>
						<h1>Hello Form Modal</h1>
					</Modal.Body>
			</Modal>
		);
	}

}