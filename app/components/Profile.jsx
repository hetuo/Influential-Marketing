import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { removeItem, updateQuantity } from '../action-creators/cart'
import {logout} from '../reducers/auth'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
      profiles: [],
      open: false,
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ auth: nextProps.auth});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOnSubmit = () => {
    const profile = {
      name: this.props.user.name,
      email: this.state.email,
      password: this.state.password,
    }
    console.log("update user information");
    this.props.updateProfile(this.props.user.name, profile);
    console.log("update user information");
    this.handleClose();
  }

  render() {
    // console.log("user********", this.props.user);
    // let user = this.props.user;
    const { user, alert } = this.props;
    console.log("profile.jsx: ", this.props);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleOnSubmit}
      />,
    ];

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

                <div>
                  <RaisedButton label="Update" 
                    labelStyle={{ fontSize: '16px', lineHeight: '48px' }}
                    style={{ boxShadow: 'none', height: '48px', width: '30%' }}
                    onClick={this.handleOpen} />
                  <Dialog
                    title="Update"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                    Are you sure to modify you email or password?
                  </Dialog>
                </div>
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
