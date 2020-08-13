const setupObj = {
  inputSelector: '.form__input',
  formButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const elements = {
  profile: document.querySelector('.profile'),
  name: document.querySelector('.profile__title'),
  about: document.querySelector('.profile__profession'),
  btnEditProfile: document.querySelector('.profile__edit-button'),
  btnAddCard: document.querySelector('.profile__add-button'),
  placesContainer: document.querySelector('.places__container'),
  popup: document.querySelector('.popup'),
  popupImage: document.querySelector('.popup-image'),
  overlay: document.querySelector('.overlay'),
  closePopupButtons: document.querySelectorAll('.close-btn'),
  formProfileEdit: document.querySelector('.popup-form_type_profile-edit'),
  inputName: document.querySelector('.form__input_txt_name'),
  inputAbout: document.querySelector('.form__input_txt_about'),
  formCardEdit: document.querySelector('.popup-form_type_card-edit'),
  inputTitle: document.querySelector('.form__input_txt_title'),
  inputLink: document.querySelector('.form__input_txt_link'),
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
  export { setupObj, elements, initialCards };