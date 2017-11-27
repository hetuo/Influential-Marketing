import { connect } from 'react-redux';
import ManageCampaign from '../components/ManageCampaign';
import { createCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ auth, campaign }) => ({
	auth: auth,
	campaigns: campaign.campaigns
});

const mapDispatch = { createCampaign };

export default connect(mapState, mapDispatch)(ManageCampaign);
