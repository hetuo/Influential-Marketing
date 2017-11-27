import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { getInvites } from '../action-creators/CampaignActionCreator';

const initialState = {
  user: null,
  alert: {}
};

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case AUTHENTICATED:
      newState.user = action.user;
      newState.alert = action.alert;
      break;
    case UNAUTHENTICATED:
      newState.user = action.user;
      newState.alert = action.alert;
      break;
    default:
      return state;
  }
  return newState;
};

const AUTHENTICATED = 'AUTHENTICATED';
const UNAUTHENTICATED = 'UNAUTHENTICATED';
const INVAILDEMAIL = 'INVAILDEMAIL';

export const authenticated = username => ({
  type: AUTHENTICATED,
  user: username,
  alert: {
    type: 'alert-success',
    message: null}
});

export const unauthenticated = username => ({
  type: UNAUTHENTICATED,
  user: username,
  alert: {
    type: 'alert-danger',
    message: 'Username or password is incorrect'}
});

export const invaildEmail = username =>({
  type: INVAILDEMAIL,
  user: username,
  alert: {
    type: 'alert-danger',
    message: 'This email is already taken'
  }
});

export const regularsignup = credential => dispatch =>
  axios.put('/api/auth/regularsignup', credential)
    .then(()=>dispatch(whoami()))
    .catch(failed => dispatch(invaildEmail(null)));

export const influencersignup = credential => dispatch =>
  axios.put('/api/auth/influencersignup', credential)
    .then(()=>dispatch(whoami()))
    .catch(failed => dispatch(invaildEmail(null)));

export const brandsignup = credential => dispatch =>
  axios.put('/api/auth/brandsignup', credential)
    .then(()=>dispatch(whoami()))
    .catch(failed => dispatch(invaildEmail(null)));

export const socialLogin = credential => dispatch => {
  axios.put('/api/auth/sociallogin', credential)
    .then(() => {dispatch(whoami());browserHistory.push('/');})
    .catch(failed => dispatch(unauthenticated(null)));
}

export const regularlogin = credential => dispatch => {
  axios.put('/api/auth/regularlogin', credential)
    .then(() => {dispatch(whoami(credential));browserHistory.push('/');})
    //.catch(() => dispatch(whoami()));
    .catch(failed => dispatch(unauthenticated(null)));
}

export const influencerlogin = credential => dispatch => {
  console.log("influencerlogin: ", credential);
  axios.put('/api/auth/influencerlogin', credential)
    .then(() => {dispatch(whoami(credential));browserHistory.push('/');})
    //.catch(() => dispatch(whoami()));
    .catch(failed => dispatch(unauthenticated(null)));
}

export const brandlogin = credential => dispatch => {
  console.log("login: ", credential);
  axios.put('/api/auth/brandlogin', credential)
    .then(() => {dispatch(whoami(credential));browserHistory.push('/');})
    //.catch(() => dispatch(whoami()));
    .catch(failed => dispatch(unauthenticated(null)));
}

export const logout = () => dispatch => {
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));
}

export const whoami = credential => dispatch => {
    axios.get('/api/auth/whoami', credential)
      .then(response => {
        const user = response.data;
        console.log('whoamiuser: ', user);
        dispatch(authenticated(user));
        if (user.usertype === "influencer"){
          dispatch(getInvites(user.id));
        }
      })
      .catch(failed => dispatch(authenticated(null)));
}

export default reducer;
