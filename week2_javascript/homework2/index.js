/** 2.String & Number */
/**
 * 1.一個陣列中有許多個字串，寫一個function找出這些字串最長的共同字首
 * 範例： ['abcd','abccc','abdec'] --> 共同字首為 'ab' 。
 */
const sameInitial = (myArray) => {
  if (!(myArray instanceof Array)) {
    return null;
  }
  let result = myArray[0];
  myArray.forEach((entry, i) => {
    if (i === 0) {
      return;
    }
    const str = entry;
    let sameLength = 0;
    Array.from(result).forEach((item, j) => {
      if (item === str.charAt(j)) {
        sameLength = j + 1;
      }
    });
    result = result.substr(0, sameLength);
  });
  return result;
};

// const myArray = ['abcd', 'abccc', 'abdec'];
// const result1 = sameInitial(myArray);
// console.log('result1:', result1);

/**
 * 2.將一個字串反轉後回傳
 * 範例： s= "hello", return "olleh"
 */

const reverseStr = (data) => {
  if (!(typeof (data) === 'string' || data instanceof String)) {
    return null;
  }
  const strAry = Array.from(data).reverse().join('');
  return strAry;
};

// const data = 'hello';
// const result2 = reverseStr(data);
// console.log('result2:', result2);


/**
 * 3. 給兩個字串s與t，回傳t是否為s的重組字
 * 範例：
 * s = "anagram", t = "nagaram" 回傳true
 * s = "rat", t = "car" 回傳false
 */

const isRestructWord = (s, t) => {
  if (!(typeof (s) === 'string' || s instanceof String)) {
    return null;
  } else if (!(typeof (t) === 'string' || t instanceof String)) {
    return null;
  }
  const newS = Array.from(s).sort().join('');
  const newT = Array.from(t).sort().join('');
  const result = newS === newT;
  return result;
};

// const s = 'anagram';// 'rat';
// const t = 'nagaram';// 'car';
// const result3 = isRestructWord(s, t);
// console.log('result3:', result3);


/**
 * 4. 給一個英文字串，將裡面的母音字母反轉。
 * 範例1:
 * Given s = "hello", return "holle".
 * 範例2:
 * Given s = "leetcode", return "leotcede".
 * 注意： y不算在母音字母中。
 */

const reverseVowel = (s) => {
  if (!(typeof (s) === 'string' || s instanceof String)) {
    return null;
  }
  const vowelStr = 'aeiou';
  const vowelStrArray = [];
  let newStr = '';

  Array.from(s).forEach((element) => {
    if (vowelStr.indexOf(element) > -1) {
      vowelStrArray.push(element);
      newStr += '@';
    } else {
      newStr += element;
    }
  });
  vowelStrArray.reverse().forEach((element) => {
    newStr = newStr.replace('@', element);
  });

  return newStr;
};

// const str4 = 'hello';// 'leetcode';
// const result4 = reverseVowel(str4);
// console.log('result4:', result4);


/**
 * 5. 給二進制字串，將其換算成對應的十進制數字，需自己寫function
 * 範例：
 * 輸入：'11000000' 輸出：192
 */
/** v.2 */
const convertDecimal = (binary) => {
  if (!(typeof (binary) === 'string' || binary instanceof String)) {
    return null;
  }
  let result = null;
  try {
    const binaryArray = Array.from(binary);
    binaryArray.forEach((character) => {
      const digit = parseInt(character, 10);
      if (!(digit === 0 || digit === 1)) {
        throw new Error('input is not binary');
      }
    });
    result = binaryArray.reduce((previous, current, index) => parseInt(previous, 10) + (parseInt(current, 10) * (2 ** (binaryArray.length - 1 - index))), '0');
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

/** v.1 */
/*
const convertDecimal = (binary) => {
  let result = 0;
  for (let i = 0; i < binary.length; i += 1) {
    result += binary[i] * (2 ** (binary.length - 1 - i));
  }
  return result;
};
*/
// const binary = '11000000';
// const result5 = convertDecimal(binary);
// console.log('result5:', result5);


/**
 * 6. 將給定數字轉換成二進制字串。如果字串長度不足 8 位，則在前面補 0 到滿8位。
 * 範例：
 * 輸入：65 輸出：'01000001'
 */

const convertBinary = (decimal) => {
  if (!(/^\d+$/.test(decimal) && Number.isInteger(decimal))) {
    return null;
  }
  const binary = decimal.toString(2);
  const binaryArray = Array.from(binary);
  let zeroLength = 8 - binaryArray.length;
  const binaryReverseArray = binaryArray.reverse();
  while (zeroLength > 0) {
    binaryReverseArray.push('0');
    zeroLength -= 1;
  }
  const result = binaryReverseArray.reverse().join('');
  return result;
};

// const decimal = 65;
// const result6 = convertBinary(decimal);
// console.log('result6:', result6);


/**
 * 7. 將一個數字每個位數相加，直到剩個位數為止。
 * 範例：
 * num = 38，則 3+8 = 11，1+1 = 2, 2是個位數，回傳2。
 */

const addDigit = (num) => {
  if (!(/^\d+$/.test(num) && Number.isInteger(num))) {
    return null;
  }
  let strNumArray = [];
  let sum = 0;
  let result = num;
  while (result >= 10) {
    sum = 0;
    strNumArray = result.toString().split('');
    sum = strNumArray.reduce((previous, current) => parseInt(previous, 10) + parseInt(current, 10));
    result = sum;
  }
  return result;
};

// const num = -38;
// const result7 = addDigit(num);
// console.log('result7:', result7);


/**
 * 8. 反轉一個int整數。
 * 範例：
 * x = 123 , return 321 x = -123 , return -321
 */

const reverseInt = (num) => {
  // if (!(/^-?\d+$/.test(num) && Number.isInteger(num))) {
  if (!(Number.isInteger(num))) {
    return null;
  }
  const strNum = Math.abs(num).toString();
  const newStr = Array.from(strNum).reverse().join('');
  let result = parseInt(newStr, 10);
  if (num < 0) {
    result = -result;
  }
  return result;
};

// const num8 = 123;
// const result8 = reverseInt(num8);
// console.log('result8:', result8);


module.exports = {
  sameInitial,
  reverseStr,
  isRestructWord,
  reverseVowel,
  convertDecimal,
  convertBinary,
  addDigit,
  reverseInt,
};
