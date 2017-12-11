import React from 'react';
import { regularlogin, influencerlogin, brandlogin, directorlogin, socialLogin } from '../reducers/auth';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';
import { FacebookButton, FacebookCount } from "react-social";
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import classnames from 'classnames';
import map from 'lodash/map';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
var FontAwesome = require('react-fontawesome');

// google clientId: 723817412811-8q0570j4d9vo0htq66q8r7elj5h818oj.apps.googleusercontent.com
// google clientSecret: 03n9OHyMqZVCYDowxirC4OL2

const styles = {
  customWidth: {
    width: 450,
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      usertype: 'regular_user',
      errors: {},
      isLoading: false,
    };
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  onLoginSubmit(e){
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.usertype,
    }
    console.log('credentials', credentials);

    if (this.state.usertype == 'regular_user') {
      this.props.regularlogin(credentials);
    } else if (this.state.usertype == 'influencer') {
      this.props.influencerlogin(credentials);
    } else if (this.state.usertype == 'brand_account') {
      this.props.brandlogin(credentials);
    } else if (this.state.usertype == 'director') {
      this.props.directorlogin(credentials);
    }
  }

  responseGoogle (response) {
    var id_token = response.getAuthResponse().id_token;
    console.log('google response:', response);
    console.log('google response:', response.w3.ig, response.w3.U3);
    const credentials = {
      email: response.w3.U3,
      name: response.w3.ig,
      usertype: this.state.usertype,
      socialtype: 'google',
    }
    this.props.socialLogin(credentials);
  }

  responseFacebook(response) {
    console.log('facebook login response', response);
    const credentials = {
      email: response.email,
      name: response.name,
      usertype: this.state.usertype,
      socialtype: 'facebook',
    }
    this.props.socialLogin(credentials);
  }

  handleChange(event, index, value) {
    this.state.usertype = value;
    // this.state.usertype = event.target.value;
    console.log("login:", this.state.usertype);
    this.setState({usertype: value});
  }

  render() {
    const { user, alert } = this.props;
    let url = "https://github.com";
    let msg = "hello world";
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Login</li>
        </ol>

        <section className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <form className="login-form" onSubmit={this.onLoginSubmit} >
                <label className="control-label">Choose your account type:</label><br />
                <SelectField
                  name="usertype"
                  value={this.state.usertype}
                  onChange={this.handleChange}
                  style={styles.customWidth}
                  floatingLabelText=""
                  >
                  <MenuItem value={"regular_user"} primaryText="Regular User" />
                  <MenuItem value={"influencer"} primaryText="Influencer" />
                  <MenuItem value={"brand_account"} primaryText="Brand Account" />
                  <MenuItem value={"director"} primaryText="Director" />
                </SelectField><br />
                <TextField
                  hintText="Your email"
                  floatingLabelText="Email"
                  name="email"
                  onChange={(event, value) => this.setState({ email: value })}
                  type="email"
                  style={styles.customWidth}
                /><br />
                <TextField
                  hintText="Your password"
                  floatingLabelText="Password"
                  name="password"
                  onChange={(event, value) => this.setState({ password: value })}
                  type="password"
                  style={styles.customWidth}
                /><br />
                <RaisedButton
                  type="submit"
                  label="Login"
                  labelStyle={{ fontSize: '16px', lineHeight: '48px' }}
                  style={{ boxShadow: 'none', height: '48px', width: '30%' }}
                  primary={true}
                  onTouchTap={this.handleFormValidation}
                /><br /><br />
                <li>
                    <Link to="password-reset">Forgot password?</Link>
                </li>
              </form>
                <GoogleLogin  socialId="723817412811-8q0570j4d9vo0htq66q8r7elj5h818oj.apps.googleusercontent.com"
                              className="google-login"
                              scope="profile"
                              fetchBasicProfile={true}
                              responseHandler={this.responseGoogle}
                              buttonText="Login With Google"
                />
                <FacebookLogin
                               socialId="193858637827812"
                               language="en_US"
                               scope="public_profile,email"
                               responseHandler={this.responseFacebook}
                               xfbml={true}
                               fields="id,email,name"
                               style={{ backgroundColor: '425bb4',width:200, height:40 }}
                               version="v2.5"
                               className="btn btn-primary"
                               buttonText="Login With Facebook"
                 >
                <FontAwesome  className="cs-fb-icon" name='facebook' />
                </FacebookLogin>
            </div>
          </div>
        </section>
      </div>
    )
  }

};

const mapState = ({ auth }) => ({
  user: auth.user,
	alert: auth.alert
});

const mapDispatch = {
  regularlogin,
  influencerlogin,
  directorlogin,
  brandlogin,
  socialLogin,
}

export default connect (mapState, mapDispatch) (Login);
