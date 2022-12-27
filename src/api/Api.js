import axios from 'axios';

export const BASE_URL = 'http://localhost:5159/api/v1/';

export const ENDPOINTS = {
  login: 'UsersAuth/login',
  getAllVilla: 'VillaAPI',
  getAllVillaNumber: 'VillaNumberAPI',
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint + '/';

  let token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ` + token,
    },
  };

  return {
    fetch: () => axios.get(url, { ...defaultOptions }),
    fetchById: (id) => axios.get(url + id, { ...defaultOptions }),
    post: (newRecord) => axios.post(url, newRecord, { ...defaultOptions }),
    put: (id, updatedRecord) =>
      axios.put(url + id, updatedRecord, { ...defaultOptions }),
    delete: (id) => axios.delete(url + id, { ...defaultOptions }),
  };
};
