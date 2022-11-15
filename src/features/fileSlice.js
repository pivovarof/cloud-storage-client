import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  files: [],
  currentDir: null,
  currentDirName: null,
  popupDisplay: 'none',
  dirStack: [],
  loading: false,
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

export const createDir = createAsyncThunk(
  'file/createDir',
  async ({ dirId, name }, { rejectWithValue, dispatch }) => {
    try {
      const token = `Bearer ${localStorage.getItem('token')}`;

      const res = await axios.post(
        'http://localhost:5000/api/files',
        {
          name,
          parent: dirId,
          type: 'dir',
        },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(addFile(res.data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const fileUpload = createAsyncThunk(
  'file/fileUpload',
  async ({ file, dirId }, { rejectWithValue, dispatch }) => {
    try {
      const token = `Bearer ${localStorage.getItem('token')}`;
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
        formData.append('parent', dirId);
      }
      const res = await axios.post(
        'http://localhost:5000/api/files/upload',
        formData,

        {
          headers: { Authorization: token },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length'
                );

            // const totalLength = progressEvent.lengthComputable
            //   ? progressEvent.total
            //   : progressEvent.target.getResponseHeader('content-length') ||
            //     progressEvent.target.getResponseHeader(
            //       'x-decompressed-content-length'
            //     );
            console.log('total');
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              console.log(progress);
            }
          },
        }
      );
      dispatch(addFile(res.data));
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
    setCurrentDirName: (state, action) => {
      return { ...state, currentDirName: action.payload };
    },
    addFile: (state, action) => {
      return { ...state, files: [...state.files, action.payload] };
    },
    popupVis: (state, action) => {
      return { ...state, popupDisplay: action.payload };
    },
    pushDirStack: (state, action) => {
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    },
    popDirStack: (state, action) => {
      return {
        ...state,
        dirStack: [...state.dirStack.slice(0, -1)],
      };
    },
  },
  extraReducers: {
    [getFiles.pending]: (state) => {
      state.loading = true;
    },
    [getFiles.fulfilled]: (state, action) => {
      state.loading = false;
    },

    [getFiles.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  setFiles,
  setCurrentDir,
  setCurrentDirName,
  addFile,
  popupVis,
  pushDirStack,
  popDirStack,
} = fileSlice.actions;
export default fileSlice.reducer;
