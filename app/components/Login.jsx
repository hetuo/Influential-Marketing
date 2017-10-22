import React from 'react';
import { login } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'


class Login extends React.Component {
  constructor(props) {
    super(props);
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
    //browserHistory.push('/');
  }

  render() {
    const { user, alert } = this.props;
    console.log('WTF           %s', user);
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
                  <label>Email</label>
                  <input className="form-control" name="email" type="email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input className="form-control" name="password" type="password" />
                </div>
                <button type="submit" name="submit">Login</button>
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
