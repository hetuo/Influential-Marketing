import React from 'react';
import { signup } from '../reducers/auth';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import userproperty from '../data/userproperty';
import map from 'lodash/map'; // TODO: replace with pure JS

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  onSignupSubmit(e){
    e.preventDefault();
    if(e.target.password.value !== e.target.passwordConfirm.value) window.alert('password not match');
    else {
      const credentials = {
        email: e.target.email.value,
        password: e.target.password.value,
        name: e.target.name.value
      }
      console.log('credentials', credentials);
      this.props.signup(credentials);
      browserHistory.push('/');
    }
  }

  render() {
    const { user, alert } = this.props;
    const options = map(userproperty, (val, key) =>
      <option key={ val } value={ val }>{ key }</option>
    );
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
              <form
                className="login-form"
                onSubmit={this.onSignupSubmit}>
                <div className="form-group">
                  <label className="control-label">User Selection</label>
                  <select
                    className="form-control"
                    name="userproperty"
                    onChange={ this.onChange }
                    value={ this.state.userproperty}
                  >
                    <option value="" disabled>Choose Your User Account</option>
                    {options}
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
  const mapDispatch = { signup };

  export default connect(mapState, mapDispatch)(Signup);
