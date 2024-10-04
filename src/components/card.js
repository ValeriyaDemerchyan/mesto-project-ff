import { putLike, deleteLike, deleteCard } from './api';
import { cardTemplate } from './constants';

function createCard(card, userId, removeCard, likeCard, openCardImage) {
  const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardContent.querySelector('.card__image');
  const cardDescription = cardContent.querySelector('.card__description');
  const deleteButton = cardContent.querySelector('.card__delete-button');
  const cardTitle = cardDescription.querySelector('.card__title');
  const likeButton = cardDescription.querySelector('.card__like-button');
  const likeCounter = cardDescription.querySelector('.card__like-counter');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length.toString();
  cardContent.id = card._id;

  deleteButton.addEventListener('click', () => removeCard(cardContent));

  likeButton.addEventListener('click', () => likeCard(card, userId, likeButton, likeCounter));

  cardImage.addEventListener('click', () => openCardImage(card.link, card.name));

  if(card.owner._id !== userId) {
    deleteButton.remove();
  }

  if(checkLike(card, userId)) {
    likeButton.classList.add('card__like-button_is-active')
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  return cardContent;
};

function removeCard(cardContent) {
  deleteCard(cardContent.id)
  .then(() => cardContent.remove())
  .catch(err => console.log(`Ошибка: ${err}`))
};

function likeCard(card, userId, buttonLike, buttonCount) {

  if(checkLike(card, userId)) {
    deleteLike(card)
    .then((res) => {
      handleLikeSuccess(res, buttonLike, buttonCount);
      card.likes = res.likes;
    }).catch(handleLikeError);
  } else {
    putLike(card)
    .then((res) => {
      handleLikeSuccess(res, buttonLike, buttonCount);
      card.likes = res.likes;
    }).catch(handleLikeError);
  }
};

function handleLikeSuccess (res, buttonLike, buttonCount) {
  buttonLike.classList.toggle('card__like-button_is-active');
  buttonCount.textContent = res.likes.length;
};

function handleLikeError (err) {
  console.log(`Ошибка: ${err.message}`)
};

function checkLike (card, userId) {
  return card.likes.some((like) => like._id === userId);
};

export { createCard, removeCard, likeCard};