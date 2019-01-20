import React, {Component} from 'react';
import {Text} from 'informed';

class DateRange extends Component{

    state = {   from: { 
                    day: "", 
                    month: "", 
                    year: "" 
                },
                to: {
                    day: "",
                    month: "",
                    year: ""
                }
            }

    static getDerivedStateFromProps(props, state){
        const changeval = `${state.from.year}-${state.from.month}-${state.from.day} to ${state.to.year}-${state.to.month}-${state.to.day} `
        if(props.value !== changeval){
            let [f,t] = props.value.split("to");
            let s = {from: {}, to: {}};
            if(f){
                const f_dmy = f.split("-");
                s.from.day = Number(f_dmy[2]) ? Number(f_dmy[2]) : 0;
                s.from.month = Number(f_dmy[1]) ? Number(f_dmy[1]) : 0;
                s.from.year = Number(f_dmy[0]) ? Number(f_dmy[0]) : 0;
            }  
            if(t){
               const t_dmy = t.split("-");
                s.to.day = Number(t_dmy[2]) ? Number(t_dmy[2]) : 0;
                s.to.month = Number(t_dmy[1]) ? Number(t_dmy[1]) : 0;
                s.to.year = Number(t_dmy[0]) ? Number(t_dmy[0]) : 0;
            }
            return {...s};
        }
        return {...state};
    }

    changedate = () => {
        this.setState({
            from: {
                day: Number(this.fday.value),
                month: Number(this.fmonth.value),
                year: Number(this.fyear.value)
            },
            to: {
                day: Number(this.tday.value),
                month: Number(this.tmonth.value),
                year: Number(this.tyear.value)
            }
        })
        const changeval = `${this.fyear.value}-${this.fmonth.value}-${this.fday.value} to ${this.tyear.value}-${this.tmonth.value}-${this.tday.value} `
        if(this.props.onChange){
            this.props.onChange(changeval);
        }

    }

    year = [...Array(100).keys()]
    day = [...Array(31).keys()]
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 

    render(){
        
        const {field, error, children, ...props} = this.props; 
        return (
            <div className={ "form-group " + (error ? 'has-error': '') }>
                {(this.props.label) ? <label>{this.props.label}</label> : null}
                <div>

                    <div style={{display: "inline-block", margin: "10px 0"}}>
                        <span style={{margin: '0 10px 0 0', display: "inline-block"}}><b>From</b></span>
                        <select value={this.state.from.year} ref={year => this.fyear = year} onChange={this.changedate} >
                            {
                                this.year.map(d => (
                                    <option value={d+1950} key={d}>{d+1950}</option>
                                ))
                            }
                        </select>
                        <span style={{margin: '0 10px', display: "inline-block"}}>/</span>
                        <select value={this.state.from.month} ref={month => this.fmonth = month} onChange={this.changedate}>
                            {
                                this.months.map((d, i) => (
                                    <option value={i+1} key={d}>{d}</option>
                                ))
                            }
                        </select>
                        <span style={{margin: '0 10px', display: "inline-block"}}>/</span>
                        <select value={this.state.from.day} ref={day => this.fday = day} onChange={this.changedate}>
                            {
                                this.day.map(d => (
                                    <option value={d+1} key={d}>{d+1}</option>
                                ))
                            }
                        </select>
                    </div>
                    <br />
                    <div style={{display: "inline-block", margin: "10px 0"}}>
                        <span style={{margin: '0 28px 0 0', display: "inline-block"}}><b> To </b></span>
                        <select value={this.state.to.year} ref={year => this.tyear = year} onChange={this.changedate} >
                            {
                                this.year.map(d => (
                                    <option value={d+1950} key={d}>{d+1950}</option>
                                ))
                            }
                        </select>
                        
                        <span style={{margin: '0 10px', display: "inline-block"}}>/</span>
                        <select value={this.state.to.month} ref={month => this.tmonth = month} onChange={this.changedate}>
                            {
                                this.months.map((d, i) => (
                                    <option value={i+1} key={d}>{d}</option>
                                ))
                            }
                        </select>
                        <span style={{margin: '0 10px', display: "inline-block"}}>/</span>
                        <select value={this.state.to.day} ref={day => this.tday = day} onChange={this.changedate}>
                            {
                                this.day.map(d => (
                                    <option value={d+1} key={d}>{d+1}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <span className="help-block">{ error ? error : '' }</span>
            </div>
        );
    }
}

export default DateRange;
