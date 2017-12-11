import React from 'react';
import { Link, browserHistory } from 'react-router';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import FlatButton from 'material-ui/FlatButton';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { updateCampaign } from '../action-creators/CampaignActionCreator';

class ShowAllInvites extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      invites: []
    };


    this.show = this.show.bind(this);
    this.write = this.write.bind(this);
  }

  show = (original) => {
    alert(original.campaign.campdetails);
  }

  write = (original) => {
    const req = {
      hirestage: 1
    }
    this.props.updateCampaign(original.id, req);
    browserHistory.push(`/review/${original.influencer_id}`);
  }

  render() {
    return (
      <div className="login-wrapper">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Invites</li>
        </ol>
        <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
          <div className='grid-cell animate-top'  style={{maxWidth: '1050px', minWidth: '280px'}}>
          <ReactTable
            data={this.props.invites}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
            columns={[
              {
                Header: "Invitation Info",
                columns: [
                  {
                    Header: "Brand",
                    id: "campcreater",
                    accessor: d => d.campaign.campcreater,
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["brand_id"] }),
                    filterAll: true,
                    width: 150
                  },
                  {
                    Header: "Payment",
                    accessor: "payment_amount",
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["payment_amount"] }),
                    filterAll: true,
                    width: 150
                  },
                  {
                    Header: "Title",
                    id: "camptitle",
                    accessor: d => d.campaign.camptitle,
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["camptitle"] }),
                    filterAll: true,
                    width: 250
                  },
                  {
                    /*Header: "Detail",
                    id: "campdetails",
                    accessor: d => d.campaign.campdetails,
                    filterMethod: (filter ,rows) =>
                      matchSorter(rows, filter.value, { keys: ["campdetails"] }),
                    filterAll: true*/
                    Header: "Detail",
                    id: 'click-me-button',
                    accessor: "",
                    width: 350,
                    Cell: ({ original }) => {
                      return (
                        <FlatButton label="Click to Show All" onClick={() => this.show(original)} />
                      );
                    },
                    sortable: false
                  },
                  {
                    Header: "Write Review",
                    id: 'click-me-button',
                    accessor: "",
                    Cell: ({ original }) => {
                      return (
                        <FlatButton label="Write" onClick={() => this.write(original)} />
                      );
                    },
                    sortable: false,
                    width: 150
                  }
                ]
              }
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
          <br />
        </div>
        </div>
      </div>
    );
  };
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ campaign }) => ({
   invites: campaign.invites
});


const mapDispatch = { updateCampaign };

export default connect(mapProps, mapDispatch)(ShowAllInvites);
