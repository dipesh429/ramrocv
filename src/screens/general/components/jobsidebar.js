import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Panel, PanelGroup} from 'react-bootstrap';
import { Form, Option, Text } from 'informed';
import Select from '../../custom_form/select';
import Slider from '../../partials/slider';

import parser from 'query-string';

const INDUSTRY = require('../../../industries.json');
const CATEGORIES = require('../../../categories.json');
const LOCATION = require('../../../location.json');


class JobSidebar extends Component{
	state={ activeKey: '1', location: "", salary: {min: 25000, max: 80000} }
	handleSelect= activeKey => this.setState({ activeKey })

	formchange = data => {
		const val = data;
		if(this.props.onChange){
			this.props.onChange(val);
		}
	}

	changeslider = () => {
		const salary = JSON.stringify(this.state.salary);
		if(this.props.onChange){
			this.props.onChange({ salary })
		}
	}

	changelocation = () => this.formchange({ location: this.state.location })

	componentDidMount(){
		const {salary, ...data } = parser.parse(this.props.location.search)
		this.setState({ ...data, salary: salary ? JSON.parse(salary): this.state.salary })
	}

	render(){
		return (
			<Form onValueChange={this.formchange}>
				<div className="section">
					<h4 style={{color: "#333"}}><i className="fa fa-search"></i>&nbsp; Refine Search Results</h4>
					<br/>
					<div className="accordion">
						<PanelGroup accordion
							activeKey={this.state.activeKey}
							onSelect={this.handleSelect}
							id="accordion1">
							<Panel eventKey="1">
								<Panel.Heading>
									<Panel.Title toggle>
										<h4>Categories <span className="pull-right"><i className={`fa fa-${ this.state.activeKey === '1' ? "minus" : "plus" }`}/></span>
										</h4>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Body collapsible>
									<Select id="categories" value={this.state.category} field="category" placeholder="Select Categories">

										<Option value="featured">Featured</Option>
										<Option value="general">General</Option>
									</Select>
								</Panel.Body>
							</Panel>

							<Panel eventKey="2">
								<Panel.Heading>
									<Panel.Title toggle>
										<h4>Industries<span className="pull-right"><i className={`fa fa-${ this.state.activeKey === '2' ? "minus" : "plus" }`}/></span>
										</h4>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Body collapsible>
									<Select id="industry" value={this.state.industry} field="industry" placeholder="Select Industries">

										{
											INDUSTRY.map((d,k) => (
												<Option key={k} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</Option>
											))
										}
									</Select>
								</Panel.Body>
							</Panel>

							<Panel eventKey="3">
								<Panel.Heading>
									<Panel.Title toggle>
										<h4>Salary Range<span className="pull-right"><i className={`fa fa-${ this.state.activeKey === '3' ? "minus" : "plus" }`}/></span>
										</h4>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Body collapsible>
									<Slider min={5000} max={150000} step={4000} currentState={this.state.salary} changeState={salary => this.setState({ salary }) } />
									<a className="btn btn-default pull-right" onClick={this.changeslider}>Apply</a>
								</Panel.Body>
							</Panel>
							
							<Panel eventKey="4">
								<Panel.Heading>
									<Panel.Title toggle>
										<h4>Employment Type<span className="pull-right"><i className={`fa fa-${ this.state.activeKey === '4' ? "minus" : "plus" }`}/></span>
										</h4>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Body collapsible>
									<Select id="emptype" value={this.state.type} placeholder="Select Employment Type" field="type">

										<Option value="Contract">Contract</Option>
                                        <Option value="Full Time">Fulltime</Option>
                                        <Option value="Part Time">Part Time</Option>
                                        <Option value="Intern/Trainees">Intern/Trainees</Option>
                                        <Option value="Full Time/Contract">Full Time/Contract</Option>
                                        <Option value="Part Time/Contract">Part Time/Contract</Option>
									</Select>
								</Panel.Body>
							</Panel>

							<Panel eventKey="6">
								<Panel.Heading>
									<Panel.Title toggle>
										<h4>Location<span className="pull-right"><i className={`fa fa-${ this.state.activeKey === '6' ? "minus" : "plus" }`}/></span>
										</h4>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Body collapsible>
									<Select id="location" value={this.state.location} placeholder="Select Location" field="location">
										{
											LOCATION.map((d,k) => (
												<Option value={d} key={k}>{d.charAt(0).toUpperCase()+d.slice(1)}</Option>
											))
										}
									</Select>
								</Panel.Body>
							</Panel>

							<Panel eventKey="7">
								<Panel.Heading>
									<Panel.Title toggle>
										<h4>Job Category<span className="pull-right"><i className={`fa fa-${ this.state.activeKey === '6' ? "minus" : "plus" }`}/></span>
										</h4>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Body collapsible>
									<Select id="jobcategory" value={this.state.jobcategory} placeholder="Select Job Category Type" field="jobcategory">
										{
											CATEGORIES.map((d,k) => (
												<Option value={d} key={k}>{d.charAt(0).toUpperCase()+d.slice(1)}</Option>
											))
										}
									</Select>
								</Panel.Body>
							</Panel>

						</PanelGroup>
					</div>
				</div>
			</Form>
		)
	}
}

export default connect()(withRouter(JobSidebar));