/* exported data */
interface dataModel {
  view: string;
  entries: Entry[];
  editing?: null;
  nextEntryId: number;
}

const data: dataModel = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
