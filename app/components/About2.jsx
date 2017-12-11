import React, { Component } from 'react';
import { Link } from 'react-router';

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">About</li>
        </ol>
        <section className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <div className="container-fluid">
                <div className="row">
                  <h3>About Influencer Marketing</h3>
                  <div className="col-xs-12 col-md-6">
                    <img src="https://cdn.shopify.com/s/files/1/0236/9929/files/FlagshipPage_77a3707e-1360-4cf4-b667-50f1408c0780.png?16534521691931141188" alt="New York Office" />
                    <h3>New York</h3>
                    <h5>5 Hanover Street | Financial District</h5>
                    <h5>504-407-2925</h5>
                    <h5>Monday - Wednesday: 10AM - 7PM</h5>
                    <h5>Thursday - Sunday: 10AM - 8PM</h5>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <img src= '/images/Cover1.jpg'/>
                    <h3>San Francisco</h3>
                    <h5>809 Royal Street | Historic District</h5>
                    <h5>912-495-5676</h5>
                    <h5>Monday - Wednesday: 10AM - 7PM</h5>
                    <h5>Thursday - Sunday: 10AM - 8PM</h5>
                  </div>
                  <div className="col-xs-12">
                   
                    <h5>
                      As an influencer  in  our   platform,   your influence  comes   from  the   quality   of  your reviews,   not   from  the   quantity  of  followers  
                      you have  on  social  medias.
                      Great reviews are genuine, authentic, and are 
                      valuable  both  to  the potential consumers and 
                      to  the ultimate  development of  the company,  
                      no  matter  they  are praise  or  complaints. And 
                      to  save  the precious  time  of  potential readers,  
                      we   encourage   you   to  make  your  review  as 
                      concise as  possible  and worth every word.   
                      And please  be  reassured that  marketers in  our 
                      platform   know  that  fake  and   misleading 
                      reviews  might   help  increase  company's  
                      revenue  in  the   short   term,   but   the   negative 
                      WOM  starting  from  misled  and   angry  
                      consumers  will  hurt  the   reputation  and  
                      revenue of  the company in  the long  run.  They  
                      need   influencers   for   their   independent
                      expertise, knowledge, insights  and access  to  
                      potential buyers  who trust them  because they  
                      write what  can be trusted.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
