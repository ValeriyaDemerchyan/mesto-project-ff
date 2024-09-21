function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscape)
}

function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape)
}

function closePopupByEscape (evt) {
    const openedPopup = document.querySelector('.popup_is-opened');

    if(evt.key === 'Escape') {
        closePopup(openedPopup)
    }
}

function closePopupByOverlay(popups) {
    popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
      })
    })
  }

  export { openPopup, closePopup, closePopupByOverlay }
  