import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  files: [],
  currentDir: null,
};

export const getFiles = createAsyncThunk(
  'file/getFiles',
  async (dirId, { rejectWithValue, dispatch }) => {
    try {
      const token = `Bearer ${localStorage.getItem('token')}`;

      const res = await axios.get(
        `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`,
        {
          headers: { Authorization: token },
        }
      );

      dispatch(setFiles(res.data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      return { ...state, files: action.payload };
    },
    setCurrentDir: (state, action) => {
      return { ...state, currentDir: action.payload };
    },
  },
  extraReducers: {
    [getFiles.pending]: (state) => {
      console.log('pending');
    },
    [getFiles.fulfilled]: (state, action) => {
      console.log('fulfilled');
    },

    [getFiles.rejected]: (state, action) => {
      console.log('rejected');
    },
  },
});

export const { setFiles, setCurrentDir } = fileSlice.actions;
export default fileSlice.reducer;
