const initialState = { 
  books: []
};

export const booksReducer = (store = initialState, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        books: [...action.books]
      };
      break;
      
    default:
      return store;
  }
}
