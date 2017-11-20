import {RECEIVE_PRODUCTS, RECEIVE_PRODUCT, RECEIVE_PRODUCTS_BY_CATEGORY} from '../action-types';
import { RECEIVE_SELECTED_PRODUCTS } from '../action-creators/products';

const initialState = {
  list: [],
  selectedProduct: {},
  selectedProducts: []
};

export default (state = initialState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_PRODUCTS:
      newState.list = action.products;
      break;

    case RECEIVE_PRODUCT:
      newState.selectedProduct = action.product;
      break;

    case RECEIVE_PRODUCTS_BY_CATEGORY:
      newState.list = action.products;
      break;

    case RECEIVE_SELECTED_PRODUCTS:
        newState.selectedProducts = action.products;
        break;

    default:
      return state;

  }

  return newState;
};
