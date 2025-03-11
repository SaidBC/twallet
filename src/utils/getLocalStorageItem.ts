export default function getLocalStorageItem(item: string) {
  const stateString = window.localStorage.getItem(item);
  const state = stateString !== null ? JSON.parse(stateString) : null;
  return state;
}
