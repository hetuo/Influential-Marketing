import React from 'react';
import ProductDescription from './ProductDescription';
import StarRatingComponent from 'react-star-rating-component';
import ReviewList from './ReviewList';
import ProductHeader from './ProductHeader';
import newReviewForm from './newReviewForm';
//import reviewAction from 'APP/app/action-creators/reviewActionCreator';
import { Link } from 'react-router';

export default class SingleProduct extends React.Component {
  constructor(props){
    super(props);
      this.state = {
      product: {},
      auth: {},
      orderQty: 1,
      reviews: [],
      submitted: false,
      title: '',
      body: ''
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
    this.setState({ submitted: true });
    const review = {
      title: e.target.title.value,
      stars: e.target.stars.value,
      body: e.target.body.value,
      product_review_id: this.props.product.id,
      user_id: this.props.auth.user.id
    };
    console.log("review: ", review);
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
    const { title, body, submitted } = this.state;
    console.log(product);
    return (
      <div id="ProductContainer">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">products</Link></li>
          <li className="active">{ product.id }</li>
        </ol>
        <section className="product-detail container-fluid">
          <ProductHeader product={ product } />
        </section>
        <section className="container-fluid">
          <ReviewList reviews={ reviews } />
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
