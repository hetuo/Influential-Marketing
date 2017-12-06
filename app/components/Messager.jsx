import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {logout} from '../reducers/auth';
import {bindActionCreators} from 'redux';
import * as actions from '../action-creators/msg';
import io from "socket.io-client";
import Client from "./Client";
import { Table, ButtonToolbar, Button } from 'react-bootstrap';

let userCount= 0;
class Messager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      log: [],
      users: [],
      connectedUsers:{},
      socket: io.connect()
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ auth: nextProps.auth });
  }

  createMessageRoom() {
    console.log("start create room");
    const userInfo = {
      name: 'tyle',
      email: 'abc@qq.com',
    }
    this.props.message(userInfo);
  }

  componentDidMount() {
    let {socket} = this.state;
    Client(socket);
  }

  componentDidUpdate(prevProps, prevState){
    let currentClientSocketId = this.state.socket.id;
    let messageSocketId = this.props.socket.id;
  }

  handleOnSubmit(e) {
    e.preventDefault()
    const profile = {
      name: this.props.user.name,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    console.log("director: ", this.props);
  }

  render() {
    const { user, alert } = this.props;
    // console.log("director.jsx: ", this.props);
    return (
      <div className="user-director">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Messager</li>
        </ol>

        <div  ref="main_container" className="main-container">
          <div className="row">
            Influential Message Platform -- <span id="user_span">&nbsp;</span>
          </div>

          <div className="user-list">
            <div className="change-row">
              Current online users:
            </div>
            <ul id="user_list" className="dynamic-container">
            </ul>
          </div>

          <div className="message-container">
            <ul id="message_container" className="dynamic-container">&nbsp;</ul>
          </div>

          <div className="change-div">
            <div className="change-row">
              Your user name:
            </div>
            <div className="form-group">
              <input className="form-control" id="user_name" />
            </div>
            <button className="btn btn-default" id="change_name" >Modify</button>
          </div>

          <div className="write-div">
            <div className="change-row">
              Message box:
            </div>
            <div className="form-group">
              <input className="form-control" id="message_input" placeholder="Write your message here..." />
            </div>
            <button className="btn btn-default" id="message_send" >Send</button>
          </div>
        </div>
      </div>
    );
  }
}

Messager.propTypes = {
    actions: PropTypes.object.isRequired,
    socket: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {chatState} = state;
  return {
    users: chatState.userList,
    log: chatState.log,
    socket: chatState.socket,
    message:chatState.props
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logout());
    browserHistory.push('/');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Messager);