import { connect } from 'react-redux';
import Messager from '../components/Messager';
import { updateProfile, getProfile }from '../action-creators/profile';
import {bindActionCreators} from 'redux';
import * as actions from '../action-creators/msg';

const mapState = ({ profiles, auth }) => ({
  user: auth.user,
  alert: auth.alert
  // profile: profiles.selectedProfile
});

// const mapDispatch = { updateProfile, getProfile };
const mapDispatch = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapState, mapDispatch)(Messager);

