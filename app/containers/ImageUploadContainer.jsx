import { connect } from 'react-redux';
import ImageUpload from '../components/ImageUpload';
import { saveImage } from '../action-creators/ImageUploadActionCreator';
import { createCampaign } from '../action-creators/CampaignActionCreator';

const mapState = ({ auth }) => ({
	auth: auth
});

const mapDispatch = { saveImage, createCampaign };

export default connect(mapState, mapDispatch)(ImageUpload);
