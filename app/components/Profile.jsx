import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { removeItem, updateQuantity } from '../action-creators/cart';
import {logout} from 'APP/app/reducers/auth'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {}
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ auth: nextProps.auth});
  }

  handleOnSubmit(e) {
    e.preventDefault()
    console.log("update user information");

    const profile = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    console.log("profile: ", this.props);
    this.props.updateProfile(profile.name, profile);
  }

  render(){
    // console.log("user********", this.props.user);
    // let user = this.props.user;
    const { auth } = this.props;
    return (
      <div className="user-profile">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">User Profile</li>
        </ol>
        <section className="user-info container-fluid">
          <div className="row">
            { auth.user && auth.user.email && auth.user.password_digest ?
            (<div className="col-xs-12 col-md-6 col-md-offset-3">
            <form onSubmit={(e) => (this.handleOnSubmit(e))}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder={auth.user.name} className="form-control" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder={auth.user.email} className="form-control" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="******" className="form-control" />
              </div>
              <button type="submit">Update</button>
            </form>
           </div>): null}
          </div>
        </section>
      </div>
    );
  }
}

const mapProps = ({ auth }) => ({ auth });

// export default connect(mapState)(UserProfile);
// export default connect(
  // (mapState),
  // ({ auth }) => ({ user: auth }),
  // {logout},
// )(UserProfile)

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logout());
    browserHistory.push('/');
  }
});

export default connect(mapProps, mapDispatch)(UserProfile);
