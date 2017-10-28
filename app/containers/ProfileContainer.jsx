import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { updateProfile, getProfile }from 'APP/app/action-creators/profile';

const mapState = ({ profiles }) => ({
  profile: profiles.selectedProfile
});

const mapDispatch = { updateProfile, getProfile };

export default connect(mapState, mapDispatch)(Profile);
