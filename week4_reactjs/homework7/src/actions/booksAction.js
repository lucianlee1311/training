export function getBooks() {console.log('+action getBooks+');
  return {
    type: "GET_BOOKS",
    payload: ''
  }
}

// export function getBookDetail(bookId) {console.log('+action getBookDetail+');
//   return {
//     type: "GET_BOOK_DETAIL",
//     payload: bookId
//   }
// }
