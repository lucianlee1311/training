export function cartReducer(store = { cart: [] }, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cart: [...store.cart, action.payload]
      }
      break;
    
    case "DELETE_FROM_CART":
      return {
        cart: store.cart.filter( item => item.id !== action.payload.id )
      }
      break;

    default:
      return store;
  }
}
