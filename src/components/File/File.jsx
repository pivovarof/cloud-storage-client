import { ImFolderOpen } from 'react-icons/im';
import { AiFillFileText } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import style from './File.module.css';
import {
  setCurrentDir,
  setCurrentDirName,
  pushDirStack,
  fileDownload,
  setCurrentFile,
  popupGenVis,
} from '../../features/fileSlice';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);

  const openDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(pushDirStack(currentDir));
      dispatch(setCurrentDir(file._id));

      dispatch(setCurrentDirName(file.name));
    }
  };

  const downloadFileHandler = (e) => {
    e.stopPropagation();
    dispatch(fileDownload(file));
  };

  const deleteFileHandler = (e) => {
    e.stopPropagation();
    dispatch(popupGenVis('flex'));
    dispatch(setCurrentFile(file));
  };

  const formatSize = (size) => {
    if (size > 1024 * 1024 * 1024) {
      return (size / (1024 * 1024 * 1024)).toFixed(1) + 'GB';
    }
    if (size > 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(1) + 'MB';
    }
    if (size > 1024) {
      return (size / 1024).toFixed(1) + 'KB';
    }
    return size + 'B';
  };

  return (
    <div className={style.fileList} onClick={() => openDirHandler(file)}>
      <div className={`${style.file} ${style.colum}`}>
        {file.type === 'dir' ? <ImFolderOpen /> : <AiFillFileText />}
      </div>
      <div className={`${style.name} ${style.colum}`}>{file.name}</div>
      <div className={`${style.date} ${style.colum}`}>
        {file.date.slice(0, 10)}
      </div>
      <div className={`${style.size} ${style.colum}`}>
        {formatSize(file.size)}
      </div>
      {file.type !== 'dir' ? (
        <div className={`${style.buttons} ${style.colum}`}>
          <FaDownload
            className={`${style.btn} ${style.download}`}
            onClick={(e) => downloadFileHandler(e)}
          />
          <RiDeleteBin2Fill
            className={`${style.btn} ${style.delete}`}
            onClick={(e) => deleteFileHandler(e)}
          />
        </div>
      ) : (
        <div className={`${style.buttons} ${style.colum}`}>
          <RiDeleteBin2Fill
            className={`${style.btn} ${style.delete}`}
            onClick={(e) => deleteFileHandler(e)}
          />
        </div>
      )}
    </div>
  );
};

export default File;
