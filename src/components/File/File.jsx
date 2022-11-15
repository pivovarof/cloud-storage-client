import { ImFolderOpen } from 'react-icons/im';
import { AiFillFileText } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import style from './File.module.css';
import {
  setCurrentDir,
  setCurrentDirName,
  pushDirStack,
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

  return (
    <div className={style.fileList} onClick={() => openDirHandler(file)}>
      <div className={`${style.file} ${style.colum}`}>
        {file.type === 'dir' ? <ImFolderOpen /> : <AiFillFileText />}
      </div>
      <div className={`${style.name} ${style.colum}`}>{file.name}</div>
      <div className={`${style.date} ${style.colum}`}>
        {file.date.slice(0, 10)}
      </div>
      <div className={`${style.size} ${style.colum}`}>{file.size}</div>
    </div>
  );
};

export default File;
