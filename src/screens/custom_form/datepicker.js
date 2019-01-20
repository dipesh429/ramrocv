import React, {Component} from 'react';
import {asField, Text} from 'informed';

class DatePicker extends Component{

    state = {day: "", month: "", year: ""}

    componentDidMount(){
        if(this.props.value){
            const val = this.props.value.split("-")
            this.setState({
                day: val[2] ? val[2] : "",
                month: val[1] ? val[1] : "",
                year: val[0] ? val[0] : ""
            });
        }
        if(this.props.current){
            const today = new Date();
            this.setState({
                day: today.getUTCDate(),
                month: today.getUTCMonth() + 1,
                year: today.getUTCFullYear()
            })
        }
    }

    componentDidUpdate(props){
        if( (this.props.value !== props.value) && this.props.value){
            const val = this.props.value.split("-")
            this.setState({
                day: val[2] ? val[2] : "",
                month: val[1] ? val[1] : "",
                year: val[0] ? val[0] : ""
            });
        }
    }

    changedate = () => {
        this.setState({
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        })
        const datefinal = `${this.year.value}-${this.month.value}-${this.day.value}`;
        if(!this.props.onChange){
            this.props.fieldApi.setValue(datefinal);
        }else{
            this.props.onChange(datefinal)
        }
    }

    render(){

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
        const {field, error, children, ...props} = this.props; 
        return (
            <div className={ "form-group " + (error ? 'has-error': '') }>
                {(this.props.label) ? <label>{this.props.label}</label> : null}
                <div className="input-group">
                    <select value={Number(this.state.year)} ref={year => this.year = year} onChange={this.changedate} >
                        {
                            [...Array(200).keys()].map(d => (
                                <option value={d+1900} key={d}>{d+1900}</option>
                            ))
                        }
                    </select>
                    <span style={{margin: '0 10px', display: "inline-block"}}>/</span>
                    <select value={Number(this.state.month)} ref={month => this.month = month} onChange={this.changedate}>
                        {
                            months.map((d, i) => (
                                <option value={i+1} key={d}>{d}</option>
                            ))
                        }
                    </select>
                    <span style={{margin: '0 10px', display: "inline-block"}}>/</span>
                    <select value={Number(this.state.day)} ref={day => this.day = day} onChange={this.changedate}>
                        {
                            [...Array(31).keys()].map(d => (
                                <option value={d+1} key={d}>{d+1}</option>
                            ))
                        }
                    </select>
                </div>
                <span className="help-block">{ error ? error : '' }</span>
            </div>
        );
    }
}

export default asField(DatePicker);
