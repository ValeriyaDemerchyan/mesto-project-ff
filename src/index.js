import './pages/index.css';
import { getInitialCards, getUserInfo, patchAvatar, patchProfile, postNewCard } from './components/api.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from './components/modal.js';
import {
  placesList,
  popups,
  avatarForm,
  profileImage,
  avatarPopup,
  popupButtonAvatar,
  inputLinkAvatar,
  editPopup,
  profileTitle,
  profileDescription,
  editForm,
  nameInput,
  jobInput,
  editButton,
  popupButtonEdit,
  newCardPopup,
  cardForm,
  cardNameInput,
  cardUrlInput,
  addButton,
  popupButtonCard,
  closeButtons,
  imageTypePopup,
  imagePopup,
  imageCaptionPopup
} from './components/constants.js';

import { enableValidation, clearValidation } from './components/validation.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

profileImage.addEventListener('click', () => {
  inputLinkAvatar.value = '';
  clearValidation(avatarPopup, validationConfig);
  openPopup(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  popupButtonAvatar.textContent = 'Сохранение...'

  patchAvatar(inputLinkAvatar.value)
  .then((res) => {
    profileImage.style.backgroundImage = `url('${res.avatar}')`;
    closePopup(avatarPopup);
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => popupButtonAvatar.textContent = 'Сохранить');
});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  popupButtonEdit.textContent = 'Сохранение...'

  patchProfile(nameInput.value, jobInput.value)
  .then((res) => {
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
  closePopup(editPopup);
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => popupButtonEdit.textContent = 'Сохранить');
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(editPopup);
  clearValidation(editForm, validationConfig);
});

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  popupButtonCard.textContent = 'Сохранение...'

  postNewCard(cardNameInput.value, cardUrlInput.value)
  .then((card) => {
    placesList.prepend(createCard(card, card.owner._id, removeCard, likeCard, openCardImage));
    cardForm.reset();
    closePopup(newCardPopup);
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => popupButtonCard.textContent = 'Сохранить');
});

addButton.addEventListener('click', () => {
  clearValidation(cardForm, validationConfig);
  cardNameInput.value = '';
  cardUrlInput.value = '';
  openPopup(newCardPopup);
});

closeButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const closeButton = item.closest('.popup');
    closePopup(closeButton);
  });
});

closePopupByOverlay(popups);

function openCardImage(cardLink, cardName) {
  imagePopup.src = cardLink;
  imagePopup.alt = cardName;
  imageCaptionPopup.textContent = cardName;

  openPopup(imageTypePopup);
};

document.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => {
    if (!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated');
    }
  });
});

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, userData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    
  
    cards.forEach((card) => 
      placesList.append(createCard(card, userData._id, removeCard, likeCard, openCardImage)));
    })
  .catch((err) => console.log(`Ошибка: ${err.message}`));
  