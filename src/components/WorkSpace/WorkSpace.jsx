import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import style from './WorkSpace.module.css';
import NavBar from '../NavBar/NavBar';
import FileList from '../FileList/FileList';
import Sidebar from '../Sidebar/Sidebar';
import MenuControl from '../Menu/MenuControl';
import Popup from '../Popup/Popup';
import PopupGeniral from '../PopupGeniral/PopupGeniral';
import { getFiles } from '../../features/fileSlice';

const WorkSpace = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const loading = useSelector((state) => state.file.loading);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir, dispatch]);

  return (
    <div className={style.wrapWorkSpace}>
      <div className={style.wrapContent}>
        <Popup />
        <PopupGeniral />
        <NavBar />
        <MenuControl />
        <div className={style.wrapMainContent}>
          <Sidebar />

          <div className={style.mainContent}>
            {loading ? (
              <div className={style.clipLoader}>
                <ClipLoader
                  color="#cdd6e7"
                  loading={loading}
                  cssOverride={{}}
                  size={70}
                  speedMultiplier={1}
                />
              </div>
            ) : (
              <FileList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
