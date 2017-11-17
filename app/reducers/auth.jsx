import axios from 'axios';
import { Link, browserHistory } from 'react-router';

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

export const signup = credential => dispatch =>
  axios.put('/api/auth/signup', credential)
    .then(()=>dispatch(whoami()))
    .catch(failed => dispatch(invaildEmail(null)));

export const socialLogin = credential => dispatch => {
  axios.put('/api/auth/sociallogin', credential)
    .then(() => {dispatch(whoami())})
    //.catch(() => dispatch(whoami()));
    .catch(failed => dispatch(invaildEmail(null)));
}

export const login = credential => dispatch =>
    axios.put('/api/auth/login', credential)
      .then(() => {dispatch(whoami());browserHistory.push('/');})
      //.catch(() => dispatch(whoami()));
      .catch(failed => dispatch(unauthenticated(null)));

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const whoami = () => dispatch => {
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data;
        console.log('whoami: ', user);
        dispatch(authenticated(user));
      })
      .catch(failed => dispatch(authenticated(null)));
}

export default reducer;
