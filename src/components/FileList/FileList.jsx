import { useSelector } from 'react-redux';

import style from './FileList.module.css';
import File from '../File/File';

const FileList = () => {
  const files = useSelector((state) => state.file.files);
  const path = useSelector((state) => state.file.path);

  return (
    <div className={style.wrapFileList}>
      <div className={style.path}>
        {path.map((folder) => '/ ' + folder + ' ')}
      </div>
      <div className={style.headerline}>
        <div className={style.file}></div>
        <div className={style.name}>Name</div>
        <div className={style.date}>Date</div>
        <div className={style.size}>Size</div>
        <div className={style.btn}></div>
      </div>
      {files.length === 0 ? (
        <div className={style.noFiles}>No files</div>
      ) : (
        files.map((file) => <File key={file._id} file={file} />)
      )}
    </div>
  );
};

export default FileList;
