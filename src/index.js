import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const editButton = document.querySelector('.profile__edit-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const imageTypePopup = document.querySelector('.popup_type_image');
const imagePopup = imageTypePopup.querySelector('.popup__image');
const imageCaptionPopup = imageTypePopup.querySelector('.popup__caption');

function handleFormSubmit(evt) {
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
};

editForm.addEventListener('submit', handleFormSubmit);

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  openPopup(editPopup)
})

function handleFormCard (evt) {
  evt.preventDefault();

  const cardFormData = {
    name: cardNameInput.value,
    link: new URL(cardUrlInput.value, import.meta.url)
  }
  const card = createCard(cardFormData, removeCard, likeCard, openCardImage);
  placesList.prepend(card);

  cardForm.reset();

  closePopup(newCardPopup);
  
}

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
})

closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const closeButton = item.closest('.popup');
    closePopup(closeButton);
  })
})

closePopupByOverlay(popups);

function openCardImage (cardLink, cardName) {
  imagePopup.src = cardLink;
  imagePopup.alt = cardName;
  imageCaptionPopup.textContent = cardName;

  openPopup(imageTypePopup);
}

document.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => {
    if(!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated');
    }
  })
})

initialCards.forEach(function (card) {
  const cardElement = createCard(card, removeCard, likeCard, openCardImage);
  placesList.append(cardElement);
});
