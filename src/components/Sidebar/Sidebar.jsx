import { useDispatch, useSelector } from 'react-redux';

import style from './Sidebar.module.css';
import { fileUpload } from '../../features/fileSlice';
import Uploader from './Uploader/Uploader';
import { setUploadFiles } from '../../features/fileSlice';
import DiskSpace from './DiskSpace/DiskSpace';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const fileUploadHandler = (event) => {
    const files = [...event.target.files];

    const arr = [];
    files.forEach((file) => {
      dispatch(fileUpload({ file, dirId: currentDir }));
      arr.push(file.name);
      dispatch(setUploadFiles(arr));
    });
  };
  return (
    <div className={style.conteiner}>
      <div className={style.folderPath}>Folder:</div>
      <DiskSpace />
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
      <Uploader />
    </div>
  );
};

export default Sidebar;
