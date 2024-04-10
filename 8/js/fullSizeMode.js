import ARRAY_WITH_PHOTOS from './post.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const bigPictureCommentsShow = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
let lastPost;
const createMessage = function (element) {
  const newElementItem = document.createElement('li');
  newElementItem.classList.add('social__comment');
  const newElementImg = document.createElement('img');
  newElementImg.classList.add('social__picture');
  newElementImg.src = element.avatar;
  newElementImg.alt = element.name;
  newElementItem.appendChild(newElementImg);
  const newElementMessage = document.createElement('p');
  newElementMessage.classList.add('social__text');
  newElementMessage.textContent = element.message;
  newElementItem.appendChild(newElementMessage);
  socialComments.appendChild(newElementItem);
};

const step = 5;
let start = 0;
const sliceCommentsArray = (array) => {
  start += step;
  return array.slice(0, start);
};

const uploadComments = function (post) {
  const array = sliceCommentsArray(post.comments);
  socialComments.innerHTML = '';
  array.forEach(createMessage);
  bigPictureCommentsShow.textContent = array.length;
  if (post.comments.length <= start) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

thumbnails.forEach((picture) => {
  const img = picture.querySelector('img');

  const post = ARRAY_WITH_PHOTOS.find(
    (element) => String(element.id) === img.id
  );

  picture.addEventListener('click', () => {
    start = 0;
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = post.url;
    bigPictureLikes.textContent = post.likes;
    bigPictureCommentsCount.textContent = post.comments.length;
    bigPictureDescription.textContent = post.description;
    document.body.classList.add('modal-open');
    uploadComments(post);
    lastPost = post;
  });
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

socialCommentsLoader.addEventListener('click', () => {
  uploadComments(lastPost);
});

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});
