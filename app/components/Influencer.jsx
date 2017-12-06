import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {logout} from '../reducers/auth';
import ReactTable from 'react-table';
import { browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Table, ButtonToolbar, Button } from 'react-bootstrap';
import 'react-table/react-table.css'

export default class Influencer extends React.Component {
  // const { user, alert } = this.props;
  constructor(props) {
    super(props);

    this.state = {
      influencers: [],
      arrayOfId: [],
      selected: {},
      campaign: {},
      selectAll: 0
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.createMessageRoom = this.createMessageRoom.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ auth: nextProps.auth });
  }

  createMessageRoom = () => {
    console.log("start create room");
    const userInfo = {
      name: 'tyle',
      email: 'abc@qq.com',
    };                     
    // browserHistory.push('messager');
  }

  handleOnSubmit(e) {
    e.preventDefault()
    console.log("update user information");

    const profile = {
      name: this.props.user.name,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    console.log("director: ", this.props);
  }

  noInfluencer() {
    console.log("no influencer");
    return (
        <div>
          <h1> You don't have any influencer!</h1>
        </div>
      );
  }

  render() {
    const { influencers } = this.props;
    console.log("influencerContainer:", influencers);
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Director</li>
        </ol>
       <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
          <div className='grid-cell animate-top'  style={{maxWidth: '900px', minWidth: '280px'}}>
          <ReactTable
            data={influencers}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
            columns={[
              {
                Header: "Influencers",
                columns: [
                  {
                    Header: "Id",
                    id: "id",
                    accessor: d => d.id,
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["id"] }),
                    filterAll: true,
                    width: 55 
                  },
                  {
                    Header: "Name",
                    accessor: "name",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["name"] }),
                    filterAll: true,
                    width: 120
                  },
                  {
                    Header: "Email",
                    accessor: "email",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["email"] }),
                    filterAll: true,
                    width: 250
                  },
                  {
                    Header: "Gender",
                    accessor: "gender",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["gender"] }),
                    filterAll: true,
                    width: 80
                  },
                  {
                    Header: "State",
                    accessor: "geo",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["geo"] }),
                    filterAll: true,
                    width: 80
                  },
                  {
                    Header: "Zipcode",
                    accessor: "zipcode",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["zipcode"] }),
                    filterAll: true,
                    width: 80
                  },
                  {
                    Header: "Remark",
                    accessor: "remark",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["Remark1"] }),
                    filterAll: true,
                    width: 80
                  },
                  {
                    Header: "Invite",
                    id: 'click-me-button',
                    accessor: "",
                    Cell: ({ original }) => {
                      return (
                            <FlatButton label="Chat" href={"/messager"+"?role=director&type=two"} />
                          );
                      // if (this.state.selected[original.id] === undefined || this.state.selected[original.id] === false){
                      //   if (this.state.selectAll === this.props.campaign.numinfluencers){
                      //     return (
                      //       <FlatButton label="Invite" disabled={true} />
                      //     );
                      //   }else{
                      //     return (
                      //       <FlatButton label="Invite" onClick={() => this.invite(original)} />
                      //     );
                      //   }

                      // }else{
                      //   return (
                      //     <FlatButton label="Invited" disabled={true} onClick={() => this.invite(original)} />
                      //   );
                      // }
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

        <div>
          <ButtonToolbar>
            <Button onClick={this.createMessageRoom} bsStyle="primary" bsSize="small">Small button</Button>
          </ButtonToolbar>
        </div>

      </div>
    );
  }
}