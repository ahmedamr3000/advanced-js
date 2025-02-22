var saveBtn = document.getElementById('save');
var title = document.getElementById('title');
var desc = document.getElementById('desc');
var date = document.getElementById('date');
var noteData = JSON.parse(sessionStorage.getItem('noteData'));
var errorMsg = document.querySelectorAll('span');
title.value = noteData.title;
desc.value = noteData.description;
date.value = noteData.modifiedAt;

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  var xhr = new XMLHttpRequest();

  var titleRegex = /^[a-zA-Z]{6,}/;
  var descRegex = /^.{20,}/;

  if (!titleRegex.test(title.value)) {
    errorMsg[0].style.opacity = 1;
    return;
  }
  errorMsg[0].style.opacity = 0;

  if (!descRegex.test(desc.value)) {
    errorMsg[1].style.opacity = 1;
    return;
  }
  errorMsg[1].style.opacity = 0;

  var data = JSON.stringify({
    title: title.value,
    description: desc.value,
    modifiedAt: date.value,
  });

  xhr.open('PUT', `http://localhost:3000/notes/${noteData.id}`);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('Response: ', xhr.responseText);
      window.close();
    }
  });

  xhr.send(data);
  //!validation
});
