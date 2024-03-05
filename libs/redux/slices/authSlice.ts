import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  access_token: null,
  refresh_token: null,
  id: null,
  avatar: null,
  first_name: null,
  last_name: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.id = action.payload.id;
      state.avatar = action.payload.avatar;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.access_token = null;
      state.refresh_token = null;
      state.id = null;
      state.avatar = null;
      state.first_name = null;
      state.last_name = null;
      state.isAuthenticated = false;
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
