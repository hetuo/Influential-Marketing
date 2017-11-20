import { connect } from 'react-redux';
import Campaign from '../components/Campaign';
import { addCampaign } from '../action-creators/CampaignActionCreator';



const mapState = ({ influencers, campaign }) => ({
	influencers: influencers.list,
	campaign: campaign.campaign
});

const mapDispatch = { addCampaign };

export default connect(mapState, mapDispatch)(Campaign);
