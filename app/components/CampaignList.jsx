import React from 'react';
import SingleCampaign from './SingleCampaign';
import {List, ListItem} from 'material-ui/List';

const CampaignList = ({ campaigns }) => {
  return (
    <div>
      <List>
      {
        campaigns && campaigns.map((campaign) => {
          return (
            <div>
              <SingleCampaign campaign={ campaign } />
            </div>
          );
        })
      }
    </List>
  </div>
  );
};

export default CampaignList;
