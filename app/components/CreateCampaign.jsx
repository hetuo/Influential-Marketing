import React from 'react';
import { Link, browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from '../store';

const styles = {
  customWidth: {
    width: 450,
  },
};

export default class CreateCampaign extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      auth: {}
    };

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
  }

  onCreateSubmit(e){
    e.preventDefault();
    const Campaign = {
      camptitle: this.state.title,
      campdetails: this.state.detail,
      campzipcode: this.props.auth.user.zipcode,
      campcreater: this.props.auth.user.name,
      numinfluencers: this.state.num,
      campbudget: this.state.money,
      brand_id: this.props.auth.user.id
      //brand_id: '1'
    };
    this.props.createCampaign(Campaign);
    // e.target.num.value = '';
    // e.target.money.value = '';
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">createCampaign</li>
        </ol>
        <section className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              <form
                className="login-form"
                onSubmit={this.onCreateSubmit}>
                <TextField
                  hintText="like 10"
                  floatingLabelText="How many Influencers you want?"
                  name="num"
                  onChange={(event, value) => this.setState({ num: value })}
                  type="text"
                  style={styles.customWidth}
                /><br />
                <TextField
                  hintText="like $100"
                  floatingLabelText="How much can you pay for each Influencer?"
                  name="money"
                  onChange={(event, value) => this.setState({ money: value })}
                  type="text"
                  style={styles.customWidth}
                /><br />
                <TextField
                  hintText=""
                  floatingLabelText="Campaign Title"
                  name="title"
                  onChange={(event, value) => this.setState({ title: value })}
                  type="text"
                  style={styles.customWidth}
                /><br />
                <TextField
                  hintText=""
                  floatingLabelText="Campaign Details"
                  name="detail"
                  onChange={(event, value) => this.setState({ detail: value })}
                  type="text"
                  style={styles.customWidth}
                /><br />

                <RaisedButton
                  type="submit"
                  label="Create Campaign"
                  labelStyle={{ fontSize: '16px', lineHeight: '48px' }}
                  style={{ boxShadow: 'none', height: '48px', width: '50%' }}
                  primary={true}
                  onTouchTap={this.handleFormValidation}
                /><br /><br />
                </form>
              </div>
            </div>
          </section>
      </div>
    );
  };
}
