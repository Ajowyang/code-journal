/* import global data */

const $urlInput = document.querySelector('#photo-URL') as HTMLInputElement;
if (!$urlInput) throw new Error('.photo-URL-input query failed!');
// querying photo url input
const $previewImg = document.querySelector('.preview-img') as HTMLImageElement;
if (!$previewImg) throw new Error('.preview-img query failed!');
// querying preview img
const $titleInput = document.querySelector('#title') as HTMLInputElement;
if (!$titleInput) throw new Error('#title query failed!');
// query title input
const $notes = document.querySelector('#notes') as HTMLTextAreaElement;
if (!$notes) throw new Error('#notes query failed!');
// query notes text area

const $entryForm = document.querySelector('#entry-form') as HTMLFormElement;
if (!$entryForm) throw new Error('.entryForm query failed!');
// querying entry form

$urlInput.addEventListener('input', function () {
  const inputValue: string = $urlInput.value;
  $previewImg.src = inputValue;
});

interface Entry {
  title: string;
  photoURL: string;
  notes: string;
  entryId: number;
}

interface FormElements extends HTMLCollection {
  title: HTMLInputElement;
  photoURL: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

$entryForm.addEventListener('submit', function (event: Event) {
  event.preventDefault();
  // prevents the page from refreshing when the form is submitted
  const $formElements = $entryForm.elements as FormElements;
  const newObj: Entry = {
    photoURL: $formElements.photoURL.value,
    title: $formElements.title.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  if (data.editing === null) {
    // stores the form's input values in a new object
    // assigns an `entryId` property to the new object, taken from the `nextEntryId` property of the data model.
    data.nextEntryId++;
    // increments the `nextEntryId` property of the data model so if another entry submitted later, it will receive diff `entryId`.
    data.entries.unshift(newObj);
    // adds the new object to the beginning of the data model's array of entries.
    writeData();
    const renderedEntry = renderEntry(newObj);
    $entriesList.prepend(renderedEntry);
    viewSwap('entries');
    toggleNoEntries();
    $previewImg.setAttribute('src', '../images/placeholder-image-square.jpg');
    // resets the preview image's `src` attribute back to the placeholder image.
    $entryForm.reset();
    // resets form
  } else {
    newObj.entryId = data.editing.entryId;
    // Assign the entry id value from `data.editing` to the new object with the updated form values.
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = newObj;
      }
    }

    // Replace the original object in the `data.entries` array for the edited entry with the new object with the edited data.
    let $listItemToReplace = document.querySelector(
      `li[data-entry-id="${data.editing.entryId}"]`,
    );
    if (!$listItemToReplace)
      throw new Error(
        `<li[data-entry-id=${data.editing.entryId}] query failed!`,
      );
    const renderedEntry = renderEntry(newObj);
    $listItemToReplace = renderedEntry;
    viewSwap('entries');
    $entryFormTitle.textContent = 'New Entry';
    data.editing = null;
    writeData();
    $entryForm.reset();
    // resets form
  }
});

function renderEntry(entry: Entry): HTMLElement {
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

const $entriesList = document.querySelector(
  '.entries-list',
) as HTMLUListElement;
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

const $noEntriesMessage = document.querySelector(
  '.no-entries-message',
) as HTMLHeadingElement;
if (!$noEntriesMessage) throw new Error('.no-entries-message query failed!');

function toggleNoEntries(): void {
  if (data.entries.length > 0) {
    $noEntriesMessage.classList.add('hidden');
  } else {
    $noEntriesMessage.classList.remove('hidden');
  }
}

const $entryFormView = document.querySelector(
  '.entry-form-view',
) as HTMLDivElement;
if (!$entryFormView) throw new Error('.entry-form-view query failed!');
const $entriesView = document.querySelector('.entries-view') as HTMLDivElement;
if (!$entriesView) throw new Error('entries-view query failed!');

function viewSwap(viewName: string): void {
  data.view = viewName;
  if (viewName === 'entries') {
    $entryFormView.classList.add('hidden');
    $entriesView.classList.remove('hidden');
  } else if (viewName === 'entry-form') {
    $entriesView.classList.add('hidden');
    $entryFormView.classList.remove('hidden');
  }
}

const $viewSwapAnchor = document.querySelector(
  '.view-swap-anchor',
) as HTMLAnchorElement;
if (!$viewSwapAnchor) throw new Error('.view-swap-anchor query failed!');
$viewSwapAnchor.addEventListener('click', function (): void {
  viewSwap('entries');

  toggleNoEntries();

  writeData();
});

const $newEntryAnchor = document.querySelector('.new-entry-anchor');
if (!$newEntryAnchor) throw new Error('.new-entry-anchor query failed!');
$newEntryAnchor.addEventListener('click', function () {
  viewSwap('entry-form');
  $entryFormTitle.textContent = 'New Entry';
  $urlInput.value = '';
  $titleInput.value = '';
  $previewImg.setAttribute('src', '../images/placeholder-image-square.jpg');
  $notes.value = '';
  data.editing = null;
  writeData();
});

const $entryFormTitle = document.querySelector(
  '.entry-form-title',
) as HTMLHeadingElement;
if (!$entryFormTitle) throw new Error('.entry-form-title query failed!');

$entriesList.addEventListener('click', function (event: Event) {
  const eventTarget = event.target as HTMLElement;
  console.log('eventTarget:', eventTarget);
  console.log('eventTarget.tagName:', eventTarget.tagName);
  if (eventTarget.tagName === 'I') {
    viewSwap('entry-form');
    const closestListItem = eventTarget.closest('li') as HTMLElement;
    console.log(closestListItem);
    console.log(closestListItem.getAttribute('data-entry-id'));
    for (let i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryId.toString() ===
        closestListItem.getAttribute('data-entry-id')
      ) {
        data.editing = data.entries[i];
      }
    }
    console.log(data.editing);
    if (data.editing) {
      $entryFormTitle.textContent = 'Edit Entry';
      $titleInput.value = data.editing.title;
      $previewImg.setAttribute('src', data.editing.photoURL);
      $urlInput.value = data.editing.photoURL;
      $notes.value = data.editing.notes;
    }
  }
});
