import { inputHashtags, hashtagsValid, inputComments,isAmountValid,isEveryHashtagSymbolsValid,areHashtagsUnique,commentLength } from './hashtadsvalid.js';
import { showAlert } from './util.js';
import { sendData } from './api.js';
import { blockSubmitButton,unblockSubmitButton } from './util.js';
import { openModal,closeWindow } from './window.js';
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('#upload-submit');
const pristine = new Pristine(form,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
}, true);

pristine.addValidator(document.querySelector('[name="hashtags"]'), hashtagsValid);
//сообщения об ошибках хештегов
const formValidateCheck = () => {
  pristine.addValidator(inputHashtags, isEveryHashtagSymbolsValid, 'Хэш-тег должен начинается с символа # и состоять из букв или чисел, без пробелов и спецсимволов. Максимальная длина одного хэш-тега 20 символов, включая решётку');
  pristine.addValidator(inputHashtags, areHashtagsUnique, 'Хэш-теги не должны повторяться');
  pristine.addValidator(inputHashtags, isAmountValid, 'Хэш-тегов не должно быть больше 5');
  pristine.addValidator(inputComments, commentLength, 'Длина комментария не может составлять больше 140 символов');
};
formValidateCheck();
//отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (inputHashtags.value === '' || pristine.validate() ) {
    blockSubmitButton(submitButton);
    sendData(
      () => { closeWindow(); openModal('success');unblockSubmitButton(submitButton);},
      () => { showAlert('Не удалось отправить форму. Попробуйте ещё раз'); openModal('error'); unblockSubmitButton(submitButton);},
      new FormData(evt.target),
    );
  }
});

