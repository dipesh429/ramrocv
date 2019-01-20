import React, {Component} from 'react';
import {asField, Text} from 'informed';

const jQuery = window.jQuery;

class Tags extends Component{

    input = null;

    componentDidMount(){
        this.input = jQuery(`#${this.props.id}`);
        this.input.val(this.props.value);
        this.input.tagsinput('items');
        this.input.on("change", this.change);
        this.change();
    }

    componentDidUpdate(props){
        if(this.props.value !== props.value){
            this.input.tagsinput('removeAll');
            this.input.val(this.props.value);
            this.input.tagsinput('add', this.props.value);
            this.input.tagsinput('refresh');
            this.props.fieldApi.setValue(this.props.value);
        }
    }

    change = () => {
        let val = this.input.val();
        this.props.fieldApi.setValue(val);
    }


    render(){
        const { error, field, label, id, ...props } = this.props;
        return (
            <div className={ "form-group has-feedback " + (error ? 'has-error': '') }>
                { (label) ? <label>{label}</label> : null }
                <Text {...props} field={field} id={id}/>
                <span className="help-block">{ error ? error : '' }</span>
            </div>
        );
    }
}

export default asField(Tags);