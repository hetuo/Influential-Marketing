import React from 'react';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
};


export default ({ products, category, location }) => (
  <div className="product-grid">
    {
      category && category.name ?
      (<ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Restaurant</Link></li>
        <li className="active">{category.name}</li>
      </ol>) :
      (<ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li className="active">Restaurant</li>
      </ol>)
    }

    <section className="product-grid container-fluid">
       <div className="row">
         {
           products && products.map(product => (
             <div className="product-item col-xs-12 col-lg-4" key={ product.id }>
               <Link to={`/products/${product.id}`}>
                 <div className="image-wrapper">
                   <img src={ product.image1 || 'http://placehold.it/350x150' } />
                 </div>
                 <div className="product-info">
                   {/*<span><strong>{ product.name } | $</strong></span>
                 <span>{ product.price }</span>*/}
                   <span><strong>{ product.title }</strong></span>
                 </div>
               </Link>
             </div>
           ))
         }
       </div>
 </section>
  </div>
);
