import React, {Component} from 'react';
import {asField, TextArea } from 'informed';

class TA extends Component{

    componentDidUpdate(props){
        if(this.props.value !== props.value){
            this.props.fieldApi.setValue(this.props.value)
        }
    }

    componentDidMount(){
        this.props.fieldApi.setValue(this.props.value)
    }

    render(){
        const { error, field, label, ...props } = this.props;
        return (
            <div className={ "form-group has-feedback " + (error ? 'has-error': '') }>
                { (label) ? <label>{label}</label> : null }
                <TextArea field={field} {...props} />
                <span className="help-block">{ error ? error : '' }</span>
            </div>
        );
    }
}

export default asField(TA);