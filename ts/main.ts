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
  photoUrl: string;
  notes: string;
  entryId: number;
}

interface FormElements extends HTMLCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

$entryForm.addEventListener('submit', function (event: Event) {
  event.preventDefault();
  // prevents the page from refreshing when the form is submitted
  const $formElements = $entryForm.elements as FormElements;

  // const newObj: Entry = {
  //   title: $titleInput.value,
  //   photoUrl: $urlInput.value,
  //   notes: $notes.value,
  //   entryId: data.nextEntryId,
  // };

  const newObj: Entry = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
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
