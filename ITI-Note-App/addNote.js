var addBtn = document.getElementById('add');
var title = document.getElementById('title');
var desc = document.getElementById('desc');
var date = document.getElementById('date');
var errorMsg = document.querySelectorAll('span');

// Making the date equal to today
var today = new Date();
const formattedDate = today.toISOString().split('T')[0];
date.value = formattedDate;

addBtn.addEventListener('click', (e) => {
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

  xhr.open('POST', 'http://localhost:3000/notes');
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
      console.log('Response: ', xhr.responseText);
      window.close();
    }
  });

  xhr.send(data);
  //!validation
});
