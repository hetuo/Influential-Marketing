import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class Campaign extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      auth: {}
    };

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
  }

  onCreateSubmit(e){
    e.preventDefault();
    console.log("hetuo test11.....%s", e.target.num.value);
    const Campaign = {
      num: e.target.num.value,
      money: e.target.money.value,
      user_id: this.props.auth.user.id
    };
    this.props.addCampaign(Campaign);
    e.target.num.value = '';
    e.target.money.value = '';
    browserHistory.push('/campaign');
  }

  render() {
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Campaign</li>
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
                <button type="submit" name="submit">Create Campaign</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  };
}
