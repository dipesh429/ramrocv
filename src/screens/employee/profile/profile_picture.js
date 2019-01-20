import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box} from 'reactjs-admin-lte';
import { upload } from '../../../actions/employee';
import ReactFileReader from 'react-file-reader';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class ShowProfilePicture extends Component{
    
    placeholder_image = require('../../../img/placeholder_user.jpg')

    state = {
        preview: null,
        src: null,
        edit: false,
        userimg: null
    }

    componentDidMount(){
        this.setState({userimg: this.props.photo, src: this.props.photo });
    }

    componentDidUpdate(props){
        if(this.props.photo !== props.photo){
            this.setState({edit: false, userimg: this.props.photo, src: this.props.photo});
        }
    }

    showpicture = () => (
        <div className="row" style={{display: this.state.edit ? "none": "block"}}>
            <div className="col-md-12" style={{textAlign: "center"}}>
                <img 
                    src={this.state.userimg ? this.state.userimg : this.placeholder_image } 
                    alt="Profile" 
                    style={{ height: "200px", width: "200px", display: "inline-block" }}
                />
            </div>
        </div>
    )

    editpicture = () => (
        <div className="row" style={{display: this.state.edit ? "block": "none"}}>
            <div className="col-md-12" style={{ textAlign: "center" }}>
                <div style={{display: "inline-block"}}>
                    <Cropper ref='editor' src={this.state.src} style={{height: "200px", width: "100%"}} initialAspectRatio={1} />
                    <hr />
                    <ReactFileReader base64={true} handleFiles={this.file} multipleFiles={false}>
                        <button className="btn btn-default"><i className="fa fa-upload" />&nbsp; Upload</button>
                    </ReactFileReader>
                </div>
            </div>
        </div>
    )

    file = (files) => {
        this.setState({src: files.base64 });
    }

    save = () => {
        let image = this.refs.editor.getCroppedCanvas();
        try {
            image = image.toDataURL();
        } catch(e) { console.log(e) }

        fetch(image).then( res => res.blob() ).then(blob => {
            let fd = new FormData();
            fd.append("upload", blob);
            this.props.upload(fd);
        })
    }

    render(){
        return (
            <Box className="box-primary" loading={this.props.loading}>
                <Box.Header>
                    <Box.Title>Profile Picture</Box.Title>
                    <Box.Tools>
                        <a className="btn btn-box-tool" onClick={ ()=>this.setState({ edit: true }) }>
                            <i className="fa fa-edit" />&nbsp; Edit
                        </a>
                    </Box.Tools>
                </Box.Header>
                <Box.Body>
                    { this.editpicture() }
                    { this.showpicture() }
                </Box.Body>
                <Box.Footer>
                    {(this.state.edit) ? 
                        (<div>
                            <button className="btn btn-primary pull-right" onClick={this.save}>Save</button> 
                            <button className="btn btn-default" onClick={() => this.setState({ edit: false, src: null }) }>Cancel</button>
                        </div>)
                        : null}
                </Box.Footer>
            </Box>
        );
    }

}

export default connect(state => ({
    user: state.auth.user,
    loading: state.employee.pictureloading,
    uploaded: state.employee.uploaded,
    photo: state.employee.photo
}), dispatch => ({
    upload: (data) => upload(dispatch, data)
}))(ShowProfilePicture);