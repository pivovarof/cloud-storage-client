import { useSelector, useDispatch } from 'react-redux';

import style from './PopupGeniral.module.css';
import {
  popupGenVis,
  fileDelete,
  setCurrentFile,
} from '../../features/fileSlice';

const PopupGeniral = () => {
  const popupDisplay = useSelector((state) => state.file.popupGenDisplay);
  const file = useSelector((state) => state.file.currentFile);

  const dispatch = useDispatch();

  const deleteFileHandler = (e) => {
    e.stopPropagation();
    dispatch(fileDelete(file));
    dispatch(popupGenVis('none'));
    dispatch(setCurrentFile(null));
  };
  const noDeleteFileHandler = (e) => {
    e.stopPropagation();
    dispatch(popupGenVis('none'));
  };
  return (
    <div
      className={style.conteiner}
      style={{ display: popupDisplay }}
      onClick={(e) => noDeleteFileHandler(e)}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <div className={style.title}>Delete</div>
          <button
            className={style.close}
            onClick={(e) => noDeleteFileHandler(e)}
          >
            x
          </button>
        </div>
        <div className={style.body}>
          Are you sure you want to delete this{' '}
          {file === null || file.type === 'dir' ? 'folder' : 'file'}?
        </div>
        <div className={style.blockBtn}>
          <button className={style.btn} onClick={(e) => deleteFileHandler(e)}>
            YES
          </button>
          <button className={style.btn} onClick={(e) => noDeleteFileHandler(e)}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupGeniral;
