/**
 * Get random element from array
 * @param {Array} array 
 */
export const randomElement = array =>
  array[Math.floor(Math.random() * (array.length - 1))];

/**
 * Local storage read/store
 * @param {string} key 
 */
export const storage = key => ({
  save(data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log('Error saving data...');
    }
  },
  load() {
    try {
      return JSON.parse(localStorage.getItem(key)) || undefined;
    } catch (err) {
      return undefined;
    }
  },
});
