# Super Duper Easy Notifications

Have you ever wanted to add a simple notification system to your web app? Of course you have. And you probably did, with very little code. But could your notification system handle queueing and replacing existing notifications? Well neither can this one.

### Installation

This module is intended to be installed with npm and bundled into your app with Browserify.

```js
npm install --save simple-note
```

### Usage

Your notification system is made up of two parts: the notifier and the actual notes. Mostly, you'll interact with the notifier, passing it data that will create the individual notes.

Let's assume you've required the module thusly:

```js
var Notifier = require('simple-note');
```

Create a new notification area:

```js
// all options passed to Notifier are optional
var notifications = new Notifier({
  // element that notes will be appended to, defaults to document.body
  container: document.querySelector('#my-notification-area'),

  // an array of initial notes to be shown, see below for note options
  notes: [{/* note options */}]
});
```

Once you've created a notification area, you can add notes, remove notes, and clear all notes.

```js
// add a new note to the notification area
var myFirstNote = notifications.addNote(/* note options */);

// remove a single note
notifications.removeNote(myFirstNote);

// or you could have cleared all notes
notifications.clear();
```

Whenever you want to pass note options to the notification area, they should looks something like this:

```js
{
  message: "This is your notification text.",
  type: "info", // will be used in the class name
  duration: 4000 // optional time in milliseconds before the note is auto-removed
}
```
