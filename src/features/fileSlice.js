import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { decUsedSpace, incUsedSpace } from './userSlice';

const initialState = {
  files: [],
  currentDir: null,
  currentDirName: null,
  currentFile: null,
  path: [],
  popupDisplay: 'none',
  popupGenDisplay: 'none',
  dirStack: [],
  loading: false,
  uploadLength: null,
  uploadFiles: [],
  delLoading: false,
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
            const totalLength = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            dispatch(setUploadLength(totalLength));
          },
        }
      );
      dispatch(incUsedSpace(res.data.size));
      dispatch(addFile(res.data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fileDelete = createAsyncThunk(
  'file/fileDelete',
  async (file, { rejectWithValue, dispatch }) => {
    try {
      const token = `Bearer ${localStorage.getItem('token')}`;

      await axios.delete(
        `http://localhost:5000/api/files?id=${file._id}`,

        {
          headers: { Authorization: token },
        }
      );

      dispatch(deleteFile(file._id));
      dispatch(decUsedSpace(file.size));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fileDownload = createAsyncThunk(
  'file/fileDownload',
  async (file, { rejectWithValue, dispatch }) => {
    try {
      const token = `Bearer ${localStorage.getItem('token')}`;

      const res = await fetch(
        `http://localhost:5000/api/files/download?id=${file._id}`,

        {
          headers: { Authorization: token },
        }
      );

      if (res.status === 200) {
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
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
    setCurrentFile: (state, action) => {
      return { ...state, currentFile: action.payload };
    },
    setCurrentDirName: (state, action) => {
      return { ...state, currentDirName: action.payload };
    },
    addFile: (state, action) => {
      return { ...state, files: [...state.files, action.payload] };
    },
    setPath: (state, action) => {
      return { ...state, path: [...state.path, action.payload] };
    },
    delPath: (state) => {
      state.path = state.path.slice(0, -1);
    },
    popupVis: (state, action) => {
      return { ...state, popupDisplay: action.payload };
    },
    popupGenVis: (state, action) => {
      return { ...state, popupGenDisplay: action.payload };
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
    deleteFile: (state, action) => {
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    },
    setUploadLength: (state, action) => {
      return {
        ...state,
        uploadLength: action.payload,
      };
    },
    setUploadFiles: (state, action) => {
      return {
        ...state,
        uploadFiles: [...state.uploadFiles, ...action.payload],
      };
    },
  },
  extraReducers: {
    [getFiles.pending]: (state) => {
      state.loading = true;
    },
    [getFiles.fulfilled]: (state) => {
      state.loading = false;
    },

    [getFiles.rejected]: (state) => {
      state.loading = false;
    },
    [fileUpload.pending]: (state) => {
      state.uploadFiles = [];
      console.log('pending');
    },
    [fileUpload.fulfilled]: (state) => {
      state.uploadLength = null;
    },

    [fileDelete.pending]: (state) => {
      state.delLoading = true;
    },
    [fileDelete.fulfilled]: (state) => {
      state.delLoading = false;
    },
  },
});

export const {
  setFiles,
  setCurrentDir,
  setCurrentFile,
  setCurrentDirName,
  addFile,
  popupVis,
  popupGenVis,
  pushDirStack,
  popDirStack,
  deleteFile,
  setUploadLength,
  setUploadFiles,
  setPath,
  delPath,
} = fileSlice.actions;
export default fileSlice.reducer;
