import React, {Component} from 'react';
import {asField} from 'informed';
import {BASE_URL} from '../../config';
import { EditorState, convertToRaw, ContentState } from 'draft-js'; 
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class UncontrolledEditor extends Component{
    
    editor = null;
    state = {data: EditorState.createEmpty()}
    
    editorChange = (editorstate) => {
        let content = convertToRaw(editorstate.getCurrentContent());
        let html = draftToHtml(content);
        this.setState({data: editorstate});
        if(this.props.change){
            this.props.change(html);
        }
        this.props.fieldApi.setValue(html);
    }

    componentDidMount(){
        if(this.props.value){
            const editorstate = this.convertToEditorState(this.props.value);
            if(editorstate){
                this.setState({ data: editorstate });
            }
        }
    }

    convertToEditorState = (html) => {
        let content = htmlToDraft(html);
        if(content){
            const contentState = ContentState.createFromBlockArray(content.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }
    }

    componentDidUpdate(props){
        if((this.props.value !== props.value) && this.props.value){
            const editorstate = this.convertToEditorState(this.props.value);
            if(editorstate){
                this.setState({ data: editorstate });
            }
        }
    }

    uploadimage = (file) => {
        return new Promise((resolve, reject) => {
            let fd = new FormData();
            fd.append("upload", file);
            fetch(`${BASE_URL}/image/upload`, {
                method: "POST",
                body: fd,
                headers: {
                    'Authorization': `Bearer ${ localStorage.getItem("access_token") }`
                }
            }).then(d => d.json())
            .then(data => {
                if(data.uploaded){
                    resolve({
                        data: {
                            link: data.url
                        }
                    });
                }else{
                    reject();
                }
            }).catch(e => {
                reject(e);
            })
        });
    }

    render(){
        const token = localStorage.getItem('access_token');
        const { error, label, height, image } = this.props;
        let options = ['inline', 'blockType', 'list', 'fontFamily'];
        if(image){
            options.push('image');
        }
        return (
            <div className={ "form-group has-feedback " + (error ? 'has-error': '') }>
                { (label) ? <label>{label}</label> : null }
                <Editor 
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor"
                    editorState={this.state.data}
                    toolbar={{
                        options: options,
                        image: { uploadCallback: this.uploadimage, previewImage: true },
                    }} 
                    onEditorStateChange={this.editorChange} />
                <span className="help-block">{ error ? error : '' }</span>
            </div>
        );
    }
}

export default asField(UncontrolledEditor);