import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentUser: {},
  isAuth: false,
  loading: false,
  error: null,
  diskSpace: 10737418240,
  usedSpace: 0,
};

export const signUpUser = createAsyncThunk(
  'user/singUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/registration',
        user
      );

      if (!res.statusText) {
        throw new Error('Server error!');
      }

      dispatch(setUser(res.data.user));
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      const messageError = error.response.data.message;

      return rejectWithValue(messageError);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        user
      );

      if (!res.statusText) {
        throw new Error('Server error!');
      }

      dispatch(setUser(res.data.user));
      dispatch(setUsedSpace(res.data.user.usedSpace));
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      const messageError = error.response.data.message;

      return rejectWithValue(messageError);
    }
  }
);

export const authUser = createAsyncThunk(
  'user/authUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!res.statusText) {
        throw new Error('Server error!');
      }
      dispatch(setUser(res.data.user));
      dispatch(setUsedSpace(res.data.user.usedSpace));
    } catch (error) {
      const messageError = error.response.data.message;
      localStorage.removeItem('token');
      return rejectWithValue(messageError);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    },
    logOutUser: (state) => {
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        currentUser: {},
      };
    },
    setUsedSpace: (state, action) => {
      state.usedSpace = action.payload;
    },
    incUsedSpace: (state, action) => {
      state.usedSpace += action.payload;
    },
    decUsedSpace: (state, action) => {
      state.usedSpace -= action.payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
    },

    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      if (!state.error) {
        state.error = 'Server Error!';
      }
    },
    [signUpUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.loading = false;
    },

    [signUpUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      if (!state.error) {
        state.error = 'Server Error!';
      }
    },
  },
});

export const { setUser, logOutUser, setUsedSpace, incUsedSpace, decUsedSpace } =
  userSlice.actions;
export default userSlice.reducer;
