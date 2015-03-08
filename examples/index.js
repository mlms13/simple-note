var Notifier = require('..');
var myNotes = new Notifier({
  container: document.querySelector('#notification-area')
});

myNotes.addNote({
  type: 'warn',
  message: 'This is a warning!',
  duration: 20000
});

document.querySelector('#new-note').addEventListener("click", function () {
  myNotes.replace({
    type: 'success',
    message: 'Replaced a Note!'
  });
});
