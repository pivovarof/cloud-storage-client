import style from './DiskSpace.module.css';

const DiskSpace = () => {
  return (
    <div className={style.conteiner}>
      <h4>Disk Space:</h4>
      <div className={style.diskSpaceWrap}>
        <div className={style.diskSpace}>
          <div className={style.usedSpace}></div>
        </div>
      </div>
      <span>Used 2GB/10GB</span>
    </div>
  );
};

export default DiskSpace;
