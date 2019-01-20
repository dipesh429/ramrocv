import React, {Component} from 'react';

export default class Dialog extends Component{

	componentDidUpdate(props){
		if(this.props.active !== props.active){
			if(this.props.active === true){
				 window.jQuery(this.modal).modal({backdrop: 'static'});
			}else{
				window.jQuery(this.modal).modal('hide');
			}
		}
	}

	render(){
		return (
			<div className={`modal ${this.props.modalType} fade`} ref={a => { this.modal = a; } }>
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.negativeCallback}>
			          <span aria-hidden="true">×</span></button>
			        <h4 className="modal-title">{this.props.title}</h4>
			      </div>
			      <div className="modal-body">
			        {this.props.children}
			      </div>
			      <div className="modal-footer">
			        <button type="button" className={`btn pull-left ${this.props.negativeButtonClassName || "btn-outline" }`} onClick={this.props.negativeCallback}>{this.props.negativeText ? this.props.negativeText : "Close"}</button>
			        <button type="button" className={`btn ${this.props.positiveButtonClassName || "btn-outline" }`} onClick={this.props.positiveCallback}>{this.props.positiveText ? this.props.positiveText : "Save changes" }</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}