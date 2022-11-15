import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import style from './Popup.module.css';
import { popupVis } from '../../features/fileSlice';
import { createDir } from '../../features/fileSlice';

const Popup = () => {
  const [dirName, setDirName] = useState('');
  const dispatch = useDispatch();
  const popupDisplay = useSelector((state) => state.file.popupDisplay);
  const currentDir = useSelector((state) => state.file.currentDir);

  const setValue = (value) => {
    console.log(value);
    setDirName(value);
  };
  const popupDisplayHandler = () => {
    dispatch(popupVis('none'));
  };
  const createDirHandler = () => {
    if (dirName) {
      dispatch(createDir({ dirId: currentDir, name: dirName }));
      setDirName('');
      dispatch(popupVis('none'));
    }
  };
  return (
    <div
      className={style.conteiner}
      style={{ display: popupDisplay }}
      onClick={popupDisplayHandler}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <div className={style.title}>Create folder</div>
          <button className={style.close} onClick={popupDisplayHandler}>
            X
          </button>
        </div>
        <div className={style.body}>
          <input
            className={style.input}
            type="text"
            placeholder="Enter a folder name..."
            value={dirName}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          disabled={!dirName ? 'disabled' : ''}
          className={style.create}
          onClick={createDirHandler}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Popup;
