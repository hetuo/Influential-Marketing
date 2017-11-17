import { connect } from 'react-redux';
import Comment from '../components/Comment';
import { addComment }from '../action-creators/CommentActionCreator';
import { getReview }from '../action-creators/reviewActionCreator';

const mapState = (state, ownProps) => ({
	//console.log("hetuo..........." + ownProps.index);
	review: state.reviews.selectedReview[ownProps.index],
	auth: state.auth
});

const mapDispatch = { addComment, getReview };

export default connect(mapState, mapDispatch)(Comment);
