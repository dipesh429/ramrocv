import React, {Component} from 'react'
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip'


export default class Search extends Component{

	state = {
		
		search:""
	
	}

	

	updateSearch=(event)=>{
		
		this.setState({
			search: event.target.value
		},()=>{
			 this.code()
		})

	}

	code(){

		let filterContents = this.props.items.filter(each=>{
				return each.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			})
		
			this.props.searchh(filterContents)

	}

	render(){
		
		
		return (

			<div>

			<div className="input-group input-group-sm" style={{width: 150,float:'Right'}}>
		        <input type="text" name="table_search" className="form-control pull-right" 
		               placeholder={this.props.placeholder} value={this.state.search} onChange={this.updateSearch} />
		        <div className="input-group-btn">
		            <button type="submit" className="btn btn-default"><i className="fa fa-search" /></button>
		        </div>
		    </div>
		    <div className="clearfix"></div>


		    </div>
					
		)
	}
}

