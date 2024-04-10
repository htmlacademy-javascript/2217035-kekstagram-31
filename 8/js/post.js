import { LIST_MESSAGES, SET_NAMES, DESCRIPTION_PHOTOS } from './data.js';
import { getRandomInteger, createRandomIdFromRangeGenerator } from './util.js';

const createPost = (_, index) => {
  const comentId = createRandomIdFromRangeGenerator(1, 1000);
  const commentsCounter = getRandomInteger(10, 17);
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
    description:
      DESCRIPTION_PHOTOS[getRandomInteger(0, DESCRIPTION_PHOTOS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: commentsArr,
  };
  return post;
};

const ARRAY_WITH_PHOTOS = Array.from({ length: 25 }, createPost);

export default ARRAY_WITH_PHOTOS;
