import { addNote } from "./addNotes.js"

let notesContainer = document.getElementById('notes');

export function renderNotes(){
  notesContainer.innerHTML = `
  <h2>Notes</h2><div class="notes">`
  // OBS KOLLA OM NOTE ÄR RADERAD ELLER INTE!
  fetch('http://localhost:3000/notes/')
    .then(res => res.json())
    .then(data => {
      data.map(data => {
        notesContainer.innerHTML += `
        <h3>${data.title}</h3>
        ${data.description}
        <button class="readMoreBtn" id="${data.id}">Open note</button>`;
      })
      notesContainer.innerHTML += `</div><button id="addBtn">Add note</button>`

      document.getElementById('addBtn').addEventListener('click', addNote)

      let openBtns = document.querySelectorAll('.readMoreBtn')

      openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          renderNote(e.target.id)
        })
      });
    })
}

function renderNote(noteId){
  fetch('http://localhost:3000/notes/')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.map(data => {
        if(data.id == noteId){
          notesContainer.innerHTML = `
          <button id="backBtn">Back to notes</button>
          <div>
            <h2>${data.title}</h2>
            ${data.content}
            <p>by: ${data.author}</p>
          </div>
          <div>
            <button id="editBtn">Edit note</button>
            <button id="removeBtn">Remove note</button>
          </div>
        `
        document.getElementById('backBtn').addEventListener('click', renderNotes)
      }
    })
  })
}