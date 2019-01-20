import React, {Component} from 'react';
import {asField} from 'informed';
import Toggle from 'react-toggle';

class CustomToggle extends Component{

    change = evt => {
        this.props.fieldApi.setValue(evt.target.checked);
        this.setState({checked: evt.target.checked});
    }
    
    state = { checked: false }
    
    componentDidMount(){
        this.setState({ checked: this.props.checked });
    }

    componentDidUpdate(props){
        if(this.props.checked !== props.checked){
            this.setState({ checked: this.props.checked });
        }
    }

    render(){
        return (
            <div className="form-group">
                {this.props.label ? <label>{this.props.label}</label> : null }
                <Toggle 
                    checked={this.state.checked}
                    onChange={this.change}
                    />
            </div>
        );
    }
}

export default asField(CustomToggle);