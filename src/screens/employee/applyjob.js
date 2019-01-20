import React, {Component} from 'react';
import Wrapper from '../partials/wrapper';
import {Box} from 'reactjs-admin-lte';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {Form, Option} from 'informed';
import Select from '../custom_form/select';

import ReactFileReader from 'react-file-reader';

import { getindividual} from '../../actions/general_actions/job';
import {jobapply} from '../../actions/job';
import { getcv } from '../../actions/employee';

import ViewIndividual from './cvmaker/printablecv';
import Submit from '../custom_form/submit';

class ApplyJob extends Component{

	state = {
		filevalue: "",
		individualjob: null
	}

	componentDidMount(){
		let id = this.props.match.params.id;
		if(id){
			this.props.getdata(id);
			this.props.getcv();
		}
	}

	file = (filelist) => {
		this.setState({ filevalue: filelist[0].name })
		this.file_value = filelist[0];
	}

	apply = (value) => {
		this.props.jobapply(this.props.match.params.id,{
			
			'employee': this.props.employee,
			'user': this.props.user,
			'data': this.props.data
		}, this.props.job.company.id);

	}

	changeselect = (value) => {
		this.setState({ cv_value: value || undefined })
		if(value){
			this.setState({
				individualjob: <ViewIndividual cvid={value} refcallback={ref => { if(ref){ this.individualjob = ref } } }/>
			})
		}
	}


	componentDidUpdate(props){
		if(this.props.cv.id !== props.cv.id){
			
			if(this.props.cv.id){
				this.setState({ buttondisable: false })
			}else{
				this.setState({ buttondisable: true })				
			}

		}

		// redirect if successfull
		if(this.props.success !== props.success){
			if(this.props.success === true){
				this.setState({ goto: "/dashboard/appliedjobs/view" })
			}
		}
	}

	uploadapply = () => {
		if(this.file_value){
			this.props.jobapply(this.props.match.params.id, {
				cvv: this.file_value 
			}, this.props.job.company.id)
		}
	}

    render(){
    	if(this.state.goto){
    		return <Redirect to={this.state.goto} />
    	}
        return (
            <Wrapper heading="Apply">
            	<div className="row">
            		<div className="col-md-12">
						<Box className="box-success" loading={this.props.loading}>
							<Box.Header>
								<Box.Title>Applying for Job</Box.Title>
								<Box.Tools>
									<Link to="/dashboard/cvmaker/view" className="btn btn-info pull-right">Create CV</Link>
								</Box.Tools>
							</Box.Header>
							<Box.Body>
							    <h4>You are applying for position of <b>{this.props.job.jobtitle}</b> @ <b>{this.props.job.company.user.name}</b></h4>
									<div className="row">
										<div className="col-md-6" style={{borderRight: '1px solid #aaa', padding: "40px 20px"}}>
											<Form onSubmit={this.apply}>
												<Select label="Select your CV to apply" select_changed={this.changeselect} placeholder="Select CV" id="cvselect" field="cvid">
													
													{
														this.props.cvs.map(d => (
															<Option key={d.id} value={d.id}>{d.name}</Option>
														))
													}
												</Select>							
												<Submit disabled={this.state.cv_value === undefined} text="Submit" className="btn btn-info pull-right" loading={ this.state.buttondisable }/>
											</Form>
										</div>
										<div className="col-md-6" style={{padding: "40px 20px"}}>
											<label>Upload your CV to apply</label>
											<ReactFileReader handleFiles={this.file} multipleFiles={false}>
												<div className="input-group">
													<span className="input-group-btn">
								                        <button className="btn btn-default"><i className="fa fa-upload" />&nbsp; Upload</button>
													</span>
													<input readOnly type="text" className="form-control" value={this.state.filevalue} placeholder="Upload your file"/>
												</div>
						                    </ReactFileReader>
						                    <br/>
						                    <button className="btn btn-info pull-right" onClick={this.uploadapply}>Apply</button>
										</div>
									</div>
							</Box.Body>
			            </Box>
            		</div>
            	</div>

                <div className="row">
                	<div className="col-md-12">
			            <Box className="box-success">
							<Box.Header>
								<Box.Title>CV VIEWER</Box.Title>
							</Box.Header>
							<Box.Body>
								{ this.state.individualjob }
							</Box.Body>
			            </Box>
                	</div>
                </div>
                
            </Wrapper>
        );
    }
}


export default connect(state => ({
	cv: state.employee.cv,
	job: state.general.individualjob,
	cvs: state.employee.cvs,
	loading: state.job.loading || state.employee.cvloading,
	success: state.job.success,

	user: state.auth.user,
	employee: state.employee,
	data: state.employee.cv,
}), dispatch => ({
	getdata: (id) => getindividual(dispatch, id),
	getcv: () => getcv(dispatch),
	jobapply: (id, data, companyid) => jobapply(dispatch, id, data, companyid)
}))(ApplyJob)