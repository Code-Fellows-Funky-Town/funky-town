var formLogin = document.getElementById('login');
var nameUser = '';
var email = '';
var currentUser = {};
var greeting = document.getElementById('greeting');

function checkUsers(event) {
    event.preventDefault();
    nameUser = event.target.name.value;
    email = event.target.email.value;
}
formLogin.addEventListener('submit', checkUsers);

var key = 'user-' + email;

// if (localStorage.getItem(key)) {
currentUser = JSON.parse(key);
//     var h1 = document.createElement('h1');
//     h1.textContent = 'welcome back ' + currentUser.name + '!';
//     greeting.appendChild('h1');
// }

console.log(currentUser);




// localStorage.getItem(key);
// localStorage.setItem('user-' + currentUser.email, JSON.stringify(currentUser));