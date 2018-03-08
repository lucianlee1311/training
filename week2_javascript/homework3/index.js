/** 3.Array */
/**
   1. deep clone array
   輸入陣列，輸出一個深層複製的陣列。兩者記憶體位置不能一樣。
   fix this bug, a should be [1,2,3]:
   var a = [1,2,3];
   var b = a;
   b.push(4);
   console.log(a); // [1,2,3,4]
 */
const cloneArray = (a) => {
  const b = JSON.parse(JSON.stringify(a));
  b.push(4);
  console.log(a);
};

const a = [1, 2, 3];
cloneArray(a);

/**
   用 fetch 取得陣列到程式中

   2. 搜尋資料中id為特定的資料
   範例：
   輸入：5
   輸出：
   {
      "id": 5,
      "img": "https://unsplash.it/300/300?image=868",
      "title": "城市幻影2",
      "desc": "如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感",
      "price": 300
    }
 */
// const fetch = require('node-fetch');

// const url = 'https://raw.githubusercontent.com/ReactMaker/api_server/master/db/album.json';

// const input = (id) => {
//   fetch(url)
//     .then(res => res.json())
//     .then((json) => {
//       const result = json.filter(value => value.id === id);
//       console.log(result[0]);
//     });
// };

// const id = 5;
// input(id);

/**
   用 fetch 取得陣列到程式中

   3. 模糊搜尋title包含特定文字的資料
   範例：
   輸入：美好
   輸出：
   {
        "id": 1,
        "img": "https://unsplash.it/300/300?image=946",
        "title": "美好時光1",
        "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
        "price": 200,
        "discount": true
    },
    {
        "id": 2,
        "img": "https://unsplash.it/300/300?image=944",
        "title": "美好時光2",
        "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
        "price": 300
    },
    {
        "id": 3,
        "img": "https://unsplash.it/300/300?image=882",
        "title": "美好時光3",
        "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
        "price": 400
    }
 */
// const input = (title) => {
//   fetch(url)
//     .then(res => res.json())
//     .then((json) => {
//       const result = json.filter(value => value.title.indexOf(title) > -1);
//       console.log(result);
//     });
// };

// const title = '美好';
// input(title);

/**
   用 fetch 取得陣列到程式中

   4. 新增一筆id=99的資料(內容隨意)，於id=10和id=11中間
   範例：

   輸入：{id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100}
   輸出：
   ...
   {id: 10, img: 'xxx', title: 'xxx', desc: 'xxx', price: 800},
   {id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100},
   {id: 11, img: 'xxx', title: 'xxx', desc: 'xxx', price: 2659},
   ...
 */
// const input = (data) => {
//   fetch(url)
//     .then(res => res.json())
//     .then((json) => {
//       json.splice(10, 0, data);
//       console.log(json);
//     });
// };

// const data = {
//   id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100,
// };
// input(data);

/**
   用 fetch 取得陣列到程式中

   5. 修改id為特定的資料
   範例：
   輸入：3, {title: '修改title', desc: '修改desc'}
   輸出：
   ...
   {
        "id": 3,
        "img": "https://unsplash.it/300/300?image=882",
        "title": "修改title",
        "desc": "修改desc",
        "price": 400
    },
    ...
 */
// const input = (id, data) => {
//   fetch(url)
//     .then(res => res.json())
//     .then((json) => {
//       const temp = json.slice(id - 1, id);
//       temp[0].title = data.title;
//       temp[0].desc = data.desc;
//       json.splice(id - 1, 1, temp[0]);
//       console.log(json);
//     });
// };

// const id = 3;
// const data = {
//   img: 'xxx', title: 'xxx', desc: 'xxx', price: 100,
// };
// input(id, data);

/**
   用 fetch 取得陣列到程式中

   6. 刪除特定id的資料
   輸入 5 輸出已經刪除完 id 為 5 的陣列
 */
// const input = (id) => {
//   fetch(url)
//     .then(res => res.json())
//     .then((json) => {
//       json.splice(id - 1, 1);
//       console.log(json);
//     });
// };

// const id = 5;
// input(id);

/**
   用 fetch 取得陣列到程式中

   7. 依照價格排序
   輸入 desc or asc
   輸出價格對應排序的陣列
 */
// const input = (orderby) => {
//   fetch(url)
//     .then(res => res.json())
//     .then((json) => {
//       if (orderby === 'desc') {
//         json.sort((a, b) => (a.price < b.price ? 1 : -1));
//       } else {
//         json.sort((a, b) => (a.price > b.price ? 1 : -1));
//       }
//       console.log(json);
//     });
// };

// const orderby = 'asc';// 'desc'
// input(orderby);
