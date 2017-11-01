import React from 'react';
import { login } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import userproperty from '../data/userproperty';
import classnames from 'classnames';
import map from 'lodash/map'; // TODO: replace with pure JS

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.onLoginSubmit = this.onLoginSubmit.bind(this)
  }

  onLoginSubmit(e){
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    console.log('credentials', credentials);
    this.props.login(credentials);
    // browserHistory.push('/');
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
          <li className="active">Login</li>
        </ol>
        <section className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <form
                className="login-form"
                onSubmit={this.onLoginSubmit}>
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
                  <label>Password</label>
                  <input className="form-control" name="password" type="password" />
                </div>
                <button type="submit" name="submit">Login</button>
                <Link href="/address"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;forget password?</span></Link>
              </form>
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
  login
}

export default connect (mapState, mapDispatch) (Login);
