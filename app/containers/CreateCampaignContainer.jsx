import { connect } from 'react-redux';
import CreateCampaign from '../components/CreateCampaign';
import { createCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ auth }) => ({
	auth: auth
});

const mapDispatch = { createCampaign };

export default connect(mapState, mapDispatch)(CreateCampaign);
