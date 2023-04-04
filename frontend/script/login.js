import { renderNotes } from "./showNotes.js";

const loginContainer = document.getElementById('login');
let notesContainer = document.getElementById('notes');

export function renderLogin(){
  let loggedInUser = localStorage.getItem('username');

  if(loggedInUser){
    renderLoggedin()
  } else{
    notesContainer.innerHTML = ``;
    loginContainer.innerHTML = `
    <h2>Log in<h2>
    <form>
      <input type="text" id="emailInput" placeholder="email">
      <input type="password" id="passwordInput" placeholder="password">
      <button type="button" id="loginBtn">Log in</button>
    </form>`;

    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');


    document.getElementById('loginBtn').addEventListener('click', () => {
      fetch('http://localhost:3000/users/')
      .then(res => res.json())
      .then(data => {
        data.map(user => {
          if(user.email == emailInput.value){
            if(user.password == passwordInput.value){
              localStorage.setItem('username', user.username)
              renderLoggedin()
              renderNotes()
            } else{
              alert('wrong password')
            }
          } else{
            alert('user not found');
          }
        })
      })
    })
  }
}

function renderLoggedin(){
  let loggedInUser = localStorage.getItem('username')
  loginContainer.innerHTML = `
  <h2>Welcome ${loggedInUser}</h2>
  <button id="logOutBtn">Log out</button>`

  document.getElementById('logOutBtn').addEventListener('click', logout)
}

function logout(){
  localStorage.removeItem('username')
  renderLogin()
}