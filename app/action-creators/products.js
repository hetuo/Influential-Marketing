import axios from 'axios';
import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT, RECEIVE_PRODUCTS_BY_CATEGORY } from '../action-types';
import { getReview } from './reviewActionCreator';

export const RECEIVE_SELECTED_PRODUCTS = 'RECEIVE_SELECTED_PRODUCTS';

export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});

export const receiveProductsByInfluencerId = products => ({
    type: RECEIVE_SELECTED_PRODUCTS,
    products
});

export const receiveProduct = product => ({
    type: RECEIVE_PRODUCT,
    product
});

export const receiveProductsByCategory = products => ({
    type: RECEIVE_PRODUCTS_BY_CATEGORY,
    products
});

export const getProductsByInfluencerId = user_id => dispatch =>
  axios.get(`/api/review/influencer_id=${user_id}`)
  .then(response => dispatch(receiveProductsByInfluencerId(response.data)))
  .catch(error => console.error("can not get prodcuts", error))


export const addProduct = (product, user_id) => dispatch =>
  axios.post(`/api/review`, product)
  .then(() => dispatch(getProductsByInfluencerId(user_id)))
  .catch(error => console.error("Can not add product", error))

export const getProducts = () => dispatch =>
  axios.get('/api/review')
  .then(response => dispatch(receiveProducts(response.data)))
  //.then(response => console.log(response.data))
  .catch(error => console.error("Could Not Retrieve Products", error));

export const getProductById = productId => dispatch =>
  axios.get(`/api/review/id=${productId}`)
  //.then(res => res.data )
  .then(res => dispatch(receiveProduct(res.data)))
  //.then(res => console.log("hetuo test...", res.data))
  .then(() => dispatch(getReview(productId)))
  .catch(error => console.error("Could Not Retrieve Product", error));

/*  export const getProductsByCategoryId = categoryName => dispatch =>
    axios.get(`/api/product/category/${categoryName}`)
    .then(response => dispatch(receiveProductsByCategory(response.data)))
    .catch(error => console.error("Could Not Retrieve Product by Category", error));*/
