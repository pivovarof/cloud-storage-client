import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../features/userSlice';

import style from './SignUpForm.module.css';
import classNames from 'classnames';

export default function SignUpForm() {
  const [showPassw, setShowPassw] = useState(false);
  const [showConfPassw, setShowConfPassw] = useState(false);
  const dispatch = useDispatch();
  const textError = useSelector((state) => state.user.error);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });
  const handleShowPassword = () => {
    setShowPassw(!showPassw);
  };
  const handleShowConfPassword = () => {
    setShowConfPassw(!showConfPassw);
  };
  const onSubmit = (data) => {
    dispatch(signUpUser(data));
    // registration(data.email, data.password);

    reset();
  };

  const classError = classNames(style.inputForm, style.errInput);

  return (
    <div className={style.conteiner}>
      <form className={style.formAuth} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formName}>
          <h2>SIGN UP</h2>
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
              message: 'Must be max 20 characters.',
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
                value: 20,
                message: 'Must be max 20 characters.',
              },
            })}
          />
          <div className={style.eye} onClick={handleShowPassword}>
            {showPassw ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div>
          <label>CONFIRM PASSWORD</label>
          {errors?.confirmPassword && (
            <span className={style.textError}>
              {errors?.confirmPassword?.message || 'Error.'}
            </span>
          )}
        </div>
        <div className={style.inputConfPassw}>
          <input
            className={errors.confirmPassword ? classError : style.inputForm}
            type={showConfPassw ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: '* required',
              minLength: {
                value: 5,
                message: 'Must be min 5 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Must be max 20 characters.',
              },
              validate: {
                comperePassword: (value) =>
                  value === getValues('password') || 'Passwords do not match.',
              },
            })}
          />
          <div className={style.eye} onClick={handleShowConfPassword}>
            {showConfPassw ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div
          style={{
            height: '20px',
            wight: '100%',
            color: 'rgb(237, 35, 35)',
          }}
        >
          {textError}
        </div>
        <div className={style.btnWrap}>
          <input
            className={style.btnForm}
            disabled={!isValid}
            type="submit"
            value="SIGN UP"
          />
        </div>
      </form>
    </div>
  );
}
