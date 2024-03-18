// function stringCheck (str, maxStringLength) {
//   if (str.length <= maxStringLength) {
//     return true;
//   } else {
//     return false;
//   }
// }

// stringCheck('hello', 4);

// function isPalindrome (str) {
//   const normalStr = (str.replaceAll(' ', '')).toUpperCase();
//   let emptyStr = '';

//   for (let i = normalStr.length - 1; i >= 0; i--) {
//     emptyStr += normalStr[i];
//   }

//   return emptyStr === normalStr;
// }

// isPalindrome('Леша на полке клопа нашел ');

const convertTimeToNumber = (time) => {
  const [hours, minutes] = time.split(":");

  const hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);

  return hoursInt * 60 + minutesInt;
};

const IsMeetingInWorkTime = (workStart, workEnd, meetingStart, duration) => {
  workStart = convertTimeToNumber(workStart);
  workEnd = convertTimeToNumber(workEnd);
  meetingStart = convertTimeToNumber(meetingStart);

  return meetingStart + duration <= workEnd && meetingStart >= workStart;
};

// console.log(IsMeetingInWorkTime("14:00", "17:30", "08:0", 90));
