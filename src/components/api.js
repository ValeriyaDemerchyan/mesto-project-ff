const apiConfig = {
    baseURL: 'https://mesto.nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: 'd9435dee-fa54-442c-9afd-bade983a9854',
      'Content-Type': 'application/json',
    }
  }
  
  export function getUserInfo () {
    return fetch(`${apiConfig.baseURL}/users/me`, {
      headers: apiConfig.headers,
    })
    .then((res) => handleResponse(res))
  };
  
  export function getInitialCards () {
    return fetch(`${apiConfig.baseURL}/cards`, {
      headers: apiConfig.headers,
    })
    .then((res) => handleResponse(res))
  };

  function handleResponse (res) {
    if(res.ok) {
      return res.json();
    } else {
    return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  function post(url, data, method = 'POST') {
    return fetch(`${apiConfig.baseURL}${url}`, {
        method,
        headers: apiConfig.headers,
        body: JSON.stringify(data)
    }).then(handleResponse)
  }

  export function putLike (data) {
    return  post(`/cards/likes/${data._id}`, {}, 'PUT');
  }
  export function deleteLike (data) {
    return  post(`/cards/likes/${data._id}`, {}, 'DELETE');
  }
  
  export function patchProfile(inputName, inputDescription) {
    return post('/users/me', { name: inputName, about: inputDescription }, 'PATCH');
  }

  export function patchAvatar(link) {
    return post('/users/me/avatar', { avatar: link }, 'PATCH');
  }
  
  export function postNewCard (cardNameInput, cardUrlInput) {
    return post('/cards', { name: cardNameInput, link: cardUrlInput });
  }

  export function deleteCard (card) {
    return post(`/cards/${card}`, {}, 'DELETE');
  }
