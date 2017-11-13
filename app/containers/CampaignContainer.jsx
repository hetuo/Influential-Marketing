import { connect } from 'react-redux';
import Campaign from '../components/Campaign';
import { addCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ auth }) => ({
	auth: auth
});

const mapDispatch = { addCampaign };

export default connect(mapState, mapDispatch)(Campaign);
