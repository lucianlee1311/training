/** 2.String & Number */
/**
 * 1.一個陣列中有許多個字串，寫一個function找出這些字串最長的共同字首
 * 範例： ['abcd','abccc','abdec'] --> 共同字首為 'ab' 。
 */
const input = (myArray) => {
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
  console.log(result);
};

const myArray = ['abcd', 'abccc', 'abdec'];
input(myArray);

/**
 * 2.將一個字串反轉後回傳
 * 範例： s= "hello", return "olleh"
 */
// const input = (data) => {
//   const strAry = Array.from(data).reverse().join('');
//   console.log(strAry);
// };

// const data = 'hello';
// input(data);

/**
 * 3. 給兩個字串s與t，回傳t是否為s的重組字
 * 範例：
 * s = "anagram", t = "nagaram" 回傳true
 * s = "rat", t = "car" 回傳false
 */
// const input = (s, t) => {
//   const newS = Array.from(s).sort().join('');
//   const newT = Array.from(t).sort().join('');
//   const result = newS === newT;
//   console.log(result);
// };

// const s = 'anagram';// 'rat';
// const t = 'nagaram';// 'car';
// input(s, t);

/**
 * 4. 給一個英文字串，將裡面的母音字母反轉。
 * 範例1:
 * Given s = "hello", return "holle".
 * 範例2:
 * Given s = "leetcode", return "leotcede".
 * 注意： y不算在母音字母中。
 */
// const input = (s) => {
//   const vowelStr = 'aeiou';
//   const vowelStrArray = [];
//   let newStr = '';

//   Array.from(s).forEach((element) => {
//     if (vowelStr.indexOf(element) > -1) {
//       vowelStrArray.push(element);
//       newStr += '@';
//     } else {
//       newStr += element;
//     }
//   });
//   vowelStrArray.reverse().forEach((element) => {
//     newStr = newStr.replace('@', element);
//   });
//   console.log(newStr);
// };

// const s = 'hello';// 'leetcode';
// input(s);

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
//   console.log(result);
// };

// const binary = '11000000';
// convertDecimal(binary);

/**
 * 6. 將給定數字轉換成二進制字串。如果字串長度不足 8 位，則在前面補 0 到滿8位。
 * 範例：
 * 輸入：65 輸出：'01000001'
 */
// const convertBinary = (decimal) => {
//   const binary = decimal.toString(2);
//   const binaryArray = Array.from(binary);
//   let zeroLength = 8 - binaryArray.length;
//   const binaryReverseArray = binaryArray.reverse();
//   while (zeroLength > 0) {
//     binaryReverseArray.push('0');
//     zeroLength -= 1;
//   }
//   const result = binaryReverseArray.reverse().join('');
//   console.log(result);
// };

// const decimal = 65;
// convertBinary(decimal);

/**
 * 7. 將一個數字每個位數相加，直到剩個位數為止。
 * 範例：
 * num = 38，則 3+8 = 11，1+1 = 2, 2是個位數，回傳2。
 */
// const input = (num) => {
//   let strNumArray = [];
//   let sum = 0;
//   while (num >= 10) {
//     sum = 0;
//     strNumArray = num.toString().split('');
//     for (let i = 0; i < strNumArray.length; i += 1) {
//       sum += parseInt(strNumArray[i], 10);
//     }
//     num = sum;
//   }
//   console.log(num);
// };

// const num = 38;
// input(num);

/**
 * 8. 反轉一個int整數。
 * 範例：
 * x = 123 , return 321 x = -123 , return -321
 */
// const input = (num) => {
//   const strNum = Math.abs(num).toString();
//   const newStr = Array.from(strNum).reverse().join('');
//   let result = parseInt(newStr, 10);
//   if (num < 0) {
//     result = -result;
//   }
//   console.log(result);
// };

// const num = 123;
// input(num);
