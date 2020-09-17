const cssClasses = {
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  openedClass: 'popup_opened',
  inactiveButtonClass: 'form__btn_disabled',
  clickedLikeBtnClass: 'places__like-button_state_clicked',
};

const cssSelectors = {
  cardSelector: '.places__card',
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
  avatarEditFormSelector: '.popup-form_type_avatar-edit',
  confirmPopupSelector: '.popup-form_type_approval',
  placesContainerSelector: '.places__container',
  placesLikesCounterSelector: '.places__like-counter',
  avatarSelector: '.profile__avatar',
  aboutSelector: '.profile__profession',
  nameSelector: '.profile__title',
  popupImageSelector: '.popup-image',
  actionButtonSelector: '.form__btn',
};

const validationSetubObject = {
  inputSelector: cssSelectors.inputSelector,
  formButtonSelector: cssSelectors.formButtonSelector,
  inactiveButtonClass: cssClasses.inactiveButtonClass,
  inputErrorClass: cssClasses.inputErrorClass,
  errorClass: cssClasses.errorClass,
};

const profile = document.querySelector('.profile');
const btnEditProfile = profile.querySelector('.profile__edit-button');
const btnAddCard = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupImage = popup.querySelector('.popup-image');
// eslint-disable-next-line camelcase
const popupImage_Img = popupImage.querySelector('.popup-image__img');
// eslint-disable-next-line camelcase
const popupImage_Title = popupImage.querySelector('.popup-image__title');
const profileEditModal = popup.querySelector('.popup-form_type_profile-edit');
const profileEditForm = profileEditModal.querySelector('.form');
const cardEditModal = popup.querySelector('.popup-form_type_card-edit');
const cardEditForm = cardEditModal.querySelector('.form');
const avatarEditModal = popup.querySelector('.popup-form_type_avatar-edit');
const avatarEditForm = avatarEditModal.querySelector('.form');
const avatar = profile.querySelector('.profile__avatar-wrap');

const elements = {
  btnEditProfile,
  btnAddCard,
  popup,
  popupImage,
  popupImage_Img,
  popupImage_Title,
  profileEditForm,
  cardEditForm,
  avatarEditForm,
  avatar,
};

export {
  cssClasses, cssSelectors, elements, validationSetubObject,
};
