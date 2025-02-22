// * Get all notes

var allNotes;
var notes = document.getElementById('notes');
var notesHTML;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/notes');

xhr.addEventListener('readystatechange', () => {
  displayNotes(xhr, () => {
    editNotes();
    deleteNotes();
  });
});

xhr.send();

function displayNotes(xhr, callback) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    allNotes = JSON.parse(xhr.response);
    notesHTML = '';
    for (var i = 0; i < allNotes.length; i++) {
      notesHTML += `<div>
          <span>${allNotes[i].title}</span>
          <span>${allNotes[i].modifiedAt}</span>
          <p>${allNotes[i].description}</p>
          <span class="options">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
          </span>
        </div>`;
    }
    notes.innerHTML = notesHTML;
    callback();
  }
}

// * Adding Note

var addNewNote = document.getElementById('addNewNote');

addNewNote.addEventListener('click', () => {
  window.open(
    './addNote.html',
    '',
    'width=450,height=450,screenX=750,screenY=300'
  );
});

// * Editing notes

function editNotes() {
  var editBtns = document.querySelectorAll('.fa-pen-to-square');
  editBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      sessionStorage.setItem('noteData', JSON.stringify(allNotes[index]));
      window.open(
        './editNote.html',
        '',
        'width=450,height=450,screenX=750,screenY=300'
      );
    });
  });
}

// * Deleting notes

function deleteNotes() {
  var delBtns = document.querySelectorAll('.fa-trash');
  delBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      var dxhr = new XMLHttpRequest();
      dxhr.open('DELETE', `http://localhost:3000/notes/${allNotes[index].id}`);
      dxhr.addEventListener('readystatechange', () => {
        if (dxhr.readyState == 4 && dxhr.status == 200) {
          console.log('Deleted: ', dxhr.responseText);
        }
      });
      dxhr.send();
    });
  });
}
