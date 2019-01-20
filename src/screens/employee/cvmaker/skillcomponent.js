import React, {Component} from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { EditorState, convertToRaw, ContentState } from 'draft-js'; 

class ExperienceComponent extends Component{

	state = {
		skill: "",
		description: "",
		editorState: EditorState.createEmpty()
	}

	componentDidMount(){
		if(this.props.data){
			this.setState({
				skill: this.props.data.skill,
				description: this.props.data.description,
				editorState: this.convertToEditorState(this.props.data.description)
			});
		}
	}


	componentDidUpdate(props, state){
		if( 
			(this.state.skill !== state.skill) ||
			(this.state.description !== state.description)
		){
			if(this.props.updateCallback){
				this.props.updateCallback(this.props.i, {
					skill: this.state.skill,
					description: this.state.description,
				});
			}
		}
	}

	editorChange = (editorState) => this.setState({ description: this.convertFromEditorState(editorState), editorState }) 
	
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
					<div className="col-md-12">
						<div className="form-group">
							<label>Skills/Interest</label>
							<input value={this.state.skill} placeholder="Skills/Interest (Eg: Playing Guitar)" className="form-control" onChange={evt => this.setState({ skill: evt.target.value }) }/>
						</div>
						<div className="form-group">
							<label>Description</label>
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

