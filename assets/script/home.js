'use strict';

import { onEvent, select } from './utils.js';

/* - - - - - SELECTIONS - - - - - */
const usersList = select('.users-list');

const options = {
  method: 'GET',
  mode: 'cors',
};

async function getUsers() {
  const URL = `https://randomuser.me/api/?nat=CA&results=10&seed=same`;

  try {
    const result = await fetch(URL, options);

    if (!result.ok) {
      throw Error(`${result.statusText} (${result.status})`);
    }

    const users = await result.json();
    const list = users.results;
    displayUsers(list);
  } catch (error) {
    console.log(error.message);
  }
}

async function displayUsers(usersArray) {
  usersArray.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-div');
    userDiv.innerHTML = `
      <figure><img src="${user.picture.thumbnail}" alt="User image" /></figure>
      <div>
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}</p>
      </div>
      <div class="plus-icon"><i class="fa-solid fa-plus"></i></div>
    `;
    usersList.appendChild(userDiv);
  });
}

onEvent('load', window, () => {
  getUsers();
});
