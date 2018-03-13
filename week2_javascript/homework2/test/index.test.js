const func = require('../index');

/** func1 sameInitial */
test('sameInitial(): input 有相同回傳值', () => {
  expect(func.sameInitial(['abcd', 'abccc', 'abdec'])).toBe('ab');
});

test('sameInitial(): input 無相同回傳值', () => {
  expect(func.sameInitial(['abcd', 'ddds', 'ertyu'])).toBe('');
});

test('sameInitial(): input 字串', () => {
  expect(func.sameInitial('abcd')).toBeNull();
});


/** func2 reverseStr */
test('reverseStr(): input 字串', () => {
  expect(func.reverseStr('hello')).toBe('olleh');
});

test('reverseStr(): input 數字', () => {
  expect(func.reverseStr(123)).toBeNull();
});


/** func3 isRestructWord */
test('isRestructWord(): input 重組字', () => {
  expect(func.isRestructWord('anagram', 'nagaram')).toBe(true);
});

test('isRestructWord(): input 非重組字', () => {
  expect(func.isRestructWord('rat', 'car')).toBe(false);
});

test('isRestructWord(): input 非字串', () => {
  expect(func.isRestructWord(123, 'car')).toBeNull();
});


/** func4 reverseVowel */
test('reverseVowel(): input 字串', () => {
  expect(func.reverseVowel('hello')).toBe('holle');
});

test('reverseVowel(): input 字串', () => {
  expect(func.reverseVowel('leetcode')).toBe('leotcede');
});

test('reverseVowel(): input 非字串', () => {
  expect(func.reverseVowel(123)).toBeNull();
});


/** func5 convertDecimal */
test('convertDecimal(): input 二進位字串', () => {
  expect(func.convertDecimal('11000000')).toBe(192);
});

test('convertDecimal(): input 非二進位字串', () => {
  expect(func.convertDecimal('12000000')).toBeNull();
});

test('convertDecimal(): input 非字串', () => {
  expect(func.convertDecimal(11000000)).toBeNull();
});


/** func6 convertBinary */
test('convertBinary(): input 數字', () => {
  expect(func.convertBinary(65)).toBe('01000001');
});

test('convertBinary(): input 非數字', () => {
  expect(func.convertBinary('abc')).toBeNull();
});


/** func7 addDigit */
test('addDigit(): input 數字', () => {
  expect(func.addDigit(38)).toBe(2);
});

test('addDigit(): input 非數字', () => {
  expect(func.addDigit('abc')).toBeNull();
});


/** func8 reverseInt */
test('reverseInt(): input 數字', () => {
  expect(func.reverseInt(123)).toBe(321);
});

test('reverseInt(): input 數字', () => {
  expect(func.reverseInt(-123)).toBe(-321);
});

test('reverseInt(): input 非數字', () => {
  expect(func.reverseInt('abc')).toBeNull();
});
