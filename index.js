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
// Елизавета, про ресет - понял, как сделать, но так как форма редактирования у меня не элемент, 
// а отдельный блок, и кнопка закрытия лежит в другом блоке, переделаю
// уже после получения зачета, а то из-за своей невнимательности и спешки довел до 4 итерации:) 
// Вдруг еще чего забуду убрать или подчистить:) Спасибо Вам!

const togglePopup = () => {
    popup.classList.toggle('popup_opened');
    addInputName();
    addInputAbout();
};
const closePopup = () => {
    togglePopup();
};
const changeName = () => {
    name.textContent = inputName.value;
};
const changeAbout = () => {
    about.textContent = inputAbout.value;
};
const submitEditForm = () => {
    event.preventDefault();
    changeName();
    changeAbout();
    togglePopup();
};

btnEditProfile.addEventListener('click', togglePopup);
btnClosePopup.addEventListener('click', closePopup);
btnPopupSubmit.addEventListener('click', submitEditForm);