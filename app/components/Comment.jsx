import React from 'react';
import { connect } from 'react-redux';
import { addComment }from '../action-creators/CommentActionCreator';
import { getReview }from '../action-creators/reviewActionCreator';

class Comment extends React.Component {
  constructor(props){
    super(props);
      this.state = {
      review: {},
      auth: {}
    };
    this.onAddCommentSubmit = this.onAddCommentSubmit.bind(this);
  }

  onAddCommentSubmit (e) {
    e.preventDefault()
    console.log('hetuo test' + this.props.review);
    console.log('hetuo test....' + this.props.auth);
    const comment = {
      body: e.target.body.value,
      product_review_id: this.props.review.id,
      //product_id: this.props.review.product_id,
      user_id: this.props.auth.user.id
    };
    console.log("comment: ", this.props);
    this.props.addComment(comment, this.props.review.product_id);
    e.target.body.value = '';
  }

  render() {
    const { review } = this.props;
    return (
      <div style={this.props.open ? { display: "block" } : {display: "none"}}>
        <div className="container-fluid" style={{padding: '0 30px'}}>
          <form className="row" onSubmit={(e) => (this.onAddCommentSubmit(e))}>
            <div className="form-group col-xs-12 col-md-8" >
              <textarea name="body" style={{width: '400px'}} placeholder="Write a review"  className="form-control" />
              <button type="submit" className="btn btn-xs btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

const mapState = (state, ownProps) => ({
	//console.log("hetuo..........." + ownProps.index);
	review: state.reviews.selectedReview[ownProps.index],
	auth: state.auth
});

const mapDispatch = { addComment, getReview };

export default connect(mapState, mapDispatch)(Comment);
