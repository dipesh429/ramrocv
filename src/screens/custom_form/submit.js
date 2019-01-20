// submit button implementation
import React, { Component } from 'react';

export default class CustomButton extends Component{
    render(){
        const {text, className, loading, children, ...props} = this.props;
        const newClassName = (loading) ? (className + " disabled") : className;
        return (
            <button type="submit" {...props} className={newClassName}>
                {loading ? <i className="fa fa-spin fa-refresh" style={{ padding: "5px" }}/> : null}
                {text}
                {children}
            </button>
        );
    }
}