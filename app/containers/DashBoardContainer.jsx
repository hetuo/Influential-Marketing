import { connect } from 'react-redux';
import DashBoard from '../components/DashBoard';
import { addCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ auth }) => ({
	auth: auth
});

const mapDispatch = { addCampaign };

export default connect(mapState, mapDispatch)(DashBoard);
