/** 2.String & Number */
/**
 * 1.一個陣列中有許多個字串，寫一個function找出這些字串最長的共同字首
 * 範例： ['abcd','abccc','abdec'] --> 共同字首為 'ab' 。
 */
/** v.2 */
// const myArray = ['abcd', 'abccc', 'abdec'];
// let result = myArray[0];
// myArray.forEach((entry, i) => {
//   if (i === 0) {
//     return;
//   }
//   const str = entry;
//   let sameLength = 0;
//   Array.from(result).forEach((item, j) => {
//     if (item === str.charAt(j)) {
//       sameLength = j + 1;
//     }
//   });
//   result = result.substr(0, sameLength);
// });
// console.log(result);

/** v.1 */
// const myArray = ['abcd', 'abccc', 'abdec'];
// let result = myArray[0];
// for (let i = 1; i < myArray.length; i += 1) {
//   const str = myArray[i];
//   let sameLength = 0;
//   for (let j = 0; j < result.length; j += 1) {
//     if (result[j] === str.charAt(j)) {
//       sameLength = j + 1;
//     }
//   }
//   result = result.substr(0, sameLength);
// }
// console.log(result);


/**
 * 2.將一個字串反轉後回傳
 * 範例： s= "hello", return "olleh"
 */
/** v.2 */
// const str = 'hello';
// let strAry = Array.from(str);
// strAry = strAry.reverse().join('');
// console.log(strAry);

/** v.1 */
// const str = 'hello';
// let newStr = '';
// for (let i = str.length - 1; i >= 0; i -= 1) {
//   newStr = newStr.concat(str.charAt(i));
// }
// console.log(newStr);

/**
 * 3. 給兩個字串s與t，回傳t是否為s的重組字
 * 範例：
 * s = "anagram", t = "nagaram" 回傳true
 * s = "rat", t = "car" 回傳false
 */
/** v.2 */
// const s = 'anagram';//'rat';
// const t = 'nagram';//'car';
// let result = true;
// let location = 0;
// let breakFlag = false;

// Array.from(t).forEach((tElement) => {
//   if (breakFlag) {
//     return;
//   }
//   location = s.indexOf(tElement, location);
//   if (location < 0) {
//     result = false;
//     breakFlag = true;
//   } else {
//     location += 1;
//   }
// });
// console.log(result);

/** v.1 */
// const s = 'anagram';//'rat';
// const t = 'nagram';//'car';
// let result = false;
// if (s.indexOf(t) > -1) {
//   result = true;
// }
// console.log(result);

/**
 * 4. 給一個英文字串，將裡面的母音字母反轉。
 * 範例1:
 * Given s = "hello", return "holle".
 * 範例2:
 * Given s = "leetcode", return "leotcede".
 * 注意： y不算在母音字母中。
 */
/** v.2 */
// const s = 'hello';
// const vowelStr = 'aeiou';
// const vowelStrArray = [];
// let newStr = '';

// Array.from(s).forEach((element) => {
//   if (vowelStr.indexOf(element) > -1) {
//     vowelStrArray.push(element);
//     newStr += '@';
//   } else {
//     newStr += element;
//   }
// });
// vowelStrArray.reverse().forEach((element) => {
//   newStr = newStr.replace('@', element);
// });
// console.log(newStr);

/** v.1 */
// const s = 'hello';
// const vowel = ['a', 'e', 'i', 'o', 'u'];
// const vowelObjArray = [];
// const vowelIndex = [];
// const strVowelObj = () => {
//   return {
//     index: 0,
//     value: '',
//     isVowel: false,
//   };
// };
// let result = '';

// let isVowel = false;
// for (let j = 0; j < s.length; j += 1) {
//   for (let i = 0; i < vowel.length; i += 1) {
//     if (vowel[i] === s.charAt(j)) {
//       isVowel = true;
//       break;
//     } else {
//       isVowel = false;
//     }
//   }
//   if (isVowel) {
//     const strVowel = strVowelObj();
//     strVowel.index = j;
//     strVowel.value = s.charAt(j);
//     strVowel.isVowel = true;
//     vowelObjArray.push(strVowel);
//     vowelIndex.push(s.charAt(j));
//   } else {
//     const strVowel = strVowelObj();
//     strVowel.index = j;
//     strVowel.value = s.charAt(j);
//     strVowel.isVowel = false;
//     vowelObjArray.push(strVowel);
//   }
// }

// let vowelIndexLength = vowelIndex.length - 1;
// for (let i = 0; i < vowelObjArray.length; i += 1) {
//   if (vowelObjArray[i].isVowel) {
//     vowelObjArray[i].value = vowelIndex[vowelIndexLength];
//     vowelIndexLength -= 1;
//   }
//   result = result.concat(vowelObjArray[i].value);
// }
// console.log(result);

/**
 * 5. 給二進制字串，將其換算成對應的十進制數字，需自己寫function
 * 範例：
 * 輸入：'11000000' 輸出：192
 */
// const convertDecimal = (binary) => {
//   let result = 0;
//   for (let i = 0; i < binary.length; i += 1) {
//     result += binary[i] * (2 ** (binary.length - 1 - i));
//   }
//   return result;
// };
// console.log(convertDecimal('11000000'));

/**
 * 6. 將給定數字轉換成二進制字串。如果字串長度不足 8 位，則在前面補 0 到滿8位。
 * 範例：
 * 輸入：65 輸出：'01000001'
 */
/** v.2 */
// const convertBinary = (decimal) => {
//   const binary = decimal.toString(2);
//   const binaryArray = Array.from(binary);
//   const zeroLength = 8 - binaryArray.length;

//   for (let i = 0; i < zeroLength; i += 1) {
//     binaryArray.reverse().push('0');
//   }
//   return binaryArray.reverse().join('');
// };
// console.log(convertBinary(65));

/** v.1 */
// const process = (decimal, modArray) => {
//   let quotient = decimal / 2;
//   const mod = decimal % 2;
//   quotient = Math.floor(quotient);
//   modArray.push(mod);
//   if (quotient !== 0) {
//     process(quotient, modArray);
//   }
//   return modArray;
// };
// const convertBinary = (decimal) => {
//   let result = '';
//   let modArray = [];
//   modArray = process(decimal, modArray);
//   const zeroLength = 8 - modArray.length;
//   for (let i = 0; i < zeroLength; i += 1) {
//     result += '0';
//   }
//   for (let i = modArray.length - 1; i >= 0; i -= 1) {
//     result += modArray[i];
//   }
//   return result;
// };
// console.log(convertBinary(65));

/**
 * 7. 將一個數字每個位數相加，直到剩個位數為止。
 * 範例：
 * num = 38，則 3+8 = 11，1+1 = 2, 2是個位數，回傳2。
 */
/** v.1 */
// let num = 38;
// let strNumArray = [];
// let sum = 0;
// while (num >= 10) {
//   sum = 0;
//   strNumArray = num.toString().split('');
//   for (let i = 0; i < strNumArray.length; i += 1) {
//     sum += parseInt(strNumArray[i], 10);
//   }
//   num = sum;
// }
// console.log(num);

/**
 * 8. 反轉一個int整數。
 * 範例：
 * x = 123 , return 321 x = -123 , return -321
 */
/** v.2 */
// const num = 123;
// const strNum = Math.abs(num).toString();
// const newStr = Array.from(strNum).reverse().join('');
// let result = parseInt(newStr, 10);
// if (num < 0) {
//   result = -result;
// }
// console.log(result);

/** v.1 */
// const num = 123;
// const strNum = Math.abs(num).toString();
// let newStr = '';
// let result = 0;
// for (let i = strNum.length - 1; i >= 0; i -= 1) {
//   newStr = newStr.concat(strNum.charAt(i));
// }
// result = parseInt(newStr, 10);
// if (num < 0) {
//   result = -result;
// }
// console.log(result);
