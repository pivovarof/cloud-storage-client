import { useDispatch, useSelector } from 'react-redux';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { useState } from 'react';

import style from './NavBar.module.css';
import { logOutUser } from '../../features/userSlice';
import { setCurrentDir, searchFiles, getFiles } from '../../features/fileSlice';

function NavBar() {
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const currentDir = useSelector((state) => state.file.currentDir);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setCurrentDir(null));
    dispatch(logOutUser());
  };
  const onChengeHandler = (value) => {
    setSearchName(value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (value) {
      setSearchTimeout(
        setTimeout(
          (val) => {
            console.log(val);
            dispatch(searchFiles(val));
          },
          500,
          value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };
  return (
    <div className={style.conteiner}>
      <div className={style.imgWrap}>
        <FaCloudDownloadAlt className={style.logo} />
        <h4>Cloud disk</h4>
      </div>
      <input
        value={searchName}
        type="text"
        placeholder="Search files..."
        className={style.inputSearch}
        onChange={(e) => onChengeHandler(e.target.value)}
      />
      <button className={style.btn} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default NavBar;
