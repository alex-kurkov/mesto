const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const name = profile.querySelector('.profile__title');
const about = profile.querySelector('.profile__profession');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup-form');
const inputName = popupForm.querySelector('.form__input_txt_name');
const inputAbout = popupForm.querySelector('.form__input_txt_about');
const btnEditProfile = profile.querySelector('.profile__edit-button');
const btnClosePopup = popup.querySelector('.popup-form__close-btn');
const btnPopupSubmit = popupForm.querySelector('.form__btn');

const addInputName = () => {
    inputName.value = name.textContent;
};
const addInputAbout = () => {
    inputAbout.value = about.textContent;
};
const togglePopup = () => {
    popup.classList.toggle('popup_opened');
};
const openPopup = () => {
    togglePopup();
    addInputName();
    addInputAbout();
};
const submitEditForm = (event) => {
    event.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    togglePopup();
};

btnEditProfile.addEventListener('click', openPopup);
btnClosePopup.addEventListener('click', togglePopup);
btnPopupSubmit.addEventListener('submit', submitEditForm);