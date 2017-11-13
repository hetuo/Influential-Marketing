import React from 'react';

//render a single header for a product
const ProductHeader = ({ product }) => {
  return (
    <div className="row">
      <div className="product-image col-xs-12 col-lg-8 pull-right">
        <div className="image-slide" style ={ { backgroundImage: `url('${product.image1}')` } }>
        </div>
      </div>
      <div className="product-info col-xs-12 col-lg-4 pull-right">
        <div className="container-fluid">
          <div className="name row">{ product.title }</div>
          <div className="row">
            <div className="col-xs-12 pull-left">
              <div className="tab-content">
                <ul>
                  {/*
                      product.description && Object.keys(product.description).map(key =>
                        <li key={key}>{ product.description[key] }</li>)
                  */}
                  { product.body }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
