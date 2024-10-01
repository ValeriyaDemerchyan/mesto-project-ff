import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "./components/modal.js";
import {
  placesList,
  popups,
  editPopup,
  profileTitle,
  profileDescription,
  editForm,
  nameInput,
  jobInput,
  editButton,
  newCardPopup,
  cardForm,
  cardNameInput,
  cardUrlInput,
  addButton,
  closeButtons,
  imageTypePopup,
  imagePopup,
  imageCaptionPopup,
} from "./components/constants.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
}

editForm.addEventListener("submit", handleFormSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(editPopup);
  clearValidation(editForm, validationConfig);
});

function handleFormCard(evt) {
  evt.preventDefault();

  const cardFormData = {
    name: cardNameInput.value,
    link: new URL(cardUrlInput.value, import.meta.url),
  };
  const card = createCard(cardFormData, removeCard, likeCard, openCardImage);
  placesList.prepend(card);

  cardForm.reset();

  closePopup(newCardPopup);
}

cardForm.addEventListener("submit", handleFormCard);

addButton.addEventListener("click", () => {
  clearValidation(cardForm, validationConfig);
  openPopup(newCardPopup);
  cardForm.reset();
});

closeButtons.forEach((item) => {
  item.addEventListener("click", (evt) => {
    const closeButton = item.closest(".popup");
    closePopup(closeButton);
  });
});

closePopupByOverlay(popups);

function openCardImage(cardLink, cardName) {
  imagePopup.src = cardLink;
  imagePopup.alt = cardName;
  imageCaptionPopup.textContent = cardName;

  openPopup(imageTypePopup);
}

document.addEventListener("DOMContentLoaded", () => {
  popups.forEach((popup) => {
    if (!popup.classList.contains("popup_is-animated")) {
      popup.classList.add("popup_is-animated");
    }
  });
});

initialCards.forEach(function (card) {
  const cardElement = createCard(card, removeCard, likeCard, openCardImage);
  placesList.append(cardElement);
});

const apiConfig = {
  baseURL: 'https://mesto.nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: 'd9435dee-fa54-442c-9afd-bade983a9854',
    'Content-Type': 'application/json',
  }

function getUserInfo () {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    headers: apiConfig.headers,
  })
  .then((res) => handleResponse(res))
};

function getInitialCards () {
  return fetch(`${apiConfig.baseURL}/cards`, {
    headers: apiConfig.headers,
  })
  .then((res) => handleResponse(res))
};

function patchProfile(name, description) {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  })
  .then((res) => handleResponse(res))
}

function postNewCard (name, link) {
  return fetch(`${apiConfig.baseURL}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then((res) => handleResponse(res));
}

function putLike (_id) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  })
  .then((res) => handleResponse(res));
}

console.log(putLike('66fc12eef7002407ee6651a7'));

function deleteLike (_id) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
  .then((res) => handleResponse(res));
}

function handleResponse (res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};