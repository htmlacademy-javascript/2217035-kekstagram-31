const LIST_MESSAGES = ['Всё отлично!', 'В целом всё неплохо.', 'Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];

const SET_NAMES = ['Алексей', 'Наталья', 'Максим', 'Екатерина', 'Дмитрий', 'Ольга', 'Иван', 'Анна', 'Сергей', 'Юлия', 'Александра', 'Артем', 'Мария', 'Павел', 'Елена', 'Андрей', 'Татьяна', 'Владимир', 'Ирина', 'Константин', 'Анастасия', 'Роман', 'Светлана', 'Григорий', 'Виктория', 'Владислав', 'Людмила', 'Евгений', 'Олег', 'Алина'];

const DESCRIPTION_PHOTOS = ['Пейзаж', 'Портрет', 'Горизонт', 'Закат', 'Цветы', 'Горы', 'Море', 'Город', 'Лес', 'Закрытые глаза', 'Улыбка', 'Семья', 'Еда', 'Дружба', 'Дети', 'Животные', 'Путешествие', 'Исследование', 'Спорт', 'Мода'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const createPost = (_, index) => {
  const comentId = createRandomIdFromRangeGenerator(1, 1000);
  const commentsCounter = getRandomInteger (1, 7);
  const commentsArr = [];
  for (let i = 0; i <= commentsCounter; i++) {
    const comment = {
      id: comentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: LIST_MESSAGES[getRandomInteger(0, LIST_MESSAGES.length - 1)],
      name: SET_NAMES[getRandomInteger(0, SET_NAMES.length - 1)],
    };
    commentsArr.push(comment);
  }
  const post = {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTION_PHOTOS[getRandomInteger(0, DESCRIPTION_PHOTOS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: commentsArr,
  };
  return post;
};

Array.from({length: 25}, createPost);
