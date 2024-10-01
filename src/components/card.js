import { cardTemplate } from "./constants";

function createCard(card, removeCard, likeCard, openCardImage) {
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

  deleteButton.addEventListener('click', () => removeCard(cardContent));

  likeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', () => openCardImage(card.link, card.name));

  return cardContent;
}

function removeCard(cardContent) {
  cardContent.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, removeCard, likeCard};