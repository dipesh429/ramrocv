import React, {Component} from 'react'
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip'


export default class FollowCore extends Component{

	state = {

		item_no:8,
	}

	render(){

		let items = this.props.items.filter((each,index)=> (
    									index<this.state.item_no
			))

		return (

			 <div>

			 {items.reverse().map((each,index)=>(
				<div style={{padding:'10px 0px'}}>
				<ReactTooltip place="bottom" effect="solid"/> 

			 	<label data-tip={each.name.length>28 ? each.name : null} style={{display:'inline-block'}}>{each.name.length>28 ? each.name.substring(0, 28)+' ...' : each.name}</label> 
			 	<div style={{float:'right',width:'100px'}} class={this.props.text=="UnFollow"?"btn btn-danger":"btn btn-success"} onClick={()=>this.props.method(each.id) }>{this.props.text}</div>
			 	<div className='clearfix'/> 
				</div>	

				))}

{/*			 {this.state.item_no < this.props.items.length && <div class="btn btn-primary" onClick={()=>this.setState({item_no:this.state.item_no+5})}>See More</div>}
*/}
			</div>
					
		)
	}
}

