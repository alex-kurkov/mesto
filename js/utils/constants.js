const cssClasses = {
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  openedClass: 'popup_opened',
  inactiveButtonClass: 'form__btn_disabled',
  clickedLikeBtnClass: 'places__like-button_state_clicked',
};

const cssSelectors = {
  cardTemplateSelector: '#places__card',
  formSelector: '.form',
  inputSelector: '.form__input',
  formButtonSelector: '.form__btn',
  cardTitleSelector: '.places__card-title',
  cardImageSelector: '.places__card-image',
  likeBtnSelector: '.places__like-button',
  trashBtnSelector: '.places__trash-btn',
  closePopupBtnSelector: '.close-btn',
  profileEditFormSelector: '.popup-form_type_profile-edit',
  cardEditFormSelector: '.popup-form_type_card-edit',
  placesContainerSelector: '.places__container',
}

const profile = document.querySelector('.profile');
const btnEditProfile = profile.querySelector('.profile__edit-button');
const btnAddCard = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupImage = popup.querySelector('.popup-image');
const popupImage_Img = popupImage.querySelector('.popup-image__img');
const popupImage_Title = popupImage.querySelector('.popup-image__title');
const profileEditModal = popup.querySelector('.popup-form_type_profile-edit');
const profileEditForm = profileEditModal.querySelector('.form');
const cardEditModal = popup.querySelector('.popup-form_type_card-edit');
const cardEditForm = cardEditModal.querySelector('.form');

const elements = {
  btnEditProfile,
  btnAddCard,
  popup,
  popupImage,
  popupImage_Img,
  popupImage_Title,
  profileEditForm,
  cardEditForm,
};

const initialCards = [
  {
      place: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'фотография гор Архыза',
  },
  {
      place: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'фотография пейзажа Челябинской области',
  },
  {
      place: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'фотография городского пейзажа Иваново',
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'фотография природы Камчатки',
  },
  {
      place: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'фотография железной дороги в лесу в Холмогорах',
  },
  {
      place: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'фотография скал и скованного льдом Байкала',
  }
];
  export { cssClasses, cssSelectors, elements, initialCards };