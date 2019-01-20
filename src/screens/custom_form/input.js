import React, {Component} from 'react';
import { asField, Text } from 'informed';

class CustomInput extends Component{
    componentDidMount(){
        if(this.props.value){
            this.props.fieldApi.setValue(this.props.value);
        }
    }

    componentDidUpdate(props){
        if(this.props.value !== props.value){
            this.props.fieldApi.setValue(this.props.value);
        }
    }

    render(){
        const {field, error, children, label, ...props} = this.props;
        return (
            <div className={ "form-group has-feedback " + (error ? 'has-error': '') }>
                { (label) ? <label htmlFor={label.id}>{label.heading}</label> : null}
                <Text {...props} field={field} id={props.label? props.label.id : null} />
                { children }
                <span className="help-block">{ error ? error : '' }</span>
            </div>
        )
    }
}

export default asField(CustomInput);