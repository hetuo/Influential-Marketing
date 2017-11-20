import { connect } from 'react-redux';
import createReview from '../components/createReview';
import { createCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ auth, products }) => ({
	auth: auth,
	posts: products.selectedProducts
});

const mapDispatch = { createCampaign };

export default connect(mapState, mapDispatch)(createReview);
