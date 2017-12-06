import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import FlatButton from 'material-ui/FlatButton';
import { setSelectCampaign, updateCampaign } from '../action-creators/CampaignActionCreator';
import { getInfluencers } from '../action-creators/InfluencerActionCreator';
import { createPayment } from '../action-creators/PaymentActionCreator';
import Pay from './Pay';

class SingleCampaign extends React.Component{

  constructor(props){
    super(props);
      this.state = {
        openComments: false,
        influencers: [],
        flag: 1
      };
    this.pay = this.pay.bind(this);
    this.view = this.view.bind(this);
    this.payFirst = this.payFirst.bind(this);
    this.renderCampaign = this.renderCampaign.bind(this);
    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.get = this.get.bind(this);
  }

  get = () => {
    console.log('going to update influencer state');
    if (this.state.flag === 1){
      this.props.getInfluencers();
      this.setState({
        flag: 0
      })
    }

  }

  onCreateSubmit(e){
    e.preventDefault();
    this.props.setSelectCampaign(this.props.campaign);
    browserHistory.push('/select');
  }

  payFirst = (original) => {
    var res = confirm("Do you want to pay him/her before he/she finish the review?");
    console.log(' R        E         S', res);
    if (res === true)
      browserHistory.push(`/pay/${original.influencer_id}`)
  }

/*  pay = (original) => {
    const req = {
      hirestage: 2
    }
    this.props.updateCampaign(original.id, req);
    browserHistory.push(`/pay/${original.influencer_id}`)
  }*/

  pay = (name, description, amount, pk, sk, id) => {
      const req = {
        hirestage: 2
      }
      this.props.updateCampaign(id, req);
      const payment = {
        name: name,
        description: description,
        amount: amount,
        pk: pk,
        sk: sk
      }
      this.props.createPayment(payment);
      browserHistory.push(`/pay`)
    }

  view = (original) => {
    browserHistory.push(`/detail/${original.influencer_id}`)
  }

  renderCampaign(){
    //let {name} = this.props.review.user;
    if (this.props.campaign.hire_influencers.length != 0){
      this.get();
      return (
          <div>
            <p>{"Title: " + this.props.campaign.camptitle}</p>
            <p>{"Detail: " + this.props.campaign.campdetails}</p>
            <ReactTable
              data={this.props.campaign.hire_influencers}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={[
                {
                  Header: "Info",
                  columns: [
                    {
                      Header: "InfluencerId",
                      id: "Id",
                      accessor: d => d.influencer_id,
                      filterMethod: (filter ,rows) =>
                        matchSorter(rows, filter.value, { keys: ["id"] }),
                      filterAll: true,
                      width: 45
                    },
                    {
                      Header: "Budget",
                      accessor: "payment_amount",
                      filterMethod: (filter ,rows) =>
                        matchSorter(rows, filter.value, { keys: ["name"] }),
                      filterAll: true
                    },
                    {
                      Header: "Status",
                      accessor: "hirestage",
                      filterMethod: (filter ,rows) =>
                        matchSorter(rows, filter.value, { keys: ["email"] }),
                      filterAll: true,
                      Cell: ({ original }) => {
                        return (
                          <span>
                          {
                            original.hirestage === 0 ? 'Invited this influencer'
                            : original.hirestage === 1 ? 'This influencer has writen review'
                            : 'Finished'
                          }
                          </span>
                        );
                      }
                    },
                    {
                      Header: "ViewDetail",
                      id: 'click-me-button',
                      accessor: "",
                      Cell: ({ original }) => {
                        return (
                          <FlatButton label="View" onClick={() => this.view(original)} />
                        );
                      },
                      sortable: false
                    },
                    {
                      Header: "Pay",
                      id: 'click-me-button',
                      accessor: "",
                      Cell: ({ original }) => {
                        if (original.hirestage === 1){
                          /*return (
                            <FlatButton label="Pay" onClick={() => this.pay(original)} />
                          );*/
                          const influencer = this.props.influencers[original.influencer_id - 1];
                        //  console.log('88888888888', influencer);
                          if (influencer){
                            const name='Payment from ' + this.props.campaign.campcreater
                            const description='Payment from ' + this.props.campaign.campcreater
                            const amount=this.props.campaign.campbudget
                            const pk=influencer.public_key
                            const sk=influencer.secret_key
                            const id=original.id
                            return (
                              <Pay
                                name={'Payment from ' + this.props.campaign.campcreater}
                                description={'Payment from ' + this.props.campaign.campcreater}
                                amount={this.props.campaign.campbudget}
                                pk={influencer.public_key}
                                sk={influencer.secret_key}
                                id={original.id}
                              />
                              /*<FlatButton label="Pay" onClick={
                                  () => this.pay(name, description, amount, pk, sk, id)
                              } />*/
                            )
                          }
                        }else if (original.hirestage === 0) {
                          return (
                            <FlatButton label="Pay" disabled="true" onClick={() => this.payFirst(original)} />
                          );
                        }else{
                          return (
                            <FlatButton label="Pay" disabled="true" onClick={() => this.payFirst(original)} />
                          );
                        }
                      },
                      sortable: false
                    }
                  ]
                }
              ]}
              defaultPageSize={this.props.campaign.hire_influencers.length}
              className="-striped -highlight"
            />
            <br />
            <br />
          </div>
      );
    } else {
      return (
        <div>
          <p>{"Title: " + this.props.campaign.camptitle}</p>
          <p>{"Detail: " + this.props.campaign.campdetails}</p>
          <h1>You haven't selected influencers!</h1>
          <form
          className="login-form"
          onSubmit={this.onCreateSubmit}>
          <button type="submit" name="submit">Select Now!</button>
          </form>
        </div>

      );
    }
  }

  //render a single review for products
  render() {
    //const { reivew, index } = this.props;
    return (
      <div>
        { this.renderCampaign() }
      </div>
    );
  };
};

const mapState = ({ influencers }) => ({
	influencers: influencers.list
});

//const mapState = null;

const mapDispatch = { setSelectCampaign, getInfluencers, updateCampaign, createPayment };

export default connect(mapState, mapDispatch)(SingleCampaign);
