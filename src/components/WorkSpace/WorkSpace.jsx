import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import style from './WorkSpace.module.css';
import NavBar from '../NavBar/NavBar';
import FileList from '../FileList/FileList';
import { getFiles } from '../../features/fileSlice';

const WorkSpace = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir, dispatch]);

  return (
    <div className={style.wrapWorkSpace}>
      <NavBar />
      <div className={style.wrapContent}>
        <div className={style.infoWindow}></div>
        <div className={style.mainContent}>
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
