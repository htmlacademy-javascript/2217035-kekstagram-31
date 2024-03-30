import createPost from './post.js';
const ARRAY_WITH_PHOTOS = Array.from({ length: 25 }, createPost);

const blockPictures = document.querySelector('.pictures');

const templatePicture = document.querySelector('#picture').content;
const itemPicture = templatePicture.querySelector('.picture');

const documentFragment = document.createDocumentFragment();

ARRAY_WITH_PHOTOS.forEach((element) => {
  const cloneTemplate = itemPicture.cloneNode(true);
  const photoUser = cloneTemplate.querySelector('img');
  const photoLikes = cloneTemplate.querySelector('.picture__likes');
  const photoComments = cloneTemplate.querySelector('.picture__comments');

  photoUser.src = element.url;
  photoUser.alt = element.description;
  photoLikes.textContent = element.likes;
  photoComments.textContent = element.comments.idComments;

  documentFragment.appendChild(cloneTemplate);
});

blockPictures.appendChild(documentFragment);
