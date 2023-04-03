import { renderNotes } from "./showNotes.js";

let notesContainer = document.getElementById('notes');

export function addNote(){
  notesContainer.innerHTML = `
  <button id='backBtn'>Back to notes</button>
  <h2>Add a note</h2>`

  document.getElementById('backBtn').addEventListener('click', renderNotes)
}