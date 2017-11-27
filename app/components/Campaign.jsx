import React from 'react';
import { Link, browserHistory } from 'react-router';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import FlatButton from 'material-ui/FlatButton';
import 'react-table/react-table.css'

/*Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
})*/

export default class Campaign extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      influencers: [],
      arrayOfId: [],
      selected: {},
      campaign: {},
      selectAll: 0
    };

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
    this.addId = this.addId.bind(this);
    this.removeId = this.removeId.bind(this);
    this.view = this.view.bind(this);
    this.invite = this.invite.bind(this);
  }

  view = (original) => {
    browserHistory.push(`/detail/${original.id}`);
  }

  invite = (original) => {
    this.toggleRow(original.id);
    const i = {
      hirestate: 0,
      payment_amount: this.props.campaign.campbudget,
      paymentcurrency: 'usd',
      campaign_id: this.props.campaign.id,
      influencer_id: original.id,
      brand_id: this.props.campaign.brand_id
    };
    this.props.inviteInfluencer(i);
  }

  addId(id){
    this.state.arrayOfId.push(id);
    console.log("hetuo test...", this.state.arrayOfId);
  }

  removeId(id){
    for (var i=0; i < this.state.arrayOfId.length; i++){
      if (this.state.arrayOfId[i] == id){
        this.state.arrayOfId.splice(i, 1);
        break;
      }
    }
    console.log("hetuo test...", this.state.arrayOfId);
  }

  toggleRow(id) {
    const newSelected = Object.assign({}, this.state.selected);
    console.log("xxxx", this.state.selected[id]);
    if (this.state.selected[id] == undefined || this.state.selected[id] == false){
      newSelected[id] = true;
      this.setState(
        {selected: newSelected,
        selectAll: (this.state.selectAll + 1)}
      );
      console.log("xxxx", this.state.selected[id]);
      console.log("yyyy", this.state.selectAll);
      this.addId(id);
    }
  }

  onCreateSubmit(e){
    e.preventDefault();
    if (this.state.arrayOfId.length != this.props.campaign.num){
      alert("You need " + this.props.campaign.num + " influencers" + " while you chose " + this.state.arrayOfId.length);
    } else{
      const info = {
        arrayofId: this.state.arrayofId,
        payout: this.props.campaign.money
      }
    }
  }

  render() {
    const { influencers } = this.props;
    console.log(influencers);
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Campaign</li>
        </ol>
        <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
          <div className='grid-cell animate-top'  style={{maxWidth: '700px', minWidth: '280px'}}>
          <h1>{"You can invite "+ (this.props.campaign.numinfluencers - this.state.selectAll) + " influencers"}</h1>
          <ReactTable
            data={influencers}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
            columns={[
              {
                Header: "Info",
                columns: [
                  {
                    Header: "Id",
                    id: "id",
                    accessor: d => d.id,
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["id"] }),
                    filterAll: true,
                    width: 45
                  },
                  {
                    Header: "Name",
                    accessor: "name",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["name"] }),
                    filterAll: true,
                    width: 100
                  },
                  {
                    Header: "Email",
                    accessor: "email",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["email"] }),
                    filterAll: true
                  },
                  {
                    Header: "Gender",
                    accessor: "gender",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["gender"] }),
                    filterAll: true,
                    width: 60
                  },
                  {
                    Header: "Zipcode",
                    accessor: "zipcode",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["zipcode"] }),
                    filterAll: true,
                    width: 60
                  },
                  {
                    Header: "View",
                    id: 'click-me-button',
                    accessor: "",
                    Cell: ({ original }) => {
                      return (
                        <FlatButton label="View" onClick={() => this.view(original)} />
                      );
                    },
                    sortable: false,
                    width: 100
                  },
                  {
                    Header: "Invite",
                    id: 'click-me-button',
                    accessor: "",
                    Cell: ({ original }) => {
                      if (this.state.selected[original.id] === undefined || this.state.selected[original.id] === false){
                        if (this.state.selectAll === this.props.campaign.numinfluencers){
                          return (
                            <FlatButton label="Invite" disabled={true} />
                          );
                        }else{
                          return (
                            <FlatButton label="Invite" onClick={() => this.invite(original)} />
                          );
                        }

                      }else{
                        return (
                          <FlatButton label="Invited" disabled={true} onClick={() => this.invite(original)} />
                        );
                      }
                    },
                    sortable: false,
                    width: 100
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
        </div>
      </div>
    );
  };
}
