/**
 * Return the Value for given key from local storage
 * @param  {string} key
 */
export const getItemFromLS = (key) => {
    if (typeof window === undefined) {
      return undefined;
    }
    try {
      const value = JSON.parse(localStorage.getItem(key));
      const expires = JSON.parse(localStorage.getItem(key + "_expiresIn"));
      const currentTime = Date.now();
      if ((currentTime < Number(expires)) && value) {
        return value;
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  };
  /**
   * Update the local storage with given key and value
   * @param  {string} key
   * @param  {any} value
   */
  export const setItemInLS = (key, value) => {
    if (typeof window === undefined) {
      return;
    }
    try {
      const expires = 24 * 60 * 60 * 30;
      var now = Date.now();
      var schedule = now + expires * 1000;
      localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(key + "_expiresIn", JSON.stringify(schedule));
    } catch (e) {
      return;
    }
  };
  
  export const deleteItemFromLS = (key) => {
    if (typeof window === undefined) {
      return "";
    }
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_expiresIn`);
    } catch (e) {
      return "";
    }
  };
  