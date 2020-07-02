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
// Елизавета, здесь пока не совсем понял, как ресетить форму - буду вникать...
// const resetFormInputValues = () => {
//     inputName.value = '';
//     inputAbout.value = '';
// }; 
const togglePopup = () => {
    popup.classList.toggle('popup_opened');
    addInputName();
    addInputAbout();
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
    togglePopup();
};

btnEditProfile.addEventListener('click', togglePopup);
btnClosePopup.addEventListener('click', togglePopup);
btnPopupSubmit.addEventListener('click', submitEditForm);