import React from 'react';
import ProductDescription from './ProductDescription';
import StarRatingComponent from 'react-star-rating-component';
import ReviewList from './ReviewList';
import ProductHeader from './ProductHeader';
import newReviewForm from './newReviewForm';
import { FacebookButton, FacebookCount } from "react-social";
//import reviewAction from 'APP/app/action-creators/reviewActionCreator';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
var FontAwesome = require('react-fontawesome');

const styles = {
  customWidth: {
    width: 450,
  },
};

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
      title: this.state.title,
      stars: e.target.stars.value,
      body: this.state.body,
      product_review_id: this.props.product.id,
      user_id: this.props.auth.user.id
    };
    console.log("review: ", review);
    this.props.addReview(review);
    e.target.stars.value = '';
    this.state.body = '';
    this.state.title = '';
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
    let url = "https://github.com";
    let msg = "hello world";
    const { product, reviews, auth } = this.props;
    const { title, body, submitted } = this.state;
    console.log(product);
    return (
      <div id="ProductContainer">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">products</Link></li>
          <li className="active">{ product.id }</li>
        </ol>
        <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
          <div className='grid-cell animate-top'  style={{maxWidth: '530px', minWidth: '280px', maxlength: '15'}}>
            <ProductHeader product={ product } />
          </div>
        </div>

        <section className="container-fluid">
          <ReviewList reviews={ reviews } />
        <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
          <div className='grid-cell animate-top'  style={{maxWidth: '530px', minWidth: '280px'}}>
          {auth.user ? (
          <form className="row" onSubmit={(e) => (this.onAddReviewSubmit(e))}>
            <div className="form-group col-xs-12 col-md-8" >
                <TextField
                  hintText=""
                  floatingLabelText="Subject"
                  name="title"
                  onChange={(event, value) => this.setState({ title: value })}
                  type="text"
                  multiLine={true}
                  rows={1}
                  style={styles.customWidth}
                /><br />
                <TextField
                  hintText="Say something..."
                  floatingLabelText="Write Review"
                  name="body"
                  onChange={(event, value) => this.setState({ body: value })}
                  multiLine={true}
                  rows={3}
                  rowsMax={5}
                  style={styles.customWidth}
                /><br />
              <StarRatingComponent name="stars" starCount={5} />&nbsp;&nbsp;&nbsp;
              <button type="submit" className="btn btn-success">Add Review</button> &nbsp;&nbsp;&nbsp;
                <FacebookButton  className="btn btn-primary" url={ url } appId="193858637827812">
                  <FontAwesome  className="cs-fb-icon" name='facebook' />
                  &nbsp;Shares
                </FacebookButton>
            </div>
          </form>) : ''}
        </div>
      </div>
        </section>
      </div>
    );
  }
}
