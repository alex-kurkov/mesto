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
const btnPopupSubmit = popupForm.querySelector('.form__btn_action_submit');

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