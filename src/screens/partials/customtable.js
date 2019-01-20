import React, {Component} from 'react';

let Action = () => null;

class CustomTable extends Component{

	action = null;
	link_field = [];

	componentDidMount(){
		
		if(this.props.children && (this.props.children.constructor === Object)){
			if(this.props.children.type === Action){
				this.action = this.props.children.props.children;
			}
		}
	}

	componentDidUpdate(){
		if(this.props.children && (this.props.children.constructor === Object)){
			if(this.props.children.type === Action){
				this.action = this.props.children.props.children;
			}
		}	
	}

	render(){

		let thead = this.props.heading.map(d => {
			if(d.link === true ){
				this.link_field.push(d.field);
			}
			return (
				<th key={d.field}>{d.name}</th>
			)
		});

		if(this.action){
			thead.push(<th key="action">Action</th>)
		}
		let data = this.props.data.map((d, k) => 
			(
				<React.Fragment key={k}>
					{ this.mapdata(d, k) }
				</React.Fragment>
			)			
		);
		
		return (
			<table className="table table-striped">
				<tbody>
					<tr>
						{thead}
					</tr>
					{data}
				</tbody>
			</table>
		)	
	}

	mapdata = (data, k) => {
		let ret = [];
		for(let h of this.props.heading){
			if(this.link_field.includes(h.field)){
				ret.push(
					<td key={`${k}-${h.field}`}><a target="_blank" style={{wordWrap: 'break-word', color: '#db3038'}} href={ data[h.field] }>{ data[h.field] ? (data[h.field].length > 22 ? data[h.field].substr(0, 22) + "...": data[h.field]) : "" }</a></td>
				)
			}else{
				ret.push(
					<td key={`${k}-${h.field}`}>{ data[h.field] ? (data[h.field].length > 30 ? data[h.field].substr(0, 30) + "...": data[h.field] ) : "" }</td>
				)
			}
		}

		if(this.action){
			ret.push(
				<td key={`${k}-action`}>
					<div className="btn-group" role="group" data-key={data.id} style={{width: "160px"}}>
						{ this.action }
					</div>
				</td>
			)
		}
		return <tr key={data.id}>{ret}</tr>;	
	}

	componentWillUnmount(){
		this.action = null;
	}
}

// exposing sub component
CustomTable.Action = Action;
export default CustomTable;