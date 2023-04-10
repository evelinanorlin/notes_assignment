import { renderNotes } from "./showNotes.js";
import { renderNote } from "./showNotes.js";

let notesContainer = document.getElementById('notes');

export function editNote(noteId){
  fetch('http://localhost:3000/notes/')
    .then(res => res.json())
    .then(data => {
      data.map(data => {
        if(noteId == data.id){
          notesContainer.innerHTML = `
          <button id="backBtn">Go back</button>
          <h2>Edit "${data.title}"</h2>
          <label for="titleinput">Title:</label><br>
          <input class="editInput" type="text" name="titleinput" value="${data.title}" id="titleInput"><br>
          <label for="descriptioninput">Description:</label><br>
          <input class="editInput" type="text" name="descriptioninput" value="${data.description}" id="descInput">
          <textarea id="mytextarea">${data.content}</textarea>
          <button id="saveBtn">save changes</button>
          `;
          
          tinymce.remove();
          tinymce.init({
            selector: '#mytextarea',
            menubar: false,
            toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | backcolor forecolor',
            setup: (editor) => {
              editor.on('change', () => {
              const contentValue = editor.getContent();
              const mytextarea = document.getElementById('mytextarea');
              mytextarea.value = contentValue;
            });
          }
        });
        const titleInput = document.getElementById('titleInput');
        const descInput = document.getElementById('descInput');

        document.getElementById('backBtn').addEventListener('click', () => {
          renderNote(noteId)
        })
        
        document.getElementById('saveBtn').addEventListener('click', () => {
          let author = localStorage.getItem('username')
          let note = {
            "id": noteId,
            "title": titleInput.value,
            "description": descInput.value,
            "content": mytextarea.value,
            "author": author
          }

          fetch('http://localhost:3000/notes/edit', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(note)
          })
            .then(res => res.json())
            .then(data => {
              notesContainer.innerHTML = `
              <h3>The note is updated!</h3>
              <button id="backBtn">Back to notes</button>`
              
              document.getElementById('backBtn').addEventListener('click', renderNotes)
          })
        })
      }
    })
  })
}