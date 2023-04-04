import { addNote } from "./addNotes.js"
import { editNote } from "./editNote.js";

let notesContainer = document.getElementById('notes');

export function renderNotes(){
  notesContainer.innerHTML = `
  <button id="addBtn">Add note</button>
  <h2>Your notes</h2>
  <div class="notesflex">`

  fetch('http://localhost:3000/notes/')
    .then(res => res.json())
    .then(data => {
      data.map(data => {
        if(data.isdeleted == 0){
          notesContainer.innerHTML += `
          <div class="note">
            <h3>${data.title}</h3>
            ${data.description} <br>
            <button class="readMoreBtn" id="${data.id}">Open note</button>
          </div>`; 
        }
      })

      notesContainer.innerHTML += `</div>`
      document.getElementById('addBtn').addEventListener('click', addNote)
      let openBtns = document.querySelectorAll('.readMoreBtn')

      openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          renderNote(e.target.id);
      })
    });
  })
}

export function renderNote(noteId){
  fetch('http://localhost:3000/notes/')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.map(data => {
        if(data.id == noteId){
          notesContainer.innerHTML = `
          <button id="backBtn">Back to notes</button>
          <div class="opennote">
            <h2>${data.title}</h2>
            ${data.content}
            <p>by: ${data.author}</p>
          </div>
          <div>
            <button id="editBtn">Edit note</button>
            <button id="removeBtn">Remove note</button>
          </div>
        `
        document.getElementById('backBtn').addEventListener('click', renderNotes);

        document.getElementById('removeBtn').addEventListener('click', () => {
          deleteNote(noteId)
        });

        document.getElementById('editBtn').addEventListener('click', () => {
          editNote(noteId)
        })
      }
    })
  })
}

function deleteNote(noteId){
  console.log(noteId)
  notesContainer.innerHTML = `
  <h3>Are you sute you want to delete your note?</h3>
  <button id="deleteBtn">Yes, delete</button>
  <button id="backBtn">No, go back to note</button>`;

  document.getElementById('backBtn').addEventListener('click', () => {
    renderNote(noteId);
  })

  document.getElementById('deleteBtn').addEventListener('click', () => {
    let note = {
      "id": noteId
    }

    fetch('http://localhost:3000/notes/delete', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note)
    })
      .then(res => res.json())
      .then(data => {
        notesContainer.innerHTML = `
        <h3>The note is deleted!</h3>
        <button id="backBtn">Back to notes</button>`
        
        document.getElementById('backBtn').addEventListener('click', renderNotes)
      })
  })
}