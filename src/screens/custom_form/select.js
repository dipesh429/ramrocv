import React, {Component} from 'react';
import { asField, Select } from 'informed';

import NonCreatableSelect from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';


const jQuery = window.jQuery;

class SelectCustom extends Component{

    data = [];

    state = {
        single: {
            label: null,
            value: null
        },
        multi: []
    };

    componentDidMount(){
        this.data = Array.isArray(this.props.children) && this.props.children.map(
            d => 
                d && 
                d.props && 
                d.props.children && 
                d.props.value && 
                ({
                    label: d.props.children.toString(),
                    value: d.props.value.toString()
                })
        );

        if(!this.props.isMulti){
            this.setState({ single: this.props.defaultValue || this.getDefaultValue() || {} });
        }

    }

    changed = (param) => {
        if(param){
            if(!this.props.isMulti){
                if(this.props.select_changed){
                    this.props.select_changed(param.value);
                }
                this.setState({ single: param });
                this.props.fieldApi.setValue(param.value);
            }else{
                if(this.props.select_changed){
                    this.props.select_changed(param);
                }
                this.setState({ multi: param });
                this.props.fieldApi.setValue(param);
            }
        }
    }

    getDefaultValue(){
        const a = this.data && this.data.find(d => d && (d.value == this.props.value));
        if(a) { return a; }
    }

    render(){
        const {
            error, 
            isMulti, 
            placeholder,
            creatable,
            isClearable,
            options } = this.props;
        
        const CS = creatable ? CreatableSelect : NonCreatableSelect;  

        let value;
        if(isMulti){
            value = this.state.multi.length > 0 ? this.state.multi : null;
        }else{
            value = this.state.single.value ? this.state.single : null;
        }

        const op = options 
                    && options.constructor == Array 
                    && options.map(d => ({ ...d, value: d.value.toString() }) );

        return (
            <div className={"form-group "+ (error ? "has-error" : "") }> 
                {this.props.label ? <label>{this.props.label}</label> : null }
                <CS
                    isMulti={isMulti}
                    isClearable={isClearable}
                    onChange={this.changed}
                    value={ value }
                    placeholder={placeholder}
                    options={ op || this.data } />    
                <span className="help-block">{ error ? error : '' }</span>
            </div>
        );
    }
}

export default asField(SelectCustom);


{/* <div className={"form-group "+ (error ? "has-error" : "") }> 
                {this.props.label ? <label>{this.props.label}</label> : null }
                <Select field={field} {...props} >
                    { children }
                </Select>
                <span className="help-block">{ error ? error : '' }</span>
            </div> */}


 // <CreatableSelect
                               // isMulti
 //                            isClearable
 //                            onChange={(x)=> x && this.setState({industry:x})}
 //                            placeholder='Select Industry you belong'

 //                            // onInputChange={this.handleInputChange}
 //                            options={industry}
 //                    />    