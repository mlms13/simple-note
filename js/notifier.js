var Note = require('./note');

function Notifier(options) {
  options = options || {};
  this.container = options.container || document.body;
  this.notes = [];

  (options.notes || []).forEach(function (note) {
    this.addNote(note);
  }, this);
}

Notifier.prototype.addNote = function (noteOptions) {
  var newNote = new Note(noteOptions),
      noteIndex = this.notes.push(newNote) - 1;

  // draw the note in the container
  this.container.appendChild(newNote.draw());

  // if the note has a duration, queue up its removal
  if (newNote.duration) {
    window.setTimeout(function () {
      this.removeNote(newNote, noteIndex);
    }.bind(this), newNote.duration);
  }

  return newNote;
};

Notifier.prototype.removeNote = function (note, maxIndex) {
  maxIndex = maxIndex + 1 || this.notes.length;
  // remove from the dom
  note.erase();
  // remove from the array
  while (maxIndex--) {
    if (this.notes[maxIndex] === note) {
      this.notes.splice(maxIndex, 1);
    }
  }
};

Notifier.prototype.clear = function () {
  this.notes.forEach(function (note) {
    note.erase();
  }, this);
  this.notes = [];
};

Notifier.prototype.replace = function (newNote) {
  this.clear();
  this.addNote(newNote);
};

module.exports = Notifier;