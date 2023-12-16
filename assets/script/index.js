'use strict';

import { onEvent, select } from './utils.js';

/* - - - - - SELECTIONS - - - - - */
const inputEmail = select('.email');
const inputPassword = select('.password');
const errorEmail = select('.error-email');
const errorPassword = select('.error-password');
const btnLogin = select('.btn-login');

/* - - - - - MAIN CODE - - - - - */
let emailRegex =
  /^(?=.{8,}$)[-_A-Za-z0-9]+([.-_][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;

let passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/;

function validateCredentials() {
  errorEmail.innerText = '';
  errorPassword.innerText = '';

  if (!emailRegex.test(inputEmail.value)) {
    errorEmail.innerText = 'Please enter a valid email address';
    return false;
  }

  if (!passwordRegex.test(inputPassword.value)) {
    errorPassword.innerText =
      'Password must be 8-20 chars, 1 digit, 1 lowercase, 1 uppercase, 1 special char';
    return false;
  }

  return true;
}

// Set the local storage
let localStorageEmail = 'fanniesantiago@email.com';
let localStoragePassword = 'Fannie#01';

localStorage.setItem('email', localStorageEmail);
localStorage.setItem('password', localStoragePassword);

function userLogin() {
  const userEmail = localStorage.getItem('email');
  const userPassword = localStorage.getItem('password');

  if (userEmail === inputEmail.value && userPassword === inputPassword.value) {
    window.location.href = 'home.html';
  } else {
    errorPassword.innerText = 'Incorrect email or password';
  }
}

/* - - - - - EVENTS - - - - - */

onEvent('click', btnLogin, () => {
  if (validateCredentials()) {
    userLogin();
    inputEmail.value = '';
    inputPassword.value = '';
  }
});

onEvent('input', inputEmail, () => {
  errorEmail.innerText = '';
});

onEvent('input', inputPassword, () => {
  errorPassword.innerText = '';
});

onEvent('click', inputEmail, () => {
  inputEmail.focus();
  inputEmail.style.border = '1px solid #007df6';
});

onEvent('click', inputPassword, () => {
  inputPassword.focus();
  inputPassword.style.border = '1px solid #007df6';
});

onEvent('blur', inputEmail, () => {
  inputEmail.style.border = ''; 
});

onEvent('blur', inputPassword, () => {
  inputPassword.style.border = '';
});