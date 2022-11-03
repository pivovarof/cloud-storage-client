import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import NavBar from './components/NavBar/NavBar';
import { authUser } from './features/userSlice';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return <div className="App">{!isAuth ? <AuthForm /> : <NavBar />}</div>;
}

export default App;
