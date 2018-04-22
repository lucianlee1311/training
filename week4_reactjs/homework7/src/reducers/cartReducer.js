export function cartReducer(state = { cart: [] }, action) {
  switch (action.type) {
    case "ADD_TO_CART":
    console.log('action', action);
    console.log('state', state);
    // console.log('action.payload', action.payload);
    // console.log('action.payload', [...state.cart, action.payload]);
      return {
        cart: [...state.cart, action.payload]
      }
      break;
    
    case "DELETE_FROM_CART":
      return {
        cart: state.cart.filter( item => item.id !== action.payload.id )
      }
      break;

    default:
      return state;
  }
}
