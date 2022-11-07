import { useDispatch } from 'react-redux';
import { FaCloudDownloadAlt } from 'react-icons/fa';

import style from './NavBar.module.css';
import { logOutUser } from '../../features/userSlice';

function NavBar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutUser());
  };
  return (
    <div className={style.conteiner}>
      <div className={style.imgWrap}>
        <FaCloudDownloadAlt className={style.logo} />
        <h4>Cloud disk</h4>
      </div>
      <input
        type="text"
        placeholder="Search files..."
        className={style.inputSearch}
      />
      <button className={style.btn} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default NavBar;
