import React, {Component} from 'react';

const jQuery = window.jQuery;

export default class Modal extends Component{
    constructor(props){
        super(props);
        this.modal = null;
    }
    
    componentDidUpdate(){
        if(this.props.activate){
            jQuery(this.modal).modal({ backdrop: 'static' });
        }
    }

    render(){
        return (
            <div className={`modal ${this.props.modalType} fade in`} ref={a => (this.modal = a) }>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">{ this.props.title }</h4>
                        </div>
                        <div className="modal-body">
                            { this.props.children }
                        </div>
                        <div className="modal-footer">
                            { (this.props.positiveText) ? (<button type="button" className="btn btn-outline"> {this.props.positiveText} </button>) : null }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
