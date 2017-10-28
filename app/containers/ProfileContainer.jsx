import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { updateProfile, getProfile }from 'APP/app/action-creators/profile';

const mapState = ({ profiles, auth }) => ({
  user: auth.user,
  alert: auth.alert
  // profile: profiles.selectedProfile
});

const mapDispatch = { updateProfile, getProfile };
// const mapDispatch = dispatch => ({
//   logout: () => {
//     dispatch(logout());
//     browserHistory.push('/');
//   }
// });

export default connect(mapState, mapDispatch)(Profile);
