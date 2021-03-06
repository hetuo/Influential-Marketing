import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logout } from '../reducers/auth';
import Categories from './Categories';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import MobileTearSheet from './MobileTearSheet';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

/* -----------------    COMPONENT     ------------------ */

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      invites: []
    };
    this.onClickLogout = this.onClickLogout.bind(this);
    this.renderUsertype = this.renderUsertype.bind(this);
    this.onClickNotification = this.onClickNotification.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ auth: nextProps.auth});
  }

  onClickLogout(){
    this.props.logout();
    browserHistory.push('/');
  }

  onClickNotification(){
    browserHistory.push('/notifications');
  }

  renderUsertype(auth){
    if (auth.user && auth.user.email){
      if (auth.user.usertype === 'influencer') {
        return (
          <NavDropdown eventKey={6} title={auth.user.name} id="users">
            <MenuItem href="/profile">Profile</MenuItem>
            <MenuItem href="/address">Address Book</MenuItem>
            <MenuItem href={"/review/" + auth.user.id}>Write Review</MenuItem>
            <MenuItem href="/invites">Invites: {this.props.invites.length}</MenuItem>
            <MenuItem href="/messager?role=influencer&type=two">Message</MenuItem>
            <MenuItem role="separator" className="divider"></MenuItem>
            <MenuItem onClick={this.onClickLogout}>Logout</MenuItem>
          </NavDropdown>
        );
      } else if (auth.user.usertype === 'brand_account') {
        return (
        <NavDropdown eventKey={6} title={auth.user.name} id="users">
          <MenuItem href="/profile">Profile</MenuItem>
          <MenuItem href="/createcampaign">Create Campaign</MenuItem>
          <MenuItem href={"/managecampaign/" + auth.user.id}>Manage Campaign</MenuItem>
          <MenuItem role="separator" className="divider"></MenuItem>
          <MenuItem onClick={this.onClickLogout}>Logout</MenuItem>
        </NavDropdown>
        );
      } else if (auth.user.usertype === 'director') {
        return (
        <NavDropdown eventKey={6} title={auth.user.name} id="users">
          <MenuItem href="/profile">Profile</MenuItem>
          <MenuItem href="/influencer">Manage Influencer</MenuItem>
          <MenuItem href={"/messager?role=director&type=group&name=" + auth.user.name}>Group Message</MenuItem>
          <MenuItem onClick={this.onClickLogout}>Logout</MenuItem>
        </NavDropdown>
          );
      } else {
          return (
          <NavDropdown eventKey={6} title={auth.user.name} id="users">
            <MenuItem href="/profile">Profile</MenuItem>
            <MenuItem href="/address">Address Book</MenuItem>
            <MenuItem role="separator" className="divider"></MenuItem>
            <MenuItem onClick={this.onClickLogout}>Logout</MenuItem>
          </NavDropdown>
          );
      }
    } else {
      return (
        <NavDropdown eventKey={6} title="USER" id="users">
          <MenuItem href="/signup">Register</MenuItem>
          <MenuItem href="/login">Login</MenuItem>
        </NavDropdown>
      );
    }
  }

  render(){
    const { auth } = this.props;
    if (this.props.auth.user != null) {
      console.log("WTF...... %s %s", this.props.auth.user.name);
    }
    return (

      <Navbar collapseOnSelect>


        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Influencer Marketing</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {<Nav>
            <NavItem eventKey={2} onClick={() => browserHistory.push("/about")}>HELP PORTAL</NavItem>
          </Nav>}
          <Nav pullRight>
            {/*<NavItem eventKey={4} href="#">
              <i className="fa fa-search" aria-hidden="true"></i>
            </NavItem>
            <NavItem eventKey={5} onClick={(e)=>{browserHistory.push('/cart')}}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </NavItem>*/}
            { this.renderUsertype(auth) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ auth, campaign }) => ({
   auth: auth,
   invites: campaign.invites
  });

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logout());
    browserHistory.push('/');
  }
});

export default connect(mapProps, mapDispatch)(AppBar);
