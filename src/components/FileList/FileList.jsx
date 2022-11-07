import { useSelector } from 'react-redux';

import style from './FileList.module.css';
import File from '../File/File';

const FileList = () => {
  const files = useSelector((state) =>
    state.file.files.map((file) => <File key={file._id} file={file} />)
  );

  return (
    <div className={style.wrapFileList}>
      <div className={style.headerline}>
        <div className={style.file}></div>
        <div className={style.name}>Name</div>
        <div className={style.date}>Date</div>
        <div className={style.size}>Size</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;
