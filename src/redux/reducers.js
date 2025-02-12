import { 
  ADD_FAVORITE, 
  REMOVE_FAVORITE, 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  INCREMENT_CART_ITEM, 
  DECREMENT_CART_ITEM 
} from './actions';

const initialState = {
  favorites: [],
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(cocktail => cocktail.idDrink !== action.payload),
      };
    case ADD_TO_CART:
      const existingCartItem = state.cart.find(item => item.idDrink === action.payload.idDrink);
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.idDrink === action.payload.idDrink
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(cocktail => cocktail.idDrink !== action.payload),
      };
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.idDrink === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT_CART_ITEM:
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.idDrink === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0), // Retirer les éléments avec quantité <= 0
      };
    default:
      return state;
  }
};

export default reducer;