import React from 'react';
import { regularsignup, influencersignup, brandsignup } from '../reducers/auth';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import map from 'lodash/map'; // TODO: replace with pure JS
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  customWidth: {
    width: 450,
  },
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'male',
      usertype: 'regular_user',
    };
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleChange(event, index, value) {
    this.state.usertype = value;
    // this.state.usertype = event.target.value;
    console.log("login:", this.state.usertype);
    this.setState({usertype: value});
  }

  handleChange2(event, index, value) {
    this.state.gender = value;
    // this.state.usertype = event.target.value;
    console.log("login:", this.state.gender);
    this.setState({gender: value});
  }

  onSignupSubmit(e){
    e.preventDefault();
    if(e.target.password.value !== e.target.passwordConfirm.value) {
      window.alert('password not match');
    } else {
      const credentials = {
        email: this.state.email,
        usertype: this.state.usertype,
        password: this.state.password,
        name: this.state.name,
        gender: this.state.gender,
        geo: this.state.geo,
        zipcode: this.state.zipcode,
        public_key: 'pk_test_dUpJ1puJKBLPgcFE7iaPdJoa',
        secret_key: 'sk_test_Y1mt48rrnpqB3QVpc2iZiG3t',
      }
      console.log("signusertype: ", this.state.usertype);
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
                <label className="control-label">Choose your account type:</label><br />
                <SelectField
                  name="usertype"
                  value={this.state.usertype}
                  onChange={this.handleChange}
                  style={styles.customWidth}
                  floatingLabelText=""
                  >
                  <MenuItem value={"regular_user"} primaryText="Regular User" />
                  <MenuItem value={"influencer"} primaryText="Influencer" />
                  <MenuItem value={"brand_account"} primaryText="Brand Account" />
                  <MenuItem value={"director"} primaryText="Director" />
                </SelectField><br />

                <SelectField
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange2}
                  style={styles.customWidth}
                  floatingLabelText=""
                  >
                  <MenuItem value={"male"} primaryText="Male" />
                  <MenuItem value={"female"} primaryText="Female" />
                </SelectField><br />

                  <TextField
                  hintText="Your email"
                  floatingLabelText="Email"
                  name="email"
                  onChange={(event, value) => this.setState({ email: value })}
                  type="email"
                  style={styles.customWidth}
                  /><br /> 

                  <TextField
                  hintText="Your name"
                  floatingLabelText="Name"
                  name="name"
                  onChange={(event, value) => this.setState({ name: value })}
                  type="text"
                  style={styles.customWidth}
                  /><br /> 



                  <TextField
                  hintText=""
                  floatingLabelText="State"
                  name="geo"
                  onChange={(event, value) => this.setState({ geo: value })}
                  type="text"
                  style={styles.customWidth}
                  /><br />  

                  <TextField
                  hintText=""
                  floatingLabelText="ZipCode"
                  name="zipcode"
                  onChange={(event, value) => this.setState({ zipcode: value })}
                  type="text"
                  style={styles.customWidth}
                  /><br />                 

                  <TextField
                    hintText="Your password"
                    floatingLabelText="Password"
                    name="password"
                    onChange={(event, value) => this.setState({ password: value })}
                    type="password"
                    style={styles.customWidth}
                  /><br />
                  <TextField
                    hintText="Re-type your password"
                    floatingLabelText="Re-type Password"
                    name="passwordConfirm"
                    onChange={(event, value) => this.setState({ passwordConfirm: value })}
                    type="password"
                    style={styles.customWidth}
                  /><br />             
                  <RaisedButton
                  type="submit"
                  label="Signup"
                  labelStyle={{ fontSize: '16px', lineHeight: '48px' }}
                  style={{ boxShadow: 'none', height: '48px', width: '30%' }}
                  primary={true}
                  onTouchTap={this.handleFormValidation}
                /><br /><br />
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
