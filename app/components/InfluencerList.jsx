import React from 'react';
import SingleCampaign from './SingleCampaign';
import {List, ListItem} from 'material-ui/List';

const InfluencerList = ({ influencers }) => {
  return (
    <div>
      <List>
      {
        influencers && influencers.map((influencer) => {
          return (
            <div>
              <SingleCampaign influencer={ influencer } />
            </div>
          );
        })
      }
    </List>
  </div>
  );
};

export default CampaignList;
