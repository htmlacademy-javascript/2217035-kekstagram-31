const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const onPhotoEditorResetButtonClick = () => {
  closePhotoEditor();
};

const onKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (evt.target === hashtagInput) {
      evt.preventDefault();
    }
    if (evt.target === commentInput) {
      evt.preventDefault();
    }
    if (evt.target !== hashtagInput && evt.target !== commentInput) {
      evt.preventDefault();
      closePhotoEditor();
    }
  }
};

const closePhotoEditor = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  photoEditorResetButton.removeEventListener(
    'click',
    onPhotoEditorResetButtonClick
  );
  document.removeEventListener('keydown', onKeydown);
  uploadFileControl.value = '';
};

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetButton.addEventListener(
      'click',
      onPhotoEditorResetButtonClick
    );
    document.addEventListener('keydown', onKeydown);
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateWithParser = (value, validator) =>
  value.split(' ').every(validator);

//хэштег начинается с символа # (решётка)
pristine.addValidator(
  hashtagInput,
  (value) =>
    validateWithParser(value, (item) => item[0] === '#' || value.length === 0),
  'Хэштег начинается с символа #'
);
//строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
//спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
pristine.addValidator(
  hashtagInput,
  (value) =>
    validateWithParser(value, (item) => /[a-za-яё0-9#]{0,19}$/i.test(item)),
  'Используются недопустимые символы'
);
//Хеш-тег не может состоять только из одной решётки;
pristine.addValidator(
  hashtagInput,
  (value) =>
    validateWithParser(value, (item) => item.length > 1 || value.length === 0),
  'Хеш-тег не может состоять только из одной решётки'
);
// Максимальная длина одного хэштега 20 символов, включая решётку;
pristine.addValidator(
  hashtagInput,
  (value) => validateWithParser(value, (item) => item.length < 21),
  'Максимальная длина одного хэштега 20 символов, включая решётку'
);
// Хэштеги разделяются пробелами
pristine.addValidator(
  hashtagInput,
  (value) => validateWithParser(value, (item) => !item.slice(1).includes('#')),
  'Хэштеги должны разделяться пробелами'
);
// Нельзя указать больше пяти хэштегов
pristine.addValidator(
  hashtagInput,
  (value) => value.split(' ').length < 6,
  'Нельзя указать больше пяти хэштегов'
);

// Один и тот же хэштег не может быть использован дважды???
const hashtagValidator = (value) => {
  const usedHashtags = {};
  const hashtags = value.split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (usedHashtags[hashtag]) {
      return false;
    } else {
      usedHashtags[hashtag] = true;
    }
  }
  return true;
};

pristine.addValidator(
  hashtagInput,
  hashtagValidator,
  'Один и тот же хэштег не может быть использован дважды'
);
// КОММЕНТАРИИ
// Длина комментария не может составлять больше 140 символов;
pristine.addValidator(
  commentInput,
  (value) => value.length < 141,
  'Длина комментария не может составлять больше 140 символов'
);

initUploadModal();

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
