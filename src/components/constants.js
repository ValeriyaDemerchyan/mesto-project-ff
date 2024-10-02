const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll('.popup');
const avatarForm = document.querySelector('form[name="change-avatar"]');
const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup__avatar');
const popupButtonAvatar = avatarPopup.querySelector('.popup__button');
const inputLinkAvatar = avatarPopup.querySelector('.popup__input_type_url');
const editPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const editButton = document.querySelector('.profile__edit-button');
const popupButtonEdit = editForm.querySelector('.popup__button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
const addButton = document.querySelector('.profile__add-button');
const popupButtonCard = cardForm.querySelector('.popup__button');
const closeButtons = document.querySelectorAll('.popup__close');
const imageTypePopup = document.querySelector('.popup_type_image');
const imagePopup = imageTypePopup.querySelector('.popup__image');
const imageCaptionPopup = imageTypePopup.querySelector('.popup__caption');

export { placesList, cardTemplate, popups, avatarForm, profileImage, avatarPopup, popupButtonAvatar,inputLinkAvatar, editPopup, profileTitle, profileDescription, editForm, nameInput, jobInput, editButton, popupButtonEdit, newCardPopup, cardForm, cardNameInput, cardUrlInput, addButton, popupButtonCard, closeButtons, imageTypePopup, imagePopup, imageCaptionPopup }