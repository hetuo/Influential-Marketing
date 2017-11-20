// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
//import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { grey400, grey800, darkBlack, lightBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import SvgRemoveImage from 'material-ui/svg-icons/content/remove-circle'
import SvgCamera from 'material-ui/svg-icons/image/photo-camera'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ImageUpload from './ImageUpload'
import Avatar from 'material-ui/Avatar';


import { addProduct } from '../action-creators/products'

class PostWrite extends Component {


  constructor(props) {

    super(props)


    this.state = {

      postText: this.props.edit ? this.props.text : '',
      titleText: '',
      auth: {},
      image: this.props.edit ? this.props.image : '',
      imageFullPath: this.props.edit ? this.props.imageFullPath : '',
      galleryOpen: false,
      disabledPost: true,
      disabledPostx: true,
      disableComments: this.props.edit ? this.props.disableComments : false,
      disableSharing: this.props.edit ? this.props.disableSharing : false,

    }

    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCloseGallery = this.handleCloseGallery.bind(this)
    this.handleOpenGallery = this.handleOpenGallery.bind(this)
    this.onRequestSetImage = this.onRequestSetImage.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleRemoveImage = this.handleRemoveImage.bind(this)
    this.handleToggleComments = this.handleToggleComments.bind(this)
    this.handleToggleSharing = this.handleToggleSharing.bind(this)

  }

  onRequestSetImage = (url) => {
    console.log("hetuo test...", url);
  this.setState({
    image: url
  })
}

  handlePost = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.titleText,
      body: this.state.postText,
      image1: this.props.image,
      stars: '4',
      influencer_id: this.props.auth.user.id
    }
    this.props.addProduct(post, this.props.auth.user.id);
    this.props.onRequestClose();
  }


  handleToggleComments = () => {
    this.setState({
      disableComments: !this.state.disableComments,
      disabledPost: false
    })
  }

  handleToggleSharing = () => {
    this.setState({
      disableSharing: !this.state.disableSharing,
      disabledPost: false
    })
  }

  handleRemoveImage = () => {
    this.setState({
      image: '',
      imageFullPath: '',
      disabledPost: false
    })
  }

  handleOnChange = (evt, data) => {
    this.setState({ postText: data })
    if (data.length === 0 || data.trim() === '') {
      this.setState({
        postText: data,
        disabledPost: true
      })
    }
    else {
      this.setState({
        postText: data,
        disabledPost: false
      })
    }
  }

  handleOnChangeTitle = (evt, data) => {
    this.setState({ titleText: data })
    if (data.length === 0 || data.trim() === '') {
      this.setState({
        titleText: data,
        disabledPost: true
      })
    }
    else {
      this.setState({
        titleText: data,
        disabledPost: false
      })
    }
  }

  handleCloseGallery = (e) => {
    e.preventDefault();
    this.setState({
      galleryOpen: false
    })
  }

  handleWriteClose = (e) => {
    e.preventDefault();
  }


  handleOpenGallery = () => {
    this.setState({
      galleryOpen: true
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.open) {
      this.setState({
        postText: this.props.edit ? this.props.text : '',
        image: this.props.edit ? this.props.image : '',
        galleryOpen: false,
        disabledPost: true,
        disableComments: this.props.edit ? this.props.disableComments : false,
        disableSharing: this.props.edit ? this.props.disableSharing : false,

      })
    }
  }

  render() {

    const { image } = this.props;

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )

    let author = (
      <div>
        <span style={{
          fontSize: "14px",
          paddingRight: "10px",
          fontWeight: 400,
          color: "rgba(0,0,0,0.87)",
          textOverflow: "ellipsis",
          overflow: "hidden",
          paddingLeft: "50px",
          lineHeight: "25px"
        }}>{"test"}</span><span style={{
          fontWeight: 100,
          fontSize: "10px"
        }}> | Public</span>
      </div>
    )

    const writeActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={false}
        onClick={() => (this.props.onRequestClose())}
        style={{ color: grey800 }}
      />,
      <FlatButton
        label={'POST'}
        primary={true}
        keyboardFocused={false}
        onClick={(e) => (this.handlePost(e))}
        disabled={this.state.disabledPost}
      />
    ]

    const galleryActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={false}
        onClick={(e) => (this.handleCloseGallery(e))}
        style={{ color: grey800 }}
      />,
      <FlatButton
        label="Upload"
        primary={true}
        keyboardFocused={false}
        onClick={(e) => (this.handleCloseGallery(e))}
        style={{ color: grey800 }}
      />
    ]

    const styles = {
      dialog: {
        width: '',
        maxWidth: '530px',
        borderRadius: "4px"
      }
    }

    return (
      <div style={this.props.style}>
        {this.props.children}
        <Dialog
          id={this.props.id || 0}
          actions={writeActions}
          modal={false}
          open={this.props.open}
          contentStyle={styles.dialog}
          onRequestClose={this.props.onRequestClose}
          overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
          bodyStyle={{ padding: 0 }}
          autoDetectWindowHeight={false}
          actionsContainerStyle={{ borderTop: "1px solid rgb(224, 224, 224)" }}

        >

          <ListItem
            disabled={true}
            leftAvatar={<Avatar backgroundColor='#00bcd4' size='40' style={{ top: "8px" }}>T</Avatar>}
            style={{ padding: "16px 4px 30px 16px" }}
          />
          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
            <div style={{ position: "relative", flexDirection: "column", display: "flex", flexGrow: 1, overflow: "hidden", overflowY: "auto", maxHeight: "300px" }}>
              <TextField
                value={this.state.titleText}
                onChange={this.handleOnChangeTitle}
                hintText="Title"
                underlineShow={false}
                multiLine={true}
                rows={2}
                hintStyle={{ fontWeight: 200, fontSize: "14px" }}
                textareaStyle={{ fontWeight: 200, fontSize: "14px" }}
                style={{ margin: "0 16px", flexShrink: 0, width: "initial", flexGrow: 1 }}

              />

              <TextField
                value={this.state.postText}
                onChange={this.handleOnChange}
                hintText="Content"
                underlineShow={false}
                multiLine={true}
                rows={2}
                hintStyle={{ fontWeight: 200, fontSize: "14px" }}
                textareaStyle={{ fontWeight: 200, fontSize: "14px" }}
                style={{ margin: "0 16px", flexShrink: 0, width: "initial", flexGrow: 1 }}

              />

              {(image && image !== '')
                ? (<div>
                  <div style={{ position: "relative", overflowY: "hidden", overflowX: "auto" }}>
                    <ul style={{ position: "relative", whiteSpace: "nowrap", padding: "0 0 0 16px", margin: "8px 0 0 0", paddingRight: "16px", verticalAlign: "bottom", flexShrink: 0, listStyleType: "none" }}>
                      <div style={{ display: "flex", position: "relative" }}>
                        <div style={{ display: "inline-block", width: "100%", marginRight: "8px", transition: "transform .25s" }}>
                          <li style={{ width: "100%", margin: 0, verticalAlign: "bottom", position: "static" }}>
                            <img src={image} />
                          </li>
                        </div>
                      </div>

                    </ul>
                  </div>
                </div>) : ''}
            </div>
            <div style={{ flexShrink: 0, boxFlex: 0, flexGrow: 0, maxHeight: "48px", width: "100%" }}>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <div onClick={this.handleOpenGallery} style={{ outline: "none", width: "48px", zIndex: 0, overflow: "hidden", position: "relative", textAlign: "center", transition: "background .3s", border: 0, borderRadius: "50%", display: "inlineBlock", height: "48px" }}>
                  <span style={{ top: "15px", display: "block", position: "relative", cursor: "pointer" }}>
                    <SvgCamera color="grey" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          actions={galleryActions}
          modal={false}
          open={this.state.galleryOpen}
          contentStyle={styles.dialog}
          onRequestClose={this.handleCloseGallery}
          overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
          autoDetectWindowHeight={false}

        >
          <ImageUpload />
        </Dialog>

      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
	//console.log("hetuo..........." + ownProps.index);
  image: state.image.image.url,
  auth: state.auth
});

const mapDispatch = { addProduct };

// - Connect component to redux store
export default connect(mapState, mapDispatch)(PostWrite)
