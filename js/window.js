import { sliderValue, sliderElement, img } from './filter.js';
import { inputHashtags,  inputComments,  } from './hashtadsvalid.js';
const imgOverlay = document.querySelector('.img-upload__overlay');
const photoUser = document.querySelector('#upload-file');
const body = document.querySelector('body');
const cancel = document.querySelector('.img-upload__cancel');
const esc = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeWindow();
  }};

function openWindow() {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.querySelector('.scale__control--value').value = `${100}%`;
  cancel.addEventListener('click', closeWindow);
  document.addEventListener('keydown', esc);
}
function closeWindow(){
  imgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  sliderElement.classList.add('hidden');
  sliderValue.value='';
  document.querySelector('.img-upload__preview img').style.filter = '';
  document.getElementById('effect-none').checked = true;
  img.classList='';
  document.querySelector('.img-upload__preview').style.transform='scale(1)';
  document.querySelector('.scale__control--value').value = `${100}%`;
  inputHashtags.value ='';
  inputComments.value ='';
  photoUser.value = '';
  // eslint-disable-next-line no-return-assign
  document.querySelectorAll('.pristine-error').forEach((e) => e.innerHTML  ='');
  cancel.removeEventListener('click', closeWindow);
  document.removeEventListener('keydown', esc);
}

//возвращает есть ли секция окна
function isSection(evt) {
  return evt.target.matches('section');
}
//eдиная функция для открытия модальных окон ошибки и успеха
function openModal(type) {
  const modalTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const clonedModal = modalTemplate.cloneNode(true);
  const closeModalButtonElement = clonedModal.querySelector(`.${type}__button`);
  clonedModal.style.zIndex = '100';

  function onOutCloseClickHandler(evt) {
    if (isSection(evt)) {
      evt.preventDefault();
      clonedModal.remove();
    }
  }
  function modalCloseClick() {
    clonedModal.remove();
    closeModalButtonElement.removeEventListener('click', modalCloseClick);
    document.removeEventListener('click', onOutCloseClickHandler);
    document.removeEventListener('keydown', modalCloseEsc);
  }

  function modalCloseEsc(evt){
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clonedModal.remove();
    }
    closeModalButtonElement.removeEventListener('click', modalCloseClick);
    document.removeEventListener('click', onOutCloseClickHandler);
    document.removeEventListener('keydown', modalCloseEsc);
  }
  document.body.append(clonedModal);
  document.addEventListener('keydown', modalCloseEsc);
  closeModalButtonElement.addEventListener('click', modalCloseClick);
  document.addEventListener('click', onOutCloseClickHandler);
}

export {openModal,closeWindow,openWindow};
//
