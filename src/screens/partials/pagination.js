import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import parser from 'query-string';

class Pag extends Component{

	gotopage = (page) => {
		const data = parser.parse(this.props.location.search);
		const query = this.generatequery({...data, page })
		this.props.history.push(this.props.url + query);
		if(this.props.onChange){
			this.props.onChange({page})
		}
	}
	
	generatequery = (data) => {
		let query = "?";
		for(let c of Object.keys(data)){
			query = `${query}${c}=${data[c]}&`
		}
		query = query.substring(0, query.length-1)
		return query;
	}

	generatepagination = () => {
		let data = this.props.data;
		const { current_page, last_page } = data;
		let page = [];
		let page_window = [];
		const window_size = 6;
		for(let i = current_page; i <= current_page + window_size; i++){
			const k = i-(window_size/2);
			if(k < 1){ continue; }
			if(k > last_page){ continue; }
			page_window.push(k);
		}
	
 		return (
			<React.Fragment>
				{
					data.prev_page_url ? 
						<Pagination.Prev onClick={() => this.gotopage(current_page-1) }/>
					: null
				}
				{ page_window[0] >= 2 ? 
					<Pagination.Item onClick={() => this.gotopage(1) }>{1}</Pagination.Item> 
					: null
				}
				{
					page_window[0] >= 3 ? 
						<Pagination.Ellipsis onClick={() => this.gotopage(page_window[0]-1) }/>
					: null
				}
				{
					page_window.map((d,k) => {
						return (
							<Pagination.Item
								key={k}
								onClick={() => this.gotopage(d)}
								active={Number(current_page) === d}>{d}</Pagination.Item>
						)						
					})
				}
				{ page_window[page_window.length-1] <= last_page - 2 ? 
					<Pagination.Ellipsis onClick={() => this.gotopage( page_window[page_window.length-1] + 1 )}/> 
					: null
				}
				{ page_window[page_window.length-1] <= last_page - 1 ?
					<Pagination.Item onClick={() => this.gotopage(last_page)}>{last_page}</Pagination.Item>
					:null
				}

				{
					data.next_page_url ? 
						<Pagination.Next onClick={() => this.gotopage(current_page + 1) }/>
					: null
				}
			</React.Fragment>
		)
	}

	render(){
		let data = this.props.data;
		return (
			<React.Fragment>
				<Pagination className={this.props.className}>
					{this.generatepagination()}
				</Pagination>
				{
					!this.props.noshow ?
						<span>Showing {data.from}-{data.to} of {data.total} results</span>
					: null
				}
			</React.Fragment>
		)
	}
}

export default withRouter(Pag);