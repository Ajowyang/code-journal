'use strict';
/* import global data */
const $urlInput = document.querySelector('#photo-URL');
if (!$urlInput) throw new Error('.photo-URL-input query failed!');
// querying photo url input
const $previewImg = document.querySelector('.preview-img');
if (!$previewImg) throw new Error('.preview-img query failed!');
// querying preview img
const $titleInput = document.querySelector('#title');
if (!$titleInput) throw new Error('#title query failed!');
// query title input
const $notes = document.querySelector('#notes');
if (!$notes) throw new Error('#notes query failed!');
// query notes text area
const $entryForm = document.querySelector('#entry-form');
if (!$entryForm) throw new Error('.entryForm query failed!');
// querying entry form
$urlInput.addEventListener('input', function () {
  const inputValue = $urlInput.value;
  $previewImg.src = inputValue;
});
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // prevents the page from refreshing when the form is submitted
  const newObj = {
    title: $entryForm.title,
    photoUrl: $entryForm.photoURL,
    notes: $entryForm.notes,
    entryId: data.nextEntryId,
  };
  // stores the form's input values in a new object
  // assigns an `entryId` property to the new object, taken from the `nextEntryId` property of the data model.
  data.nextEntryId++;
  // increments the `nextEntryId` property of the data model so if another entry submitted later, it will receive diff `entryId`.
  data.entries.unshift(newObj);
  // adds the new object to the beginning of the data model's array of entries.
  writeData();
  $previewImg.setAttribute('src', '../images/placeholder-image-square.jpg');
  // resets the preview image's `src` attribute back to the placeholder image.
  $entryForm.reset();
  // resets form
});
