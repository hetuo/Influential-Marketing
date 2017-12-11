import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { removeItem, updateQuantity } from '../action-creators/cart'
import {logout} from '../reducers/auth'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  customWidth: {
    width: 450,
  },
};

export default class Profile extends React.Component {
  // const { user, alert } = this.props;

  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      profiles: []
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ auth: nextProps.auth});
  }

  handleOnSubmit(e) {
    e.preventDefault()
    console.log("update user information");

    const profile = {
      name: this.props.user.name,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    console.log("profile: ", this.props);
    this.props.updateProfile(this.props.user.name, profile);
  }

  render() {
    // console.log("user********", this.props.user);
    // let user = this.props.user;
    const { user, alert } = this.props;
    console.log("profile.jsx: ", this.props);
    return (
      <div className="user-profile">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">User Profile</li>
        </ol>
        <section className="user-info container-fluid">
          <div className="row">
            { user && user.email && user.password_digest ?
            (<div className="col-xs-12 col-md-6 col-md-offset-3">
            <form onSubmit={(e) => (this.handleOnSubmit(e))}>
                <TextField
                  hintText={user.usertype}
                  floatingLabelText="User Type"
                  name="usertype"
                  onChange={(event, value) => this.setState({ usertype: value })}
                  type="text"
                  style={styles.customWidth}
                /><br />

                <TextField
                  hintText={user.name}
                  floatingLabelText="Name"
                  name="name"
                  onChange={(event, value) => this.setState({ name: value })}
                  type="text"
                  style={styles.customWidth}
                /><br />

                <TextField
                  hintText={user.email}
                  floatingLabelText="Email"
                  name="email"
                  onChange={(event, value) => this.setState({ email: value })}
                  type="text"
                  style={styles.customWidth}
                /><br />

                <TextField
                  hintText={user.password}
                  floatingLabelText="Password"
                  name="password"
                  onChange={(event, value) => this.setState({ password: value })}
                  type="password"
                  style={styles.customWidth}
                /><br />                

              <RaisedButton
                  type="submit"
                  label="Update"
                  labelStyle={{ fontSize: '16px', lineHeight: '48px' }}
                  style={{ boxShadow: 'none', height: '48px', width: '30%' }}
                  primary={true}
                  onTouchTap={this.handleFormValidation}
              /><br /><br />
            </form>
           </div>): null}
          </div>
        </section>
      </div>
    );
  }
}

// const mapProps = ({ auth }) => ({ auth });

// export default connect(mapState)(UserProfile);
// export default connect(
  // (mapState),
  // ({ auth }) => ({ user: auth }),
  // {logout},
// )(UserProfile)

// const mapDispatch = dispatch => ({
//   logout: () => {
//     dispatch(logout());
//     browserHistory.push('/');
//   }
// });
//
// export default connect(mapProps, mapDispatch)(Profile);
