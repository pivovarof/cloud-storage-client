import { ImFolderPlus } from 'react-icons/im';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BiSortDown } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import style from './MenuControl.module.css';
import {
  setCurrentDir,
  popDirStack,
  popupVis,
  delPath,
} from '../../features/fileSlice';

const MenuControl = () => {
  const dispatch = useDispatch();
  const dirStack = useSelector((state) => [...state.file.dirStack].pop());
  const dir = useSelector((state) =>
    state.file.files.filter((e) => e._id === dirStack)
  );

  const createDirHandler = () => {
    dispatch(popupVis('flex'));
  };
  const clickBackHandler = () => {
    console.log(dir);
    dispatch(setCurrentDir(dirStack));
    dispatch(popDirStack());
    dispatch(delPath());
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
