
//окно с фото
const activeImg = document.querySelector('.big-picture');
const body = document.querySelector('body');
const showFiveComments = 5;
const socialCommentsCount = document.querySelector('.social__comment-count');
// в HTML нашли куда вставлять картинки
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCaption = document.querySelector('.social__caption');

const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const likesCount = document.querySelector('.likes-count');

const commentTemplateAll = document.querySelector('#comment').content;
const commentTemplate = commentTemplateAll.querySelector('li');

//const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentItem = document.querySelectorAll('.social__comment');

//генерация комментария
const createCommentPhotoUser = (commentInfo) => {
  const commentsUsers = commentTemplate.cloneNode(true);
  commentsUsers.querySelector('img').src=commentInfo.avatar;
  commentsUsers.querySelector('img').alt=commentInfo.name;
  commentsUsers.querySelector('p').textContent=commentInfo.message;
  return commentsUsers;
};

//функции взаимодействия с фото

const openBigPicture = () => {
  activeImg.classList.remove('hidden');
  body.classList.add('modal-open');
  commentItem[0].remove();
  commentItem[1].remove();
};

const bigPictureCansel = document.querySelector('#picture-cancel');
/*
const closeBigPicture = () => {
  bigPictureCansel.addEventListener('click', () => {
    activeImg.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    commentsList.innerHTML = '';
    console.log(commentsList)
  });};
*//*
function remove(){
 const elem= commentsList.childNodes;
 for(let i=0; i<elem.length;i++){
  elem[i].remove();
 }
}*/
const loaderButton = document.querySelector('.comments-loader');
function close(){
  activeImg.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsList.innerHTML = '';
  bigPictureCansel.removeEventListener('click', close);
}
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    activeImg.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    commentsList.innerHTML = '';
  }
});

// генерация открытых превьюшек
const createBigPhoto = (miniatures, description,likes,comments) => {
  bigPictureImg.querySelector('img').src = miniatures.querySelector('.picture__img').src;
  socialCaption.textContent = description;
  likesCount.textContent=likes;
  commentsCount.textContent = miniatures.querySelector('.picture__comments').textContent;

  comments.slice(0,5).forEach((comment) => {
  const newComment = createCommentPhotoUser(comment);
  commentsList.appendChild(newComment);

  });

  if (commentsCount.textContent <= showFiveComments) {
    socialCommentsCount.firstChild.textContent = ` ${commentsCount.textContent} из  `;
    loaderButton.classList.add('hidden'); }
  if (commentsCount.textContent > showFiveComments) {
    socialCommentsCount.firstChild.textContent = ` ${showFiveComments} из  `;
    loaderButton.addEventListener('click', () => {
      comments.slice(5).forEach((comment) => {
        const newComment = createCommentPhotoUser(comment);
        commentsList.appendChild(newComment);
      });
      socialCommentsCount.firstChild.textContent = ` ${commentsCount.textContent} из  `;
      loaderButton.classList.add('hidden');
    },{once:true});

  }

  openBigPicture();
  bigPictureCansel.addEventListener('click',close);
};

export { createBigPhoto,createCommentPhotoUser};

