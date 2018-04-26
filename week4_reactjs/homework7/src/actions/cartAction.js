export const addToCart = (book) => {
  return {
    type: "ADD_TO_CART",
    payload: book
  }
}

export const deleteFromCart = (book) => {
  return {
    type: "DELETE_FROM_CART",
    payload: book
  }
}