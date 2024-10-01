const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll('.popup');

const avatarForm = document.querySelector('button[name="edit-avatar"]');
const avatarButton = avatarForm.querySelector('.profile__avatar-button');


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

export { placesList, cardTemplate, popups, editPopup, profileTitle, profileDescription, editForm, nameInput, jobInput, editButton, newCardPopup, cardForm, cardNameInput, cardUrlInput, addButton, closeButtons, imageTypePopup, imagePopup, imageCaptionPopup }