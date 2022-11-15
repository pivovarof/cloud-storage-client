import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import WorkSpace from './components/WorkSpace/WorkSpace';
import { authUser } from './features/userSlice';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <div className="App">
      {!isAuth ? <AuthForm /> : <WorkSpace />}
      <ClipLoader
        className="clipLoader"
        color="#cdd6e7"
        loading={loading}
        cssOverride={{}}
        size={70}
        speedMultiplier={1}
      />
    </div>
  );
}

export default App;
