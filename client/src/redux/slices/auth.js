import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanse } from '../../axios';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (params) => {
    const { data } = await instanse.post('/auth/login', params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await instanse.post('/auth/register', params);
  return data;
});

export const fetchAuthUser = createAsyncThunk('auth/fetchAuthUser', async () => {
  const { data } = await instanse.get('/auth/user');
  return data;
});



const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchAuthUser.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthUser.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
