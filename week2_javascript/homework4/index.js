/** Object & Regexp */
/**
1. deep clone object
  輸入物件，輸出一個深層複製的物件。兩者記憶體位置不能一樣。

fix this bug, a.text should be 'aaa':

var a = {text: 'aaa'};
var b = a;
b.text = 'bbb';

console.log(a.text); // 'bbb'
*/
const cloneArray = (a) => {
  const b = JSON.parse(JSON.stringify(a));
  b.text = 'bbb';
  return a.text;
};

const a = { text: 'aaa' };
const result = cloneArray(a);
console.log('result:', result);

/**
2. add a format prototype to Date
  為 Date 新增一個原型方法為 format，可以執行 new Date().format()

  format: 'YYYY-MM-DD'

範例：
輸入：new Date().format()
輸出：'2018-02-25'
*/
Date.prototype.format = function () {
  const y = this.getFullYear();
  const month = this.getMonth() + 1;
  const date = this.getDate();
  const m = month < 10 ? `0${month}` : month;
  const d = date < 10 ? `0${date}` : date;
  return `${y}-${m}-${d}`;
};

const myDate = new Date().format();
console.log(myDate);

/**
3. class constructor for Person

範例：
輸入：
var john = new Person('john', 18);
john.sayhi(); // "hi I'm john, 18 years old"

var hyman = new Person('hyman', 25);
hyman.sayhi(); // "hi I'm hyman, 25 years old"
*/
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayhi() {
    return `hi I'm ${this.name}, ${this.age} years old`;
  }
}

const john = new Person('john', 18);
console.log(john.sayhi());

const hyman = new Person('hyman', 25);
console.log(hyman.sayhi());
