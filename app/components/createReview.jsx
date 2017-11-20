import React from 'react';
import { Link, browserHistory } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { grey400, grey800, darkBlack, lightBlack } from 'material-ui/styles/colors';
import SvgCamera from 'material-ui/svg-icons/image/photo-camera';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import PostWrite from './PostWrite';





export default class createReview extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      openPostWrite: false,
      auth: {},
      posts: []
    };

    this.handleOpenPostWrite = this.handleOpenPostWrite.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
  }

  handleOpenPostWrite = (e) => {
    e.preventDefault();
    console.log("hetuo test....", this.state.openPostWrite);
    this.setState({
      openPostWrite: true
    })

  }

  handleClosePostWrite = () => {
    this.setState({
      openPostWrite: false
    })
  }

  renderPosts(posts){
    if(posts){
      console.log('have someting');
    }else {
      console.log('nothing');
    }
  }

  render() {
    const { posts, auth } = this.props;
    const user = (auth.user ? {
      name: auth.user.name
    } :{
      name: 'Aest'
    })
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">CreateReview</li>
        </ol>

            <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
              <div className='grid-cell animate-top'  style={{maxWidth: '530px', minWidth: '280px'}}>
              <List>
                <PostWrite open={this.state.openPostWrite} onRequestClose={this.handleClosePostWrite} edit={false} >
                  <Paper zDepth={2} style={{ height: "68px", width: "100%" }}>

                    <ListItem
                      primaryText={<span style={{ color: grey400, cursor: "text" }}> What's new with you? </span>}
                      leftAvatar={<Avatar backgroundColor='#00bcd4' size={40} style={{ top: "8px" }}>{user.name.slice(0,1)}</Avatar>}
                      rightIcon={<SvgCamera />}
                      style={{ padding: "7px 0px", fontWeight: "200" }}
                      onClick={(e) => (this.handleOpenPostWrite(e))}
                    />

                  </Paper>
                </PostWrite>
              </List>
              <div style={{ height: "50px" }}></div>
              {
              auth.user && posts && posts.map((post) => (
                  <div>
                    <Card>
                      <CardHeader
                        title={auth.user.name}
                        avatar={<Avatar backgroundColor='#00bcd4' size='40' style={{ top: "8px" }}>{user.name.slice(0,1)}</Avatar>}
                      />
                      <CardMedia overlay={<CardTitle title={post.title} />} >
                        <img src={post.image1} alt="" />
                      </CardMedia>
                      <CardText>
                        {post.body}
                      </CardText>
                      <CardActions>
                        <FlatButton label="View more" href={"/products/" + post.id}/>
                      </CardActions>
                    </Card>
                    <div style={{ height: "50px" }}></div>
                  </div>
                ))
              }
              </div>
            </div>

      </div>
    );
  };
}
