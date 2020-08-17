const cssClasses = {
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  openedClass: 'popup_opened',
  inactiveButtonClass: 'form__btn_disabled',
  clickedLikeBtnClass: 'places__like-button_state_clicked',
  cardTemplateSelector: '#places__card',
  formSelector: '.form',
  inputSelector: '.form__input',
  formButtonSelector: '.form__btn',
  cardTitleSelector: '.places__card-title',
  cardImageSelector: '.places__card-image',
  likeBtnSelector: '.places__like-button',
  trashBtnSelector: '.places__trash-btn',
  closePopupBtnSelector: '.close-btn',
};

const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__title');
const about = profile.querySelector('.profile__profession');
const btnEditProfile = profile.querySelector('.profile__edit-button');
const btnAddCard = profile.querySelector('.profile__add-button');
const placesContainer = document.querySelector('.places__container');
const popup = document.querySelector('.popup');
const popupImage = popup.querySelector('.popup-image');
const popupImageImg = popupImage.querySelector('.popup-image__img');
const popupImageTitle = popupImage.querySelector('.popup-image__title');
const overlay = popup.querySelector('.overlay');
const formProfileEdit = popup.querySelector('.popup-form_type_profile-edit');
const inputName = formProfileEdit.querySelector('.form__input_txt_name');
const inputAbout = formProfileEdit.querySelector('.form__input_txt_about');
const formCardEdit = popup.querySelector('.popup-form_type_card-edit');
const inputTitle = formCardEdit.querySelector('.form__input_txt_title');
const inputLink = formCardEdit.querySelector('.form__input_txt_link');

const elements = {
  profile,
  name,
  about,
  btnEditProfile,
  btnAddCard,
  placesContainer,
  popup,
  popupImage,
  popupImageImg,
  popupImageTitle,
  overlay,
  formProfileEdit,
  inputName,
  inputAbout,
  formCardEdit,
  inputTitle,
  inputLink,
};

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'фотография гор Архыза',
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'фотография пейзажа Челябинской области',
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'фотография городского пейзажа Иваново',
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'фотография природы Камчатки',
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'фотография железной дороги в лесу в Холмогорах',
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'фотография скал и скованного льдом Байкала',
  }
];
  export { cssClasses, elements, initialCards };