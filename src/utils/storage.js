const AppTokenKey = "app-token";

/**
 *  returns token or null
 * @returns {String}
 */
export const getToken = () => {
  const token = localStorage.getItem(AppTokenKey);
  return token;
};

/**
 * sets new token
 * @param {String} new_token
 */
export const setToken = (new_token) => {
  if (new_token) localStorage.setItem(AppTokenKey, String(new_token));
  else localStorage.clear(AppTokenKey);
};
