import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux';
import { saveImage } from '../action-creators/ImageUploadActionCreator';
import { createCampaign } from '../action-creators/CampaignActionCreator';

const CLOUDINARY_UPLOAD_PRESET = 'test123';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/tuo/image/upload';

class ImageUpload extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      auth: {},
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage() {
    console.log("going to upload image");
    const xximage = {
      url: this.state.uploadedFileCloudinaryUrl
    };
    this.props.saveImage(xximage);
    //this.props.createCampaign(xximage);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log("hetuo test....", response.body.secure_url);
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            {this.uploadImage()}
          </div>}
        </div>
      </form>
    )
  }
}

const mapState = ({ auth }) => ({
	auth: auth
});

const mapDispatch = { saveImage, createCampaign };

export default connect(mapState, mapDispatch)(ImageUpload);
