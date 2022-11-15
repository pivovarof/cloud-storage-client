import { ImFolderPlus } from 'react-icons/im';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BiSortDown } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import style from './MenuControl.module.css';
import { setCurrentDir, popDirStack, popupVis } from '../../features/fileSlice';

const MenuControl = () => {
  const dispatch = useDispatch();
  const dirStack = useSelector((state) => [...state.file.dirStack].pop());

  const createDirHandler = () => {
    dispatch(popupVis('flex'));
  };
  const clickBackHandler = () => {
    dispatch(setCurrentDir(dirStack));
    dispatch(popDirStack());
  };
  return (
    <div className={style.wrapMenu}>
      <div className={style.btnControl}>
        <button
          className={`${style.createDir} ${style.btn}`}
          onClick={createDirHandler}
        >
          <ImFolderPlus />
        </button>
        <button
          className={`${style.back} ${style.btn}`}
          onClick={clickBackHandler}
        >
          <RiArrowGoBackLine />
        </button>
      </div>
      <div className={style.btnDisplay}>
        <button className={`${style.sort} ${style.btn}`}>
          <BiSortDown />
        </button>
      </div>
    </div>
  );
};

export default MenuControl;
