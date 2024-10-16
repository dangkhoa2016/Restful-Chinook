
const getLocalStorageItem = (key) => {
  const str = localStorage.getItem(key);
  // console.log(`getLocalStorageItem raw ${key}`, str);

  if (!str)
    return null;

  try {
    return JSON.parse(str);
  } catch (e) {
    // console.log(`Error parsing ${key} from localStorage`, e);
    return null;
  }
};

const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value ? JSON.stringify(value) : '');
};


export {
  getLocalStorageItem,
  setLocalStorageItem
}
