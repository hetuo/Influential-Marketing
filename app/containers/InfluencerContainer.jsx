import { connect } from 'react-redux';
import Influencer from '../components/Influencer';
// import { createCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ influencers, campaign }) => ({
	influencers: influencers.list,
	campaigns: campaign.campaigns
});

const mapDispatch = { };

export default connect(mapState, mapDispatch)(Influencer);
