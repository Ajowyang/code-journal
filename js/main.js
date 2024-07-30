'use strict';
/* global data */
let $urlInput = document.querySelector('#photo-URL');
if (!$urlInput) throw new Error('.photo-URL-input query failed!');
//querying url input
let $previewImg = document.querySelector('.preview-img');
if (!$previewImg) throw new Error('.preview-img query failed!');
//querying preview img
let $titleInput = document.querySelector('#title');
if (!$titleInput) throw new Error('#title query failed!');
let $entryForm = document.querySelector('#entry-form');
if (!$entryForm) throw new Error('.entryForm query failed!');
//querying entry form
$urlInput.addEventListener('input', function (event) {
  const inputValue = $urlInput.value;
  console.log(inputValue);
  $previewImg.src = inputValue;
});
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
});
