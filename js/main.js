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
  const newObj = {
    photoURL: $formElements.photoURL.value,
    title: $formElements.title.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  // stores the form's input values in a new object
  // assigns an `entryId` property to the new object, taken from the `nextEntryId` property of the data model.
  if (data.editing === null) {
    data.nextEntryId++;
    // increments the `nextEntryId` property of the data model so if another entry submitted later, it will receive diff `entryId`.
    data.entries.unshift(newObj);
    // adds the new object to the beginning of the data model's array of entries.
    const renderedEntry = renderEntry(newObj);
    $entriesList.prepend(renderedEntry);
    toggleNoEntries();
    $previewImg.setAttribute('src', '../images/placeholder-image-square.jpg');
    // resets the preview image's `src` attribute back to the placeholder image.
  } else {
    newObj.entryId = data.editing.entryId;
    // Assign the entry id value from `data.editing` to the new object with the updated form values.
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = newObj;
      }
    }
    // Replace the original object in the `data.entries` array for the edited entry with the new object with the edited data.
    const $listItemToReplace = document.querySelector(
      `li[data-entry-id="${data.editing.entryId}"]`,
    );
    if (!$listItemToReplace)
      throw new Error(
        `<li[data-entry-id=${data.editing.entryId}] query failed!`,
      );
    const renderedEntry = renderEntry(newObj);
    $listItemToReplace.replaceWith(renderedEntry);
    $entryFormTitle.textContent = 'New Entry';
    data.editing = null;
    $deleteButton.classList.add('visibility-hidden');
  }
  writeData();
  viewSwap('entries');
  $entryForm.reset();
});
function renderEntry(entry) {
  // <li>
  //   <div class="row">
  //     <div class="column-half">
  //       <img class="list-img" src="${entry.photoUrl}">
  //     </div>
  //     <div class="column-half">
  //       <div class="row justify-space-between align-center">
  //        <h3>${entry.title}</h3>
  //        <i class="fa-solid fa-pencil"></i
  //       </div>
  //       <p>${entry.notes}</p>
  //     </div>
  //   </div>
  // </li>
  const $entryLi = document.createElement('li');
  $entryLi.setAttribute('data-entry-id', entry.entryId.toString());
  const $rowDiv = document.createElement('div');
  $rowDiv.setAttribute('class', 'row');
  const $colHalfDiv1 = document.createElement('div');
  $colHalfDiv1.setAttribute('class', 'column-half');
  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('class', 'list-img');
  $entryImg.setAttribute('src', entry.photoURL);
  const $colHalfDiv2 = document.createElement('div');
  $colHalfDiv2.setAttribute('class', 'column-half');
  const $titleRow = document.createElement('div');
  $titleRow.classList.add('row', 'justify-space-between', 'align-center');
  const $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.title;
  const $pencil = document.createElement('i');
  $pencil.classList.add('fa-solid', 'fa-pencil');
  const $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $colHalfDiv1.appendChild($entryImg);
  $titleRow.appendChild($entryTitle);
  $titleRow.appendChild($pencil);
  $colHalfDiv2.appendChild($titleRow);
  $colHalfDiv2.appendChild($entryNotes);
  $rowDiv.appendChild($colHalfDiv1);
  $rowDiv.appendChild($colHalfDiv2);
  $entryLi.appendChild($rowDiv);
  return $entryLi;
}
const $entriesList = document.querySelector('.entries-list');
if (!$entriesList) throw new Error('.entries-list query failed!');
document.addEventListener('DOMContentLoaded', function () {
  if (data.view === 'entries') {
    viewSwap('entries');
  } else if (data.view === 'entry-form') {
    viewSwap('entry-form');
  }
  for (let i = 0; i < data.entries.length; i++) {
    const entry = renderEntry(data.entries[i]);
    $entriesList.append(entry);
  }
  toggleNoEntries();
});
const $noEntriesMessage = document.querySelector('.no-entries-message');
if (!$noEntriesMessage) throw new Error('.no-entries-message query failed!');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntriesMessage.classList.add('hidden');
  } else {
    $noEntriesMessage.classList.remove('hidden');
  }
}
const $entryFormView = document.querySelector('.entry-form-view');
if (!$entryFormView) throw new Error('.entry-form-view query failed!');
const $entriesView = document.querySelector('.entries-view');
if (!$entriesView) throw new Error('entries-view query failed!');
function viewSwap(viewName) {
  data.view = viewName;
  if (viewName === 'entries') {
    $entryFormView.classList.add('hidden');
    $entriesView.classList.remove('hidden');
  } else if (viewName === 'entry-form') {
    $entriesView.classList.add('hidden');
    $entryFormView.classList.remove('hidden');
  }
}
const $viewSwapAnchor = document.querySelector('.view-swap-anchor');
if (!$viewSwapAnchor) throw new Error('.view-swap-anchor query failed!');
$viewSwapAnchor.addEventListener('click', function () {
  viewSwap('entries');
  toggleNoEntries();
  writeData();
});
const $newEntryAnchor = document.querySelector('.new-entry-anchor');
if (!$newEntryAnchor) throw new Error('.new-entry-anchor query failed!');
$newEntryAnchor.addEventListener('click', function () {
  $deleteButton.classList.add('visibility-hidden');
  viewSwap('entry-form');
  $entryFormTitle.textContent = 'New Entry';
  $urlInput.value = '';
  $titleInput.value = '';
  $previewImg.setAttribute('src', '../images/placeholder-image-square.jpg');
  $notes.value = '';
  data.editing = null;
  writeData();
});
const $entryFormTitle = document.querySelector('.entry-form-title');
if (!$entryFormTitle) throw new Error('.entry-form-title query failed!');
$entriesList.addEventListener('click', function (event) {
  const eventTarget = event.target;
  if (!(eventTarget.tagName === 'I')) {
    return;
  }
  viewSwap('entry-form');
  $deleteButton.classList.remove('visibility-hidden');
  const closestListItem = eventTarget.closest('li');
  for (let i = 0; i < data.entries.length; i++) {
    if (
      data.entries[i].entryId.toString() ===
      closestListItem.getAttribute('data-entry-id')
    ) {
      data.editing = data.entries[i];
    }
  }
  writeData();
  if (data.editing) {
    $entryFormTitle.textContent = 'Edit Entry';
    $titleInput.value = data.editing.title;
    $previewImg.setAttribute('src', data.editing.photoURL);
    $urlInput.value = data.editing.photoURL;
    $notes.value = data.editing.notes;
  }
});
const $deleteButton = document.querySelector('.delete-button');
if (!$deleteButton) throw new Error('.delete-button query failed!');
const $modal = document.querySelector('dialog');
if (!$modal) throw new Error('dialog query failed!');
const $dismissModal = document.querySelector('.dismiss-modal');
if (!$dismissModal) throw new Error('.dismiss-modal query failed!');
const $confirmDelete = document.querySelector('.confirm-delete');
if (!$confirmDelete) throw new Error('.confirm-delete query failed!');
$deleteButton.addEventListener('click', function () {
  $modal.showModal();
});
$dismissModal.addEventListener('click', function (event) {
  $modal.close();
});
$confirmDelete.addEventListener('click', function () {
  if (data.editing) {
    const $listItemToDelete = document.querySelector(
      `li[data-entry-id="${data.editing.entryId}"]`,
    );
    for (let i = 0; i < data.entries.length; i++) {
      if (
        $listItemToDelete.getAttribute('data-entry-id') ===
        data.entries[i].entryId.toString()
      ) {
        data.entries.splice(i, 1);
      }
    }
    $listItemToDelete.remove();
    toggleNoEntries();
    $modal.close();
    viewSwap('entries');
  }
});
