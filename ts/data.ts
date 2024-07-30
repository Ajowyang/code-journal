/* exported data */
interface dataModel {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

const data = readData();

function writeData(): void {
  const dataJSON: string = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}

function readData(): dataModel {
  const dataJsonString = localStorage.getItem('data') as string;
  if (!dataJsonString) {
    return { view: '', entries: [], editing: null, nextEntryId: 1 };
  }
  return JSON.parse(dataJsonString);
}
