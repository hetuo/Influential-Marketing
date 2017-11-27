import { connect } from 'react-redux';
import Detail from '../components/Detail';
import { inviteInfluencer } from '../action-creators/CampaignActionCreator';



const mapState = ({ influencers, products }) => ({
	influencer: influencers.selectedInfluencer,
	posts: products.selectedProducts
});

const mapDispatch = { inviteInfluencer };

export default connect(mapState, mapDispatch)(Detail);
