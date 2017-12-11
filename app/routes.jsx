'use strict';
import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import Root from './components/Root';
import store from './store';

//import components and containers
import Homepage from './components/Homepage';
import ProductsContainer from './containers/ProductsContainer';
import ProductContainer from './containers/SingleProductContainer';
import ProfileContainer from './containers/ProfileContainer';
import Login from './components/Login';
import ShowAllInvites from './components/ShowAllInvites'
import Signup from './components/Signup';
import NewReview from './components/newReviewForm';
import Messager from './components/Messager';
import About from './components/About';
import Checkout from './containers/CheckoutContainer';
import ReviewList from './components/ReviewList';
import SingleReview from './components/SingleReview';
import orderList from './containers/orderListContainer';
import CreateCampaignContainer from './containers/CreateCampaignContainer'
import CommentContainer from './containers/CommentContainer'
import PaymentContainer from './containers/PaymentContainer'
import CampaignContainer from './containers/CampaignContainer'
import createReviewContainer from './containers/createReviewContainer'
import DetailContainer from './containers/DetailContainer'
import manageCampaignContainer from './containers/ManageCampaignContainer'
import InfluencerContainer from './containers/InfluencerContainer'
import { getProductsByInfluencerId } from './action-creators/products'
import { getCampaignsByUserId } from './action-creators/CampaignActionCreator'
import { getProducts, getProductsByCategoryId } from './action-creators/products';
import {loadSingleCategory} from './action-creators/categories';
import {getSingleInfluencer} from './action-creators/InfluencerActionCreator';

const onReviewEnter = function (nextRouterState){
  store.dispatch(getProductsByInfluencerId(nextRouterState.params.userId));
};

const onDetailEnter = function (nextRouterState){
  store.dispatch(getProductsByInfluencerId(nextRouterState.params.userId));
  store.dispatch(getSingleInfluencer(nextRouterState.params.userId));
};

const onManageCampaign = function (nextRouterState){
  store.dispatch(getCampaignsByUserId(nextRouterState.params.userId));
}

const onProductCategoryEnter = function (nextRouterState){

  console.log("yunxianzhang", store.getState());
  store.dispatch(getProductsByCategoryId(nextRouterState.params.categoryName));
  store.dispatch(loadSingleCategory(nextRouterState.params.categoryName));
};

const onProductsEnter = function (nextRouterState){
  console.log("yunxianzhang", store.getState());
  store.dispatch(getProducts());
  store.dispatch(loadSingleCategory(nextRouterState.params.categoryName));
};

const onInfluencerEnter = function (nextRouterState) {
  console.log("routes.jsx, ", store.getState());
  store.dispatch(getSingleInfluencer(nextRouterState.params.userId));
};

export default ({ onAppEnter, onProductEnter, onOrderEnter, onCampaignEnter, onCommentsEnter }) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={onAppEnter}>
    <IndexRoute component={Homepage} onEnter={onAppEnter} />
      <Route path="/about" component={About} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/products" component={ProductsContainer} onEnter={onProductsEnter} />
      <Route path="/products/:productId" component={ProductContainer} onEnter={onProductEnter} />
      <Route path="/products/category/:categoryName" component={ProductsContainer} onEnter={onProductCategoryEnter} />
      <Route path="/profile" component={ProfileContainer} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/messager" component={Messager} />
      <Route path="/createcampaign" component={CreateCampaignContainer} />
      <Route path="/select" component={CampaignContainer} onEnter={onCampaignEnter} />
      <Route path="/newreview" component={NewReview} />
      <Route path="/reviews" component={ReviewList} />
      <Route path="/reviews/:reviewId" component={SingleReview} />
      <Route path="/comments/:reviewId" component={CommentContainer} onEnter={onCommentsEnter} />
      <Route path="/order" component={orderList} onEnter={onOrderEnter} />
      <Route path="/review/:userId" component={createReviewContainer} onEnter={onReviewEnter} />
      <Route path="/managecampaign/:userId" component={manageCampaignContainer} onEnter={onManageCampaign} />
      <Route path="/influencer" component={InfluencerContainer} onEnter={onCampaignEnter} />
      <Route path="/detail/:userId" component={DetailContainer} onEnter={onDetailEnter} />
      <Route path="/invites" component={ShowAllInvites} />
      <Route path="/pay" component={PaymentContainer} />
      <Route path="*" component={Homepage} />
    </Route>
  </Router>
);
