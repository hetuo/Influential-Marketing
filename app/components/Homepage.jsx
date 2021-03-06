import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router';
import Products from './Products';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Home = ({ products }) => {
  return (
    <div className="home">

      <div className="image-slide">
        <div className="image-info">
        </div>
      </div>

    <MuiThemeProvider>
      <Products products={products} />
    </MuiThemeProvider>
    
    { <section className="container-fluid promo-wrapper">
        <div className="row">
          <div className="col-xs-12 col-lg-6 our-story">
            <Link href="/about"> <span>About</span> </Link>
          </div>
          <div className="col-xs-12 col-lg-6 new-arrival">
            <Link href="/products/category/New%20Arrivals"> <span>NEW RELEASES</span>	</Link>
          </div>
        </div>
      </section> }
      <p style={{padding: '40px'}} />
    </div>
  );
};

const mapState = ({ products }) => ({ products: products.list });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Home);
