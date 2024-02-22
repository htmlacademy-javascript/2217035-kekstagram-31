function stringCheck (str, maxStringLength) {
  if (str.length <= maxStringLength) {
    return true;
  } else {
    return false;
  }
}

stringCheck('hello', 4);

function isPalindrome (str) {
  const normalStr = (str.replaceAll(' ', '')).toUpperCase();
  let emptyStr = '';

  for (let i = normalStr.length - 1; i >= 0; i--) {
    emptyStr += normalStr[i];
  }

  return emptyStr === normalStr;
}

isPalindrome('Леша на полке клопа нашел ');

//Доп.дз
// function stringToNumber (str) {
//   for(let i = 0; i < str.length; i++) {
//     const num = parseInt(str[i], 10);
//     console.log(num);
//   }
// }

// stringToNumber ('agent007');
