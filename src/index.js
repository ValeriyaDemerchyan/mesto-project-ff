import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal.js';
import { placesList, popups, editPopup, profileTitle, profileDescription, editForm, nameInput, jobInput, editButton, newCardPopup, cardForm, cardNameInput, cardUrlInput, addButton, closeButtons, imageTypePopup, imagePopup, imageCaptionPopup } from './components/constants.js';

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

cardForm.addEventListener('submit', handleFormCard);

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
