import { setupObj, elements as el } from './setup.js'

export const renderPopup = (modal, background) => {
    showElement(el.popup, modal);
    renderOverlayBg(background);
    document.addEventListener('keydown', closeByEscape);
};

export const hideElement = (...rest) => {
    rest.forEach(el => el.classList.remove('display_is-visible'));
};
export const showElement = (...rest) => {
    rest.forEach(el => el.classList.add('display_is-visible'));
};
export const renderOverlayBg = (color = 'rgba(0, 0, 0, .5)') => {
    el.overlay.style.backgroundColor = color;
};
export const closePopup = evt => {
    const modal = evt.target.parentElement;
    hideElement(el.popup, modal);
    document.removeEventListener('keydown', closeByEscape);
};
export const closeByOverlay = () => {
    const siblings = Array.from(el.overlay.parentElement.children);
    siblings
        .forEach(sibling => hideElement(sibling));
    hideElement(el.popup);
};
export const closeByEscape = evt => {
    if (evt.key === 'Escape') { 
        closeByOverlay();
    }
};

export const showImagePopup = evt => {
    const clickedImage = evt.target;
    el.popupImage.querySelector('.popup-image__img').src = clickedImage.src
    el.popupImage.querySelector('.popup-image__title').textContent = clickedImage.parentElement.querySelector('.places__card-title').textContent;
    renderPopup(el.popupImage, 'rgba(0, 0, 0, .9)');
};

export const submitProfileForm = evt => {
    evt.preventDefault();
    el.name.textContent = el.inputName.value;
    el.about.textContent = el.inputAbout.value;
    closePopup(evt);
};

export const renderNewCard = (card, target) => {
    if (target === 'begin') {
        el.placesContainer.prepend(card);
    } 
    el.placesContainer.append(card)
};