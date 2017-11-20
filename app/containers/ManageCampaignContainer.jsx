import { connect } from 'react-redux';
import ManageCampaign from '../components/ManageCampaign';
import { createCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ auth }) => ({
	auth: auth
});

const mapDispatch = { createCampaign };

export default connect(mapState, mapDispatch)(ManageCampaign);
