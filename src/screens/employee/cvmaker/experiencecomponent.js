import React, {Component} from 'react';
import { asField } from 'informed';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import DateRange from '../../custom_form/daterange';

import { EditorState, convertToRaw, ContentState } from 'draft-js'; 

class ExperienceComponent extends Component{

	state = {
		daterange: "",
		designation: "",
		organization: "",
		responsibilities: "",
		editorState: EditorState.createEmpty()
	}

	componentDidMount(){
		if(this.props.data){
			this.setState({
				daterange: this.props.data.daterange,
				designation: this.props.data.designation,
				organization: this.props.data.organization,
				responsibilities: this.props.data.responsibilities,
				editorState: this.convertToEditorState(this.props.data.responsibilities)
			});
		}
	}


	componentDidUpdate(props, state){
		if( 
			(this.state.daterange !== state.daterange) ||
			(this.state.designation !== state.designation) ||	
			(this.state.organization !== state.organization) ||
			(this.state.responsibilities !== state.responsibilities)	
		){
			if(this.props.updateCallback){
				this.props.updateCallback(this.props.i, {
					daterange: this.state.daterange,
					designation: this.state.designation,
					organization: this.state.organization,
					responsibilities: this.state.responsibilities,
				});
			}
		}
	}

	editorChange = (editorState) => this.setState({ responsibilities: this.convertFromEditorState(editorState), editorState }) 
	
	convertFromEditorState(editorstate){
		const content = convertToRaw(editorstate.getCurrentContent());
        const html = draftToHtml(content);
		return html;
	}

	convertToEditorState(html){
        let content = htmlToDraft(html);
        if(content){
            const contentState = ContentState.createFromBlockArray(content.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }
    }

	render(){
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<br />
						<a className="btn btn-xs btn-danger pull-right" onClick={() => this.props.deleteCallback(this.props.i) }><i className="fa fa-trash" /></a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>Date Range</label>
							<DateRange value={this.state.daterange} onChange={(val) => { this.setState({daterange: val}) } }/>
						</div>
						<div className="form-group">
							<label>Designation</label>
							<input value={this.state.designation} placeholder="Designation" className="form-control" onChange={evt => this.setState({ designation: evt.target.value })}/>
						</div>
					</div>	
					<div className="col-md-6">
						<div className="form-group">
							<label>Organization</label>
							<input value={this.state.organization} placeholder="Organization" className="form-control" onChange={evt => this.setState({ organization: evt.target.value }) }/>
						</div>

						<div className="form-group">
							<label>Responsibilities</label>
							<Editor 
			                    wrapperClassName="rdw-storybook-wrapper"
			                    editorClassName="rdw-storybook-editor"
			                    editorState={this.state.editorState}
			                    toolbar={{
			                        options: ['inline', 'blockType', 'list'],
			                    }} 
			                    onEditorStateChange={this.editorChange} />
						</div>

					</div>
				</div>
				<hr />
			</React.Fragment>
		);
	}

}

export default ExperienceComponent;

