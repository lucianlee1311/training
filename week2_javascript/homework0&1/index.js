/** arrow function */
/**
 * 1.更短的函式寫法
 */
const func1 = x => x + 1;

/**
 * 2.this值的綁定
 */
const obj2 = { a: 1 };
function func2() {
  setTimeout(() => { console.log(this); }, 2000);
}
func2.call(obj2);


/** 不可使用箭頭函式的情況 */
/**
 *  a.將箭頭函式撰寫為方法
 */
const obj3 = {
  i: 10,
  b: () => console.log(this.i, this),
};
obj3.b(); // 印出 undefined {}

/**
 * b.使用 new 運算子
 */
const Foo = () => {};
const foo = new Foo(); // TypeError: Foo is not a constructor

/**
 * c.使用 prototype 屬性
 */
const Foo2 = () => {};
console.log(Foo2.prototype); // undefined