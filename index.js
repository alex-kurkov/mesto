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
const form = popup.querySelector('.form');

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
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;
    togglePopup();
};
const submitForm = (event) => {
    console.log('sdlkjsaldkvc');
    event.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    togglePopup();
};

btnEditProfile.addEventListener('click', openPopup);
btnClosePopup.addEventListener('click', togglePopup);
form.addEventListener("submit", submitForm);
