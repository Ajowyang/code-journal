/* import global data */
const $urlInput = document.querySelector('#photo-URL') as HTMLInputElement;
if (!$urlInput) throw new Error('.photo-URL-input query failed!');
// querying url input
const $previewImg = document.querySelector('.preview-img') as HTMLImageElement;
if (!$previewImg) throw new Error('.preview-img query failed!');
// querying preview img
const $titleInput = document.querySelector('#title') as HTMLInputElement;
if (!$titleInput) throw new Error('#title query failed!');

const $entryForm = document.querySelector('#entry-form') as HTMLFormElement;
if (!$entryForm) throw new Error('.entryForm query failed!');
// querying entry form

$urlInput.addEventListener('input', function () {
  const inputValue: string = $urlInput.value;
  console.log(inputValue);
  $previewImg.src = inputValue;
});

$entryForm.addEventListener('submit', function (event: Event) {
  event.preventDefault();
});
