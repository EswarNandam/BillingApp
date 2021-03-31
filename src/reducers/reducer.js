import React, { createContext, useReducer, useContext } from 'react';

export const initialState = {
    items: [],
    cartItems: [],
    bills: [],
};

function cartReducer (state=initialState, action) {
switch (action.type) {
    case 'ADD_ITEM':
        return {
            ...state,
            items: action.payload,
        }
    case 'ADD_ITEM_TO_CART':
        return {
            ...state,
            cartItems: action.payload,
        }
    case 'CHECKOUT_CLICK':
        return {
            ...state,
            bills: state.bills.concat(action.payload),
        }
    default:
        return state;
    }
  }

  const StoreContext = createContext(null);

  export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const value = { state, dispatch };
  
    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
  }
  
  export const useStore = () => useContext(StoreContext);