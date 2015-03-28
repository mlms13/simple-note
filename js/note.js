function Note(options) {
  this.type = options.type || "info";
  this.duration = options.duration;
  this.message = options.message;
}

var namespace = 'http://www.w3.org/2000/svg';

function makePath(cls) {
  var path = document.createElementNS(namespace,"path");
  path.setAttribute('d', 'M 20, 20 m 0, -17 a 17, 17 0 1,1 0,34 a 17,-17 0 1,1 0,-34');
  path.setAttribute('fill', 'none');
  path.classList.add(cls);
  return path;
}

function createSpinner(parent, time) {
  var svg = document.createElementNS(namespace, "svg"),
      bg = svg.appendChild(document.createElementNS(namespace, 'g')),
      spinner = svg.appendChild(document.createElementNS(namespace, 'g')),
      bgPath = bg.appendChild(makePath('sn-loading__bg')),
      spinnerPath = spinner.appendChild(makePath('sn-loading__spin')),
      pathLength = bgPath.getTotalLength();

  svg.classList.add("sn-loading");
  parent.appendChild(svg);

  if (time) {
    spinnerPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    spinnerPath.style.strokeDashoffset = pathLength;
    spinnerPath.getBoundingClientRect();

    // transition it
    spinnerPath.style.transitionDuration = (time || 2) + 's';
    spinnerPath.style.strokeDashoffset = '0';
  } else {
    // set the class so it animates
    spinnerPath.classList.add('infinite');
    spinnerPath.style.strokeDasharray = pathLength / 4 + ' ' + pathLength / 4;
  }
}

Note.prototype.draw = function () {
  var div = document.createElement('div'),
      span = document.createElement('span'),
      spinner = createSpinner(div);

  span.appendChild(document.createTextNode(this.message));
  span.className = 'sn-note-message';

  div.appendChild(span);
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
