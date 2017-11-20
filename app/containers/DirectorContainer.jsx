import { connect } from 'react-redux';
import Director from '../components/Director';
// import { updateProfile, getProfile }from '../action-creators/profile';

const mapState = ({}) => ({
});
// const mapState = ({ profiles, auth }) => ({
//   user: auth.user,
//   alert: auth.alert
//   // profile: profiles.selectedProfile
// });

const mapDispatch = {};
// const mapDispatch = dispatch => ({
//   logout: () => {
//     dispatch(logout());
//     browserHistory.push('/');
//   }
// });

export default connect(mapState, mapDispatch)(Director);
