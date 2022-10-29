import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './LoginForm.module.css';
import { getUser } from '../../features/userSlice';
import classNames from 'classnames';

export default function LoginForm() {
  const [showPassw, setShowPassw] = useState(false);
  const dispatch = useDispatch();
  const classError = classNames(style.inputForm, style.errInput);
  const stateError = useSelector((state) => state.user.error);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    dispatch(getUser(data));

    reset();
  };

  const handleShowPassword = () => {
    setShowPassw(!showPassw);
  };

  return (
    <div className={style.conteiner}>
      <form className={style.formAuth} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formName}>
          <h2>LOGIN</h2>
        </div>
        <div>
          <label>E-MAIL</label>
          {errors?.email && (
            <span className={style.textError}>
              {errors?.email?.message || 'Error'}
            </span>
          )}
        </div>
        <input
          className={errors.email ? classError : style.inputForm}
          type="email"
          {...register('email', {
            required: '* required',
            minLength: {
              value: 5,
              message: 'Must be min 5 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Must be max 40 characters.',
            },
          })}
        />
        <div>
          <label>PASSWORD</label>
          {errors?.password && (
            <span className={style.textError}>
              {errors?.password?.message || 'Error'}
            </span>
          )}
        </div>
        <div className={style.inputPassword}>
          <input
            className={errors.password ? classError : style.inputForm}
            type={showPassw ? 'text' : 'password'}
            {...register('password', {
              required: '* required',
              minLength: {
                value: 5,
                message: 'Must be min 5 characters.',
              },
              maxLength: {
                value: 30,
                message: 'Must be max 30 characters.',
              },
            })}
          />
          <div className={style.eye} onClick={handleShowPassword}>
            {showPassw ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div
          style={{
            height: '20px',
            wight: '100%',
            color: 'rgb(237, 35, 35)',
          }}
        >
          {stateError}
        </div>

        <div className={style.btnWrap}>
          <input
            className={style.btnForm}
            disabled={!isValid}
            type="submit"
            value="LOGIN"
          />
        </div>
      </form>
    </div>
  );
}
