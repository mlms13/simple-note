var Notifier = require('..');
var myNotes = new Notifier();

myNotes.addNote({
  type: 'warn',
  message: 'This is a warning!',
  duration: 20000
});