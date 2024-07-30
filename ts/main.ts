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
  console.log(inputValue);
  $previewImg.src = inputValue;
});

interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

$entryForm.addEventListener('submit', function (event: Event) {
  event.preventDefault();
  const newObj: Entry = {
    title: $titleInput.value,
    photoUrl: $urlInput.value,
    notes: $notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(newObj);
  console.log(newObj);

  $previewImg.setAttribute('src', '../images/placeholder-image-square.jpg');
  $entryForm.reset();
});
