import { openWindow } from './window.js';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    const endLine = fileName.endsWith(it);
    return endLine;
  });
  if (matches) {
    openWindow();
    preview.src = URL.createObjectURL(file);
  }
});
//endsWith - проверка на что оканчивается строка

