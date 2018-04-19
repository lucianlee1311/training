import data from '../data.json';

export const booksReducer = (state = { books: data }, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        books: [...state.books]
      };
      break;
      
    default:
      return state;
  }
}
