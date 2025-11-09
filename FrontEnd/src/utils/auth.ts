export const setToken = (tokenname: string, token: string) => {
  localStorage.setItem(tokenname, token);
};

export const getToken = (tokenname: string) => {
  return localStorage.getItem(tokenname);
};

export const removeToken = (tokenname: string) => {
  localStorage.removeItem(tokenname);
};
