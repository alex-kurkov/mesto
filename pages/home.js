let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let name = profile.querySelector('.profile__title');
let about = profile.querySelector('.profile__profession');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup-form');
let inputName = popupForm.querySelector('.form__input_txt_name');
let inputAbout = popupForm.querySelector('.form__input_txt_about');
let btnEditProfile = profile.querySelector('.profile__edit-button');
let btnClosePopup = popup.querySelector('.popup-form__close-btn');
let btnPopupSubmit = popupForm.querySelector('.form__btn_action_submit');

const addPlaceholderName = () => {
    inputName.setAttribute('placeholder', name.textContent);
};
const addPlaceholderAbout = () => {
    inputAbout.setAttribute('placeholder', about.textContent);
};
const openPopup = () => {
    popup.classList.add('popup_opened');
    addPlaceholderName();
    addPlaceholderAbout();
};
const closePopup = () => {
    popup.classList.remove('popup_opened');
};
const changeName = () => {
    const newName = (inputName.value !== '') ?
        inputName.value : name.textContent;
    name.textContent = newName;
};
const changeAbout = () => {
    const newAbout = (inputAbout.value !== '') ?
        inputAbout.value : about.textContent;
    about.textContent = newAbout;
};
const submitEditForm = () => {
    changeName();
    changeAbout();
    closePopup();
};

btnEditProfile.addEventListener('click', openPopup);
btnClosePopup.addEventListener('click', closePopup);
btnPopupSubmit.addEventListener('click', submitEditForm);