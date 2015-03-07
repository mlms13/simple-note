function Note(options) {
  this.type = options.type || "info";
  this.duration = options.duration;
  this.message = options.message;
}

function createSpinner () {
  var spinner = document.createElement('div');
  spinner.className = 'sn-spinner sn-spinner-infinite';
  return spinner;
}

Note.prototype.draw = function () {
  var div = document.createElement('div'),
      span = document.createElement('span'),
      spinner = createSpinner();

  span.appendChild(document.createTextNode(this.message));
  span.className = 'sn-note-message';

  div.appendChild(span);
  div.appendChild(spinner);
  div.className = 'sn-note sn-note-' + this.type;

  this.el = div;
  return this.el;
};

Note.prototype.erase = function () {
  if (this.el && this.el.parentNode) {
    this.el.parentNode.removeChild(this.el);
  }
};

module.exports = Note;
