'use strict';

var formLogin = document.getElementById('login');
var userCheck = {};

// event handler that stores name and id inputs as an object to the localStorage
function storeUserCheck(e) {
  e.preventDefault();
  userCheck = {
    name: e.target.name.value,
    email: e.target.email.value
  };
  localStorage.setItem('userId', JSON.stringify(userCheck));
  location.href = 'pages/user.html';
}

// event listner that waits for user input
formLogin.addEventListener('submit', storeUserCheck);
