export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_CART_ITEM = 'INCREMENT_CART_ITEM';
export const DECREMENT_CART_ITEM = 'DECREMENT_CART_ITEM';

export const addFavorite = (cocktail) => ({
  type: ADD_FAVORITE,
  payload: cocktail,
});

export const removeFavorite = (cocktailId) => ({
  type: REMOVE_FAVORITE,
  payload: cocktailId,
});

export const addToCart = (cocktail) => ({
  type: ADD_TO_CART,
  payload: cocktail,
});

export const removeFromCart = (cocktailId) => ({
  type: REMOVE_FROM_CART,
  payload: cocktailId,
});

export const incrementCartItem = (cocktailId) => ({
  type: INCREMENT_CART_ITEM,
  payload: cocktailId,
});

export const decrementCartItem = (cocktailId) => ({
  type: DECREMENT_CART_ITEM,
  payload: cocktailId,
});