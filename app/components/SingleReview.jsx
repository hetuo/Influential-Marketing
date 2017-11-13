import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link, browserHistory } from 'react-router';
import Comment from './Comment'

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
    if (this.props.review.user == null){
      return (
        <div className="title">
          { this.props.review.title }
          <input type="text" name="title" className="form-control hide" defaultValue={ this.props.review.title } />
        </div>
      );
    } else {
      return (
        <div className="title">
          { this.props.review.user.name + ':  '}
          <input type="text" name="title" className="form-control hide" defaultValue={ this.props.review.user.name + ': '} />
          { this.props.review.title }
          <input type="text" name="title" className="form-control hide" defaultValue={ this.props.review.title } />
        </div>
      );
    }
  }

  //render a single review for products
  render() {
    //const { reivew, index } = this.props;
    return (
      <div className="form-group">
          { this.renderUsername() }
        <div className="createdAt">{ new Date(this.props.review.created_at).toDateString() }</div>
        <div className="body">{ this.props.review.body }</div>
        <textarea className="form-control hide" name="body" defaultValue={ this.props.review.body } disabled />
        <StarRatingComponent
          name="starsr"
          starCount={5}
          editing={false}
          value={parseInt(this.props.review.stars)} />
        {/*<button className="btn btn-default btn-xs" onClick={this.handleOpenComments}>reply</button>*/}
        {/*<Comment open={this.state.openComments} index={this.props.index}/>*/}
      </div>
    );
  };
}
