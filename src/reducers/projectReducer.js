import * as ACTION_TYPES from '../actions/actionTypes';

const defaultState = {
    items: [],
    cartItems: [],
    bills: [],
}

export default function projectsReducer(state = defaultState, action) {
    switch (action.type) {
    case ACTION_TYPES.ADD_ITEM:
        return {
            ...state,
            items: action.payload,
        }
    case ACTION_TYPES.ADD_ITEM_TO_CART:
        return {
            ...state,
            cartItems: action.payload,
        }
    case ACTION_TYPES.CHECKOUT_CLICK:
        return {
            ...state,
            bills: state.bills.concat(action.payload),
        }
    default:
        return state;
    }
}