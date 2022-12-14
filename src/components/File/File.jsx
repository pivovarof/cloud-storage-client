import { ImFolderOpen } from 'react-icons/im';
import { AiFillFileText } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import style from './File.module.css';
import formatSize from '../../utilities/formatSize';
import {
  setCurrentDir,
  setCurrentDirName,
  pushDirStack,
  fileDownload,
  setCurrentFile,
  popupGenVis,
  setPath,
} from '../../features/fileSlice';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const delLoading = useSelector((state) => state.file.delLoading);

  const openDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(pushDirStack(currentDir));
      dispatch(setCurrentDir(file._id));
      dispatch(setCurrentDirName(file.name));
      dispatch(setPath(file.name));
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
          {delLoading ? (
            <ClipLoader
              color="#cdd6e7"
              loading={delLoading}
              cssOverride={{}}
              size={10}
              speedMultiplier={1}
            />
          ) : (
            <RiDeleteBin2Fill
              className={`${style.btn} ${style.delete}`}
              onClick={(e) => deleteFileHandler(e)}
            />
          )}
        </div>
      ) : (
        <div className={`${style.buttons} ${style.colum}`}>
          {delLoading ? (
            <ClipLoader
              color="#cdd6e7"
              loading={delLoading}
              cssOverride={{}}
              size={10}
              speedMultiplier={1}
            />
          ) : (
            <RiDeleteBin2Fill
              className={`${style.btn} ${style.delete}`}
              onClick={(e) => deleteFileHandler(e)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default File;
