import { ImFolderOpen } from 'react-icons/im';
import { AiFillFileText } from 'react-icons/ai';

import style from './File.module.css';

const File = ({ file }) => {
  return (
    <div className={style.fileList}>
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
