import data from '../data.json';

export const booksReducer = (state = { books: data }, action) => {
  switch (action.type) {
    case "GET_BOOKS":
    console.log('#booksReducer GET_BOOKS#');
      return {
        books: [...state.books]
      };
      break;

    // case "GET_BOOK_DETAIL":
    // console.log('#booksReducer GET_BOOK_DETAIL#');
    //   return {
        // bookDetail: state.books.filter( item => item.id === action.payload.id )
      // };
      // break;
      
    default:
      return state;
  }
}
