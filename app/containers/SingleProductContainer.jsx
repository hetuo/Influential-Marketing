import { connect } from 'react-redux';
import SingleProduct from '../components/SingleProduct';
import { addToCart } from '../action-creators/cart';
import { removeReview, addReview, getReview }from '../action-creators/reviewActionCreator';

const mapState = ({ products, reviews, auth }) => ({
	product: products.selectedProduct,
	//reviews: products.selectedProduct.product_reviews,
	//newreview: reviews.selectedReview
	reviews: reviews.selectedReview,
	auth: auth
});

const mapDispatch = { removeReview, addReview, getReview, addToCart };

export default connect(mapState, mapDispatch)(SingleProduct);
