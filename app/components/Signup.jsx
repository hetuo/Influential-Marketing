import React from 'react';
import { regularsignup, influencersignup, brandsignup } from '../reducers/auth';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import userproperty from '../data/userproperty';
import map from 'lodash/map'; // TODO: replace with pure JS

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'male',
      usertype: 'regular_user',
    };
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.state.usertype = event.target.value;
    this.setState({usertype: event.target.value});
    this.setState({gender: event.target.value});
    console.log("usertype:", this.state.usertype, event.target);
    // console.log("usertype:", this.state.usertype);
  }

  onSignupSubmit(e){
    e.preventDefault();
    if(e.target.password.value !== e.target.passwordConfirm.value) window.alert('password not match');
    else {
      const credentials = {
        email: e.target.email.value,
        usertype: this.state.usertype,
        password: e.target.password.value,
        name: e.target.name.value,
        gender: e.target.gender.value,
        geo: e.target.geo.value,
        zipcode: e.target.zipcode.value,
      }
      if (this.state.usertype == 'regular_user') {
        this.props.regularsignup(credentials);
      } else if (this.state.usertype == 'influencer') {
        this.props.influencersignup(credentials);
      } else if (this.state.usertype == 'brand_account') {
        this.props.brandsignup(credentials);
      }

      console.log('credentials', credentials);
      browserHistory.push('/');
    }
  }

  render() {
    const { user, alert } = this.props;
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Register</li>
        </ol>
        <section className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <form className="login-form" onSubmit={this.onSignupSubmit}>
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
                  <label>Name</label>
                  <input className="form-control" name="name" type="text" />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-control" name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input className="form-control" name="geo" type="text" />
                </div>
                <div className="form-group">
                  <label>ZipCode</label>
                  <input className="form-control" name="zipcode" type="text" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input className="form-control" name="password" type="password" placeholder="type your password" />
                </div>
                <div className="form-group">
                  <label>Password Confirmation</label>
                  <input className="form-control" name="passwordConfirm" type="password" placeholder="re-type your password" />
                </div>
                <button type="submit" name="submit">Register</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      );
    }

  }

  const mapState = ({ auth }) => ({
    user: auth.user,
  	alert: auth.alert
  });
  const mapDispatch = { regularsignup, influencersignup, brandsignup };

  export default connect(mapState, mapDispatch)(Signup);
