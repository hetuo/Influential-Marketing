import React from 'react';
import { Link, browserHistory } from 'react-router';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';

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
      newSelected[id] = !this.state.selected[id];
      this.setState(
        {selected: newSelected,
        selectAll: 1}
      );
      this.addId(id);
    } else{
      newSelected[id] = !this.state.selected[id];
      this.setState(
        {selected: newSelected,
        selectAll: 1}
      );
      this.removeId(id);
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
        <div>
          <form
          className="login-form"
          onSubmit={this.onCreateSubmit}>
          <button type="submit" name="submit">Create Campaign</button>
          </form>
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
                    id: "checkbox",
                    accessor: "",
                    Cell: ({ original }) => {
                      return (
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={this.state.selected[original.id] === true}
                          onChange={() =>  this.toggleRow(original.id)}
                        />
                      );
                    },
                    sortable: false,
                    width: 45
                  },
                  {
                    Header: "Id",
                    id: "id",
                    accessor: d => d.id,
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["id"] }),
                    filterAll: true
                  },
                  {
                    Header: "Name",
                    accessor: "name",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["name"] }),
                    filterAll: true
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
                    filterAll: true
                  },
                  {
                    Header: "Zipcode",
                    accessor: "zipcode",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["zipcode"] }),
                    filterAll: true
                  },
                  {
                    id: 'click-me-button',
                    accessor: "",
                    Cell: ({ original }) => {
                      return (
                        <Link to="/">View</Link>
                      );
                    },
                    sortable: false,
                    width: 45
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
    );
  };
}
