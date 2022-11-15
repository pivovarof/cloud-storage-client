import { useDispatch, useSelector } from 'react-redux';

import style from './Sidebar.module.css';
import { fileUpload } from '../../features/fileSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(fileUpload({ file, currentDir })));
  };
  return (
    <div className={style.conteiner}>
      <div className={style.folderPath}>Folder:</div>
      <label htmlFor="inputUpload" className={style.lableUpload}>
        Upload file
      </label>
      <input
        multiple={true}
        type="file"
        id="inputUpload"
        className={style.inputUpload}
        onChange={(e) => {
          fileUploadHandler(e);
        }}
      />
    </div>
  );
};

export default Sidebar;
