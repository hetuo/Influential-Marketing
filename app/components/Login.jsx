import React from 'react';
import { regularlogin, influencerlogin, brandlogin, socialLogin } from '../reducers/auth';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';
import { FacebookButton, FacebookCount } from "react-social";
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import classnames from 'classnames';
import map from 'lodash/map';
var FontAwesome = require('react-fontawesome');

// google clientId: 723817412811-8q0570j4d9vo0htq66q8r7elj5h818oj.apps.googleusercontent.com
// google clientSecret: 03n9OHyMqZVCYDowxirC4OL2

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
      email: e.target.email.value,
      password: e.target.password.value,
      usertypes: this.state.usertype,
    }
    console.log('credentials', credentials);

    if (this.state.usertype == 'regular_user') {
      this.props.regularlogin(credentials);
    } else if (this.state.usertype == 'influencer') {
      this.props.influencerlogin(credentials);
    } else if (this.state.usertype == 'brand_account') {
      this.props.brandlogin(credentials);
    }
  }

  responseGoogle (response) {
    var id_token = response.getAuthResponse().id_token;
    console.log('google response:', response);
    console.log('google response:', response.w3.ig, response.w3.U3);
    const credentials = {
      email: response.w3.U3,
      name: response.w3.ig,
      usertypes: this.state.usertype,
      socialtype: 'google',
    }
    console.log('usertype:', this.state.usertype);
    this.props.socialLogin(credentials);
  }

  responseFacebook(response) {
    console.log('facebook login response', response);
    const credentials = {
      email: response.email,
      name: response.name,
      usertypes: this.state.usertype,
      socialtype: 'facebook',
    }
    console.log('usertype:', this.state.usertype);
    this.props.socialLogin(credentials);
  }

  handleChange(event) {
    this.state.usertype = event.target.value;
    this.setState({usertype: event.target.value});
    console.log("usertype:", this.state.usertype);
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
                <div className="form-group">
                  <label className="control-label">Choose your account type:</label>
                    <select className="form-control" name="usertype" value={ this.state.usertype } onChange={ this.handleChange }>
                      <option value="regular_user">Regular User</option>
                      <option value="influencer">Influencer</option>
                      <option value="brand_account">Brand Account</option>
                    </select>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-control" name="email" type="email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input className="form-control" name="password" type="password" />
                </div>
                <button type="submit" className="btn btn-info" name="submit">Login</button>
                <Link href="/address"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;forget password?</span></Link>
              </form>
              <div>
                <label className="control-label">Sign with</label>
                <br/>
                <GoogleLogin  socialId="723817412811-8q0570j4d9vo0htq66q8r7elj5h818oj.apps.googleusercontent.com"
                              className="google-login"
                              scope="profile"
                              fetchBasicProfile={true}
                              responseHandler={this.responseGoogle}
                              buttonText="Login With Google"
                />
                <br/><br/>
                <FacebookLogin
                               socialId="193858637827812"
                               language="en_US"
                               scope="public_profile,email"
                               responseHandler={this.responseFacebook}
                               xfbml={true}
                               fields="id,email,name"
                               version="v2.5"
                             className="btn btn-primary"
                               icon="fa-facebook"
                               buttonText="Login With Facebook"
                 />
              </div>
              <div className="social-button-group">
              <br/>
                <FacebookButton  className="btn btn-primary" url={ url } appId="193858637827812">
                  <FontAwesome  className="cs-fb-icon" name='facebook' />
                  &nbsp;shares
                </FacebookButton>
              </div>
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
  brandlogin,
  socialLogin,
}

export default connect (mapState, mapDispatch) (Login);
