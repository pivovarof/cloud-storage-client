import { useSelector } from 'react-redux';
import { BsCheckLg } from 'react-icons/bs';

import style from './Uploader.module.css';

const Uploader = () => {
  const totalLlength = useSelector((state) => state.file.uploadLength);
  const uploadFiles = useSelector((state) => state.file.uploadFiles);

  return (
    <div className={style.conteiner}>
      <div className={style.upload}>
        <div
          className={style.wrapUpload}
          style={{ display: totalLlength === null ? 'none' : '' }}
        >
          <div
            className={style.uploader}
            style={{ width: `${totalLlength}%` }}
          ></div>
        </div>
        <div className={style.percent}>
          {totalLlength === null ? '' : `${totalLlength}%`}
        </div>
      </div>
      <div className={style.listFiles}>
        {totalLlength === null &&
          uploadFiles.map((file) => (
            <div className={style.file} key={file}>
              <BsCheckLg style={{ color: 'rgb(42 161 42)' }} />
              <div className={style.fileName}>{file}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Uploader;
