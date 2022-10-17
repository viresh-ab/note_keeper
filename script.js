(function () {
  'use strict';

  var app = {
    noteEditor: document.getElementById('note-editor'),
    noteEditorTitle: document.getElementById('note-editor-title'),
    title: document.getElementById('title'),
    tag: document.getElementById('tag'),
    message: document.getElementById('message'),
    dt: document.getElementById('dt'),
    addButton: document.getElementById('add-btn'),
    errorDisplay: document.getElementById('error'),
    deleteButton: document.querySelector('.delete'),
    editButton: document.querySelector('.edit'),
    notesSection: document.getElementById('notes-section'),
    notes: document.getElementById('notes'),
    editMode: false,

    init: function () {
      app.title.addEventListener('focus', app.clearError);
      app.tag.addEventListener('focus', app.clearError);
      app.message.addEventListener('focus', app.clearError);
      app.dt.addEventListener('focus', app.clearError);


      app.title.addEventListener('keypress', app.detectInput);
      app.tag.addEventListener('keypress', app.detectInput);
      app.message.addEventListener('keypress', app.detectInput);
      app.dt.addEventListener('keypress', app.detectInput);

      app.addButton.addEventListener('click', app.createNote);
    },
    detectInput1: function () {
      if (!app.title.value || !app.message.value || !app.tag.value || !app.dt.value) {
        return;
      } else {
        app.addButton.innerText = 'save';
      }
    },
    clearError: function () {
      app.title.classList.remove('is-empty');
      app.tag.classList.remove('is-empty');
      app.message.classList.remove('is-empty');
      app.dt.classList.remove('is-empty');
      app.errorDisplay.innerHTML = '';
    },
    createNote: function () {
      if (!app.title.value || !app.message.value || !app.tag.value || !app.dt.value) {
        if (!app.title.value) {
          app.title.classList.add('is-empty');
        }
        if (!app.message.value) {
          app.message.classList.add('is-empty');
        }
        if (!app.tag.value) {
          app.tag.classList.add('is-empty');
        }
        if (!app.dt.value) {
          app.dt.classList.add('is-empty');
        }
        app.errorDisplay.innerHTML = '<span>*Values required</span>';
        return;
      } else {
        var note = new Object();

        note.title = app.title.value;
        note.tag = app.tag.value;
        note.message = app.message.value;
        note.dt = app.dt.value;
        app.addNote(note);
      }
    },
    addNote: function (note) {
      var li = document.createElement('li'),
        deleteBtn = document.createElement('span'),
        editBtn = document.createElement('span'),
        title = document.createElement('span'),
        tag = document.createElement('span'),
        message = document.createElement('span'),
        dt = document.createElement('span'),
        footer = document.createElement('footer');

      deleteBtn.className = 'delete';
      deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
      deleteBtn.addEventListener('click', app.deleteNote);

      title.className = 'note-title';
      title.innerHTML = "Title: " + note.title;

      tag.className = 'note-tag';
      tag.innerHTML = "Tagline: " + note.tag;

      message.className = 'note-message';
      message.innerHTML = "Note: " + note.message;

      dt.className = 'note-dt';
      dt.innerHTML = "Note: " + note.dt;

      editBtn.className = 'edit';
      editBtn.innerHTML = '<i class="fa fa-pencil-square-o"></i> Edit';
      editBtn.addEventListener('click', app.editNote);

      footer.appendChild(editBtn);
      li.appendChild(deleteBtn);
      li.appendChild(title);
      li.appendChild(tag);
      li.appendChild(message);
      li.appendChild(dt);
      li.appendChild(footer);

      app.notes.prepend(li);

      app.title.value = '';
      app.tag.value = '';
      app.message.value = '';
      app.dt.value = '';

      if (!app.editMode) {
        app.addButton.innerText = 'save';
      } else {
        setTimeout(function () {
          app.addButton.innerText = 'save';
        }, 200);
      }
    },
    editNote: function () {
      var li,
        title, tag,
        message,dt,
        note = new Object();

      li = this.parentNode.parentNode;

      for (var i = 0; i < li.childNodes.length; i++) {
        if (li.childNodes[i].className === 'note-title') {
          title = li.childNodes[i].innerText;
        }
      }
      for (var i = 0; i < li.childNodes.length; i++) {
        if (li.childNodes[i].className === 'note-tag') {
          tag = li.childNodes[i].innerText;
        }
      }
      for (var i = 0; i < li.childNodes.length; i++) {
        if (li.childNodes[i].className === 'note-message') {
          message = li.childNodes[i].innerText;
        }
      }
      for (var i = 0; i < li.childNodes.length; i++) {
        if (li.childNodes[i].className === 'note-dt') {
          dt = li.childNodes[i].innerText;
        }
      }

      note.title = title;
      note.tag = tag;
      note.message = message;
      note.dt = dt;

      app.openNote(note);

      setTimeout(function () {
        li.remove();
      }, 200);
    },
    openNote: function (note) {
      if (!app.editMode) {
        app.noteEditor.classList.add('hide');
        app.notesSection.classList.add('hide');

        setTimeout(function () {
          app.noteEditorTitle.innerText = 'Edit Note';

          app.addButton.innerText = 'Update';
          app.addButton.removeEventListener('click', app.createNote);
          app.addButton.addEventListener('click', app.saveNote);

          app.title.value = note.title;
          app.tag.value = note.tag;
          app.message.value = note.message;
          app.dt.value = note.dt;
          
          app.noteEditor.classList.remove('hide');
          app.editMode = true;
        }, 200);
      } else {
        return;
      }
    },
    saveNote: function () {
      app.createNote();

      app.noteEditor.classList.add('hide');
      app.notesSection.classList.add('hide');

      setTimeout(function () {
        app.noteEditorTitle.innerText = 'save';

        app.addButton.removeEventListener('click', app.saveNote);
        app.addButton.addEventListener('click', app.createNote);

        app.title.value = '';
        app.tag.value = '';
        app.message.value = '';
        app.dt.value = '';

        app.notesSection.classList.remove('hide');
        app.noteEditor.classList.remove('hide');
        app.editMode = false;
      }, 200);
    },
    deleteNote: function () {
      this.parentNode.remove();
    }
  };

  app.init();

})();