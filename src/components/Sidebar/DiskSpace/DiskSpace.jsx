import { useSelector } from 'react-redux';

import style from './DiskSpace.module.css';
import formatSize from '../../../utilities/formatSize';

const DiskSpace = () => {
  const diskSpace = useSelector((state) => state.user.diskSpace);
  const usedSpace = useSelector((state) => state.user.usedSpace);
  const procent = (usedSpace / diskSpace) * 100 + '%';

  return (
    <div className={style.conteiner}>
      <h4>Disk Space:</h4>
      <div className={style.diskSpaceWrap}>
        <div className={style.diskSpace}>
          <div style={{ width: procent }} className={style.usedSpace}></div>
        </div>
      </div>
      <span>{`Used ${formatSize(usedSpace)} / ${formatSize(diskSpace)}`}</span>
    </div>
  );
};

export default DiskSpace;
