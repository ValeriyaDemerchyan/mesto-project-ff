// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card, removeCard) {
let cardContent = cardTemplate.querySelector('.card').cloneNode(true);
cardContent.querySelector('.card__title').textContent = card.name;
let cardImage = cardContent.querySelector('.card__image');
cardImage.src = card.link;
cardImage.alt = card.alt;

const deleteButton = cardContent.querySelector('.card__delete-button');
deleteButton.addEventListener('click', removeCard);

return cardContent;
}

// @todo: Функция удаления карточки
function removeCard (cardContent) {
const deleteButton = cardContent.querySelector('.card__delete-button');
cardContent.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    const cardElement = createCard(card, removeCard);
    placesList.append(cardElement);
});
