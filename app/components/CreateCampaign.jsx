import React from 'react';
import { Link, browserHistory } from 'react-router';

import store from '../store';

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
      camptitle: e.target.title.value,
      campdetails: e.target.detail.value,
      campzipcode: this.props.auth.user.zipcode,
      campcreater: this.props.auth.user.name,
      numinfluencers: e.target.num.value,
      campbudget: e.target.money.value,
      brand_id: this.props.auth.user.id
      //brand_id: '1'
    };
    this.props.createCampaign(Campaign);
    e.target.num.value = '';
    e.target.money.value = '';
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
                <div className="form-group">
                  <label>How many Influencers you want?</label>
                  <input className="form-control" name="num" type="text" />
                </div>
                <div className="form-group">
                  <label>How much you can pay for each Influencer?</label>
                  <input className="form-control" name="money" type="text" />
                </div>
                <div className="form-group">
                  <label>Compaign Title</label>
                  <input className="form-control" name="title" type="text" />
                </div>
                <div className="form-group">
                  <label>Compaign details</label>
                  <input className="form-control" name="detail" type="text" />
                </div>
                <button type="submit" name="submit">Create Campaign</button>
                </form>
              </div>
            </div>
          </section>
      </div>
    );
  };
}
