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
          <p>description:</p>
          <input type="text" value="${data.description}">
          <textarea id="mytextarea">${data.content}</textarea>
          <button id="saveBtn">save changes</button>
          `;

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
        }
      })
    })
}