import { actionCreator } from '../utils/utils';
import * as ACTION_TYPES from './actionTypes';

export function addItem(payload) {
    return (dispatch) => {
        dispatch(actionCreator(ACTION_TYPES.ADD_ITEM, payload))
    }
}

export function addItemToCart(payload) {
    return(dispatch) => {
            dispatch(actionCreator(ACTION_TYPES.ADD_ITEM_TO_CART, payload))
    }
}

export function checkoutClick(payload) {
    return (dispatch) => {
        dispatch(actionCreator(ACTION_TYPES.CHECKOUT_CLICK, payload));
    }
}