import { connect } from 'react-redux';
import SingleCampaign from '../components/SingleCampaign';
import { setSelectCampaign, updateCampaign }from '../action-creators/CampaignActionCreator';

const mapState = null;

const mapDispatch = { setSelectCampaign, updateCampaign };

export default connect(mapState, mapDispatch)(SingleCampaign);
