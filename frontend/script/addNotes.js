import { renderNotes } from "./showNotes.js";

let notesContainer = document.getElementById('notes');


export function addNote(){
  notesContainer.innerHTML = `
  <button id='backBtn'>Back to notes</button>
  <h2>Add a note</h2>
  <form>
    <input id="titleInput" placeholder="title" required>
    <input id="descriptionInput" placeholder="short description">
    <textarea id="mytextarea"></textarea>
    <button id="postBtn" type="button">Post note</button>
  </form>`
  
  tinymce.init({
    selector: '#mytextarea',
    setup: (editor) => {
      editor.on('change', () => {
      const contentValue = editor.getContent();
      const mytextarea = document.getElementById('mytextarea');
      mytextarea.value = contentValue;
    });
  }
});

  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');


  document.getElementById('backBtn').addEventListener('click', renderNotes)

  document.getElementById('postBtn').addEventListener('click',() => {
    let author = localStorage.getItem('username')
    let note = {
      "title": titleInput.value,
      "description": descriptionInput.value,
      "content": mytextarea.value,
      "author": author
    }

    fetch('http://localhost:3000/notes/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note)
    })
      .then(res => res.json())
      .then(data => {
        notesContainer.innerHTML = `
        <h3>The note is published!</h3>
        <button id="backBtn">Back to notes</button>`
        
        document.getElementById('backBtn').addEventListener('click', renderNotes)
      })
  })
}
