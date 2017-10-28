import React from 'react';
import ProductDescription from './ProductDescription';
import StarRatingComponent from 'react-star-rating-component';
import SingleReview from './SingleReview';
import newReviewForm from './newReviewForm';
//import reviewAction from 'APP/app/action-creators/reviewActionCreator';
import { Link } from 'react-router';

export default class SingleProduct extends React.Component {
  constructor(props){
    super(props);
      this.state = {
      product: {},
      orderQty: 1,
      reviews: []
    };
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onAddReviewSubmit = this.onAddReviewSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onClickAddCart = this.onClickAddCart.bind(this);
  }

  onRemoveClick (id) {
    this.props.removeReview(id);
  }

  onStarClick(nextValue, prevValue, name){
    console.log('function for updating the rating value should be dispatched from here');
  }

  onAddReviewSubmit (e) {
    e.preventDefault()

    const review = {
      title: e.target.title.value,
      stars: e.target.stars.value,
      body: e.target.body.value,
      product_id: this.props.product.id,
      // user_id: this.props.auth.id
    };
    console.log("review: ", this.props);
    this.props.addReview(review);
    e.target.stars.value = '';
    e.target.body.value = '';
    e.target.title.value = '';
  }

  onChangeQty(e){
    this.setState({orderQty: e.target.value});
  }

  onClickAddCart(product){
    let cartLineItem = {
    product_id: product.id,
    orderQty: parseInt(this.state.orderQty)
    };
    this.props.addToCart(cartLineItem);
  }

  render() {
    const { product, reviews } = this.props;
    return (
      <div id="ProductContainer">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Restaurant</Link></li>
          <li className="active">{ product.name }</li>
        </ol>
        <section className="product-detail container-fluid">
          <div className="row">
            <div className="product-image col-xs-12 col-lg-8 pull-right">
              <div className="image-slide" style ={ { backgroundImage: `url('${product.image}')` } } />
            </div>
            <div className="product-info col-xs-12 col-lg-4 pull-right">
              <div className="container-fluid">
                <div className="name row">{ product.name }</div>
                <div className="row">
                  <div className="col-xs-12 pull-left">
                    <div className="tab-content">
                      <ul>
                        {
                            product.description && Object.keys(product.description).map(key =>
                              <li key={key}>{ product.description[key] }</li>)
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container-fluid">
          <div className="container-fluid" style={{padding: '0 20px'}}>
          {
            reviews && reviews.map(review => {
              return (
                <form key={review.id} className="row review">
                  <div className="form-group">
                    <div className="title">
                      { review.title }
                      <input type="text" name="title" className="form-control hide" defaultValue={ review.title } />
                    </div>
                    <StarRatingComponent
                      name="starsr"
                      starCount={5}
                      editing={false}
                      defaultValue={parseInt(review.stars)} />
                    <div className="createdAt">{ new Date(review.created_at).toDateString() }</div>
                    <div className="body"><p>{ review.body }</p></div>
                    <textarea className="form-control hide" name="body" defaultValue={ review.body } disabled />
                  </div>
                </form>
              );
            })
          }
        </div>
        <div className="container-fluid" style={{padding: '0 8px'}}>
          <form className="row" onSubmit={(e) => (this.onAddReviewSubmit(e))}>
            <div className="form-group col-xs-12 col-md-8" >
              <input name="title" style={{width: '400px'}} type="text" placeholder="Subject" className="form-control" />
              <textarea name="body" style={{width: '400px'}} placeholder="Write a review"  className="form-control" />
              <StarRatingComponent name="stars" starCount={5} />
              <button type="submit" className="btn btn-success">Add Review</button>
            </div>
          </form>
        </div>
        </section>
      </div>
    );
  }
}
