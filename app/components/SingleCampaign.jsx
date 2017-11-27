import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import FlatButton from 'material-ui/FlatButton';
import { setSelectCampaign } from '../action-creators/CampaignActionCreator';

class SingleCampaign extends React.Component{

  constructor(props){
    super(props);
      this.state = {
        openComments: false
      };
    this.pay = this.pay.bind(this);
    this.view = this.view.bind(this);
    this.payFirst = this.payFirst.bind(this);
    this.renderCampaign = this.renderCampaign.bind(this);
    this.onCreateSubmit = this.onCreateSubmit.bind(this);
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

  pay = (original) => {
    const req = {
      hirestage: 2
    }
    this.props.updateCampaign(original.id, req);
    browserHistory.push(`/pay/${original.influencer_id}`)
  }

  view = (original) => {
    browserHistory.push(`/detail/${original.influencer_id}`)
  }

  renderCampaign(){
    //let {name} = this.props.review.user;
    if (this.props.campaign.hire_influencers.length != 0){
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
                      accessor: d => d.id,
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
                          return (
                            <FlatButton label="Pay" onClick={() => this.pay(original)} />
                          );
                        }else if (original.hirestage === 0) {
                          return (
                            <FlatButton label="Pay" disabled="true" onClick={() => this.payFirst(original)} />
                          );
                        }else{
                          return (
                            <FlatButton label="Pay" disabled="true" onClick={() => this.pay(original)} />
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

const mapState = null;

const mapDispatch = { setSelectCampaign };

export default connect(mapState, mapDispatch)(SingleCampaign);
