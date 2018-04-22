export function addToCart(book) {
  return {
    type: "ADD_TO_CART",
    payload: book
  }
}

export function deleteFromCart(book) {
  return {
    type: "DELETE_FROM_CART",
    payload: book
  }
}