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
  const $formElements = $entryForm.elements;
  // const newObj: Entry = {
  //   title: $titleInput.value,
  //   photoUrl: $urlInput.value,
  //   notes: $notes.value,
  //   entryId: data.nextEntryId,
  // };
  const newObj = {
    photoURL: $formElements.photoURL.value,
    title: $formElements.title.value,
    notes: $formElements.notes.value,
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
function renderEntry(entry) {
  // <li>
  //   <div class="row">
  //     <div class="column-half">
  //       <img class="list-img" src="${entry.photoUrl}">
  //     </div>
  //     <div class="column-half">
  //       <h3>${entry.title}</h3>
  //       <p>${entry.notes}</p>
  //     </div>
  //   </div>
  // </li>
  const $entryLi = document.createElement('li');
  const $rowDiv = document.createElement('div');
  $rowDiv.setAttribute('class', 'row');
  const $colHalfDiv1 = document.createElement('div');
  $colHalfDiv1.setAttribute('class', 'column-half');
  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('class', 'list-img');
  $entryImg.setAttribute('src', entry.photoURL);
  const $colHalfDiv2 = document.createElement('div');
  $colHalfDiv2.setAttribute('class', 'column-half');
  const $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.title;
  const $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $colHalfDiv1.appendChild($entryImg);
  $colHalfDiv2.appendChild($entryTitle);
  $colHalfDiv2.appendChild($entryNotes);
  $rowDiv.appendChild($colHalfDiv1);
  $rowDiv.appendChild($colHalfDiv2);
  $entryLi.appendChild($rowDiv);
  return $entryLi;
}
const $entriesList = document.querySelector('.entries-list');
if (!$entriesList) throw new Error('.entries-list query failed!');
document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    let entry = renderEntry(data.entries[i]);
    $entriesList.append(entry);
  }
});
