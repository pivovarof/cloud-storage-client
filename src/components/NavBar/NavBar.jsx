import { useDispatch } from 'react-redux';

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
        <img src="" alt="" />
      </div>
      <button className={style.btn} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default NavBar;
