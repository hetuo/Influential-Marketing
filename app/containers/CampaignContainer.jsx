import { connect } from 'react-redux';
import Campaign from '../components/Campaign';
import { inviteInfluencer } from '../action-creators/CampaignActionCreator';

const mapState = ({ influencers, campaign }) => ({
	influencers: influencers.list,
	campaign: campaign.selectedCampaign
});

const mapDispatch = { inviteInfluencer };

export default connect(mapState, mapDispatch)(Campaign);
