import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';

import { northwesternPurple, northwesternPurple10 } from '../colors';

const style = {
  hero: {
    backgroundImage: `url(${'/images/Cover1.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '600px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  heroText: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '600px',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingTop: '280px'
  },
  heroTitle: {
    fontSize: '50px'
  },
  sectionOdd: {
    padding: '50px'
  },
  sectionEven: {
    padding: '50px',
    backgroundColor: northwesternPurple10
  },
  purpleHeader: {
    color: northwesternPurple,
    marginBottom: '50px'
  },
  centeredPurpleHeader: {
    color: northwesternPurple,
    marginBottom: '50px',
    textAlign: 'center'
  },
  divideTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  studentImage: {
    width: '1200px'
  },
  screenshot: {
    width: '1200px'
  },
  screenshot2: {
    width: '700px'
  },
  blurbs: {
    marginLeft: '50px',
    marginRight: '50px',
    marginBottom: '50px'
  },
  compare: {
    width: '300px'
  },
  compareItem: {
    textAlign: 'center',
    marginTop: '30px',
    marginBottom: '50px'
  },
  compareTitle: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  regalLogo: {
    width: '250px'
  },
  logos: {
    width: '128px',
    height: '128px'
  },
  learnMoreButton: {
    display: 'block',
    margin: 'auto',
    width: '120px'
  },
  learnMoreButtonWrapper: {
    padding: '20px'
  }
};

const About = () => (
  <div>
    <div style={style.hero}></div>
    <div style={style.heroText}>
      <h1 style={style.heroTitle}>Influential.</h1>
      <h2>Help Portal</h2>
    </div>

    <div style={style.sectionOdd}>
      <h1 style={style.centeredPurpleHeader}>
        Influencer <span style={{ fontStyle: 'italic' }}></span>
      </h1>
      <div style={style.divideTwo}>
        <div style={style.blurbs}>
          <h1>As an influencer  in  our   platform,   your influence  comes   from  the   quality   of  your reviews,   not   from  the   quantity  of  followers
                      you have  on  social  medias.</h1>
          <h1>Great reviews are original, genuine, authentic, and are
                      valuable  both  to  the potential consumers and
                      to  the ultimate  development of  the company,
                      no  matter  they  are praise  or  complaints. </h1>
          <h1>And to  save  the precious  time  of  potential readers,
                      we   encourage   you   to  make  your  review  as
                      concise as  possible  and worth every word.</h1>
        </div>
        <img src={'/images/index.png'} alt="Student with a laptop" style={style.studentImage} />
      </div>
    </div>

    <div style={style.sectionEven}>
      <h1 style={style.centeredPurpleHeader}>
        Marketers & <span style={{ fontStyle: 'italic' }}>Brand Account</span>
      </h1>
        <div style={style.divideTwo}>
        <div style={style.blurbs}>
          <h1>Marketers in  our
                      platform   know  that  fake  and   misleading
                      reviews  might   help  increase  company's
                      revenue  in  the   short   term
          </h1>
          <h1>The   negative WOM  starting  from  misled  and   angry
                      consumers  will  hurt  the   reputation  and
                      revenue of  the company in  the long  run.
          </h1>
          <h1>They
                      need   influencers   for   their   independent
                      expertise, knowledge, insights  and access  to
                      potential buyers  who trust them  because they
                      write what  can be trusted.</h1>
        </div>
        <img src={'/images/index2.png'} alt="Student with a laptop" style={style.screenshot} />
      </div>
    </div>
  </div>
);

export default About;
