import React from 'react';
import { Link, browserHistory } from 'react-router';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import store from '../store';
import CampaignList from './CampaignList';

export default class ManageCampaign extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      auth: {},
      campaigns: []
    };

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.noCampaign = this.noCampaign.bind(this);
    this.goToInvite = this.goToInvite.bind(this);
    this.showCampaign = this.showCampaign.bind(this);
    this.detail = this.detail.bind(this);
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

  detail(campaigns){
    if (campaigns){
      campaigns && campaigns.map((campaign) => {
        if (campaign.hire_influencers){
          console.log('going to show campaign info..', campaign);
          this.showCampaign(campaign);
        }else{
          this.goToInvite(campaign);
        }
      });
    }else{
      this.noCampaign();
    }
  }

  noCampaign(){
    console.log('no campaign');
    return (
      <div>
        <h1> You didn't create any campaign!</h1>
      </div>
    );
  }

  goToInvite(campaign){
    return (
      <form
      className="login-form"
      onSubmit={this.onCreateSubmit}>
      <button type="submit" name="submit">Select Influencer</button>
      </form>
    );
  }

  showCampaign(campaign){
    return (<div><h1>WTF</h1></div>);
  }

  render() {
      const { campaigns } = this.props;
      console.log(campaigns);
      return (
        <div>
          <div className="login-wrapper">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li className="active">ManageCampaign</li>
            </ol>
          </div>
          <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
            <div className='grid-cell animate-top'  style={{maxWidth: '910px', minWidth: '280px'}}>
            {
              campaigns ? (<CampaignList campaigns={ campaigns } />) : (this.noCampaign())
            }
            </div>
          </div>
        </div>
      );
  }
}
