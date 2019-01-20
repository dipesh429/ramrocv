import React, {Component} from 'react';
import {connect} from 'react-redux';
import { asField } from 'informed';
import AwardsComponent from './awardscomponent';
import Dialog from '../../partials/dialog';
import {Box} from 'reactjs-admin-lte';
import {postcv} from '../../../actions/employee';

class AddRemoveWrapper extends Component{
	
	state = {
		key: 0, index: null,
		modalActive: false,
		fields: []
	}

	values = [];

	componentDidUpdate(props){
		if((this.props.data.length !== props.data.length) && this.props.data ){
			this.renderfield();
		}
	}

	componentDidMount(){
		this.renderfield();
	}

	updated = (key, value) => {
		this.values[key] = value;
		this.sortandupdate();
	}

	renderfield = () => {
		this.setState(state => {

			let st = [];
			state.key = 0;

			const InternalComponent = this.props.internalComponent;

			if(this.props.data && (this.props.data.length === 0)){
				st.push(
					<InternalComponent
						updateCallback={ this.updated } 
						key={"first"} 
						i={state.key} 
						deleteCallback={i => this.setState({ modalActive: true, index: i }) } />
				)
				state.key = state.key + 1
				state.fields = st;
				return state;
			}
			
			if(typeof this.props.data !== "object"){ return state; }	

			for(let data of this.props.data){
				st.push(
					<InternalComponent 
						updateCallback={ this.updated } 
						key={state.key} 
						i={state.key} 
						data={data}
						deleteCallback={i => this.setState({ modalActive: true, index: i}) } />
				);
				state.key = state.key + 1;
			}
				
			state.fields = st;
			return state;

		});		
	}

	// do some react magic over here
	addfield = () => {
		
		const InternalComponent = this.props.internalComponent; 

		this.setState(state => {

			let i = state.count;
			state.fields.push(
				<InternalComponent 
					updateCallback={ this.updated }
					key={state.key} 
					i={state.key} 
					deleteCallback={i => this.setState({ modalActive: true, index: i}) } />
			);

			state.key = state.key + 1;

			return state;

		});
	}

	removefield = i => {

		this.values[i] = null;
		this.setState(state => {
			let st = state;
			st.modalActive = false;
			st.count = state.count - 1;
			st.fields[i] = null;
			return st;
		});
		this.sortandupdate();
	}


	sortandupdate = () => {
		let d = [];
		for(let a of this.values){
			if(a){
				d.push(a);
			}
		}
		this.props.fieldApi.setValue(d);
	}

	render(){
		return (
			<React.Fragment>
	        	<div className="row">
					<div className="col-md-12">
						{ this.state.fields }     
					</div>   		
	        	</div>

				<a className="btn btn-default" style={{margin: "20px 0"}} data-toggle="tooltip" title="Add Entry" onClick={() => { this.addfield(); } }><i className="fa fa-plus" /> &nbsp; Add Entry</a>
	        	
	        	<Dialog 
					active={this.state.modalActive} 
					modalType="modal-warning" 
					title="Delete" 
					positiveText="Yes" 
					negativeText="Cancel" 
					positiveCallback={() => this.removefield(this.state.index) }
					negativeCallback={() => this.setState({ modalActive: false }) }>
					Do you want to delete this field ?
				</Dialog>	

			</React.Fragment>		
		);
	}
}

export default asField(AddRemoveWrapper);

