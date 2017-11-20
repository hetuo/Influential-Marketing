import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {logout} from '../reducers/auth';
import { Table } from 'react-bootstrap';

export default class Director extends React.Component {
  // const { user, alert } = this.props;

  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      directors: []
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ auth: nextProps.auth });
  }

  handleOnSubmit(e) {
    e.preventDefault()
    console.log("update user information");

    const profile = {
      name: this.props.user.name,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    console.log("director: ", this.props);
    // this.props.updateProfile(this.props.user.name, profile);
  }

  render() {
    const { user, alert } = this.props;
    // console.log("director.jsx: ", this.props);
    return (

      <div className="user-director">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Director</li>
        </ol>
        <section className="user-info container-fluid">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>State</th>
              <th>ZipCode</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>
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

// export default connect(mapProps, mapDispatch)(Director);
