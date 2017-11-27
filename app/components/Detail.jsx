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





export default class Detail extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      influencer: {},
      posts: []
    };

  }


  render() {
    const { posts, influencer } = this.props;
    console.log("XXXXXXXXXXXX", influencer);
    const user = (influencer.name ? {
      name: influencer.name
    } :{
      name: 'Aest'
    })
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Detail</li>
        </ol>

            <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
              <div className='grid-cell animate-top'  style={{maxWidth: '530px', minWidth: '280px'}}>
              <div>
                <Card>
                  <CardHeader
                    title={user.name}
                    avatar={<Avatar backgroundColor='#00bcd4' size='40' style={{ top: "8px" }}>{user.name.slice(0,1)}</Avatar>}
                  />
                  <CardText>
                    <p>{"Email: " + influencer.email}</p>
                  </CardText>
                </Card>
                <div style={{ height: "50px" }}></div>
              </div>
              <div style={{ height: "50px" }}></div>
              {
                posts && posts.map((post) => (
                  <div>
                    <Card>
                      <CardHeader
                        title={user.name}
                        avatar={<Avatar backgroundColor='#00bcd4' size='40' style={{ top: "8px" }}>{user.name.slice(0,1)}</Avatar>}
                      />
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
