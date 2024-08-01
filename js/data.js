'use strict';
const data = readData();
function writeData() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}
function readData() {
  const dataJsonString = localStorage.getItem('data');
  if (!dataJsonString) {
    return { view: 'entry-form', entries: [], editing: null, nextEntryId: 1 };
  }
  return JSON.parse(dataJsonString);
}
