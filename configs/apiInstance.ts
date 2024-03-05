import axios from 'axios';
import store from '../libs/redux/store';

const apiInstance = axios.create({
  baseURL: 'http://192.168.1.4:5000/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const apiInstanceRefresh = axios.create({
  baseURL: 'http://192.168.1.4:5000/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiInstance.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const token = state.auth.access_token;
    if (token != null && token != '' && token != undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry &&
      error.response.data.message === 'JWT token is expired'
    ) {
      console.log('Attempting token refresh...');
      error.config._retry = true;
      const state = store.getState();
      const refreshToken = state.auth.refresh_token;
      const data = {
        refreshToken: refreshToken,
      };
      const jsonString = JSON.stringify(data);
      return await apiInstanceRefresh
        .post('/auth/refresh_token', jsonString)
        .then(res => {
          if (res.status === 200) {
            store.dispatch({
              type: 'auth/login',
              payload: {
                accessToken: res.data.access_token,
                refreshToken: res.data.refresh_token,
              },
            });
            console.log('Access token refreshed!');
            return apiInstance.request(error.config);
          }
        })
        .catch(err => {
          console.log('Refresh token failed!');
          store.dispatch({
            type: 'auth/logout',
          });
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
