import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link, browserHistory } from 'react-router';
import Comment from './Comment';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


export default class SingleReview extends React.Component{

  constructor(props){
    super(props);
      this.state = {
        openComments: false
      };
    this.handleOpenComments = this.handleOpenComments.bind(this);
    this.renderUsername = this.renderUsername.bind(this);
  }

  handleOpenComments = (evt) => {
    evt.preventDefault()
    this.setState({
      openComments: !this.state.openComments
    })
  }

  renderUsername(){
    //let {name} = this.props.review.user;
    if (this.props.review.user){
      const user = {
        name: this.props.review.user
      };
      return (
        <div>
        <ListItem
          leftAvatar={<Avatar backgroundColor='#000000' size='40' style={{ top: "8px" }}>user.name.slice(0,1)</Avatar>}
          primaryText={ this.props.review.title }
          secondaryText={
            <p>
              { this.props.review.body }
            </p>
          }
          secondaryTextLines={2}
        />
        <StarRatingComponent
          name="starsr"
          starCount={5}
          editing={false}
          value={parseInt(this.props.review.stars)} />
        <hr width="100%" color='#00bcd4' SIZE='10' />
    </div>
      );
    } else {
      return (
        <div>
        <ListItem
          leftAvatar={<Avatar backgroundColor='#000000' size='40' style={{ top: "8px" }}>'A'</Avatar>}
          primaryText={ this.props.review.title }
          secondaryText={
            <p>
              { this.props.review.body }
            </p>
          }
          secondaryTextLines={2}
        />
        <StarRatingComponent
          name="starsr"
          starCount={5}
          editing={false}
          value={parseInt(this.props.review.stars)} />
        <hr width="100%" color='#00bcd4' SIZE='10' />
    </div>

      );
    }
  }

  //render a single review for products
  render() {
    //const { reivew, index } = this.props;
    return (
      <div>
        { this.renderUsername() }
      </div>
    );
  };
}
