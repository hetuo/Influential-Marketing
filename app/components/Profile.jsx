import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { removeItem, updateQuantity } from '../action-creators/cart';
import {logout} from 'APP/app/reducers/auth'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    }
  }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log(componentWillUpdate, nextProps, nextState)
  // }
  handleOnSubmit(e) {
    e.preventDefault()
    console.log('update user information')
  }
  render(){
    console.log("user********", this.props.user);
    let user = this.props.user;
    const { auth } = this.props;
    return (
      <div className="user-profile">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">User Profile</li>
        </ol>
        {user ?
        <section className="user-info container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
            <form onSubmit={(e) => (this.handleOnSubmit(e))}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder={user.name} className="form-control" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder={user.email} className="form-control" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="******" className="form-control" />
              </div>
              <button type="submit">Update</button>
            </form>
           </div>
          </div>
        </section>
        :null}
      </div>
    );
  }
}

const mapState = ({ auth }) => ({ auth });

// export default connect(mapState)(UserProfile);
export default connect(
  // (mapState),
  ({ auth }) => ({ user: auth }),
  {logout},
)(UserProfile)
