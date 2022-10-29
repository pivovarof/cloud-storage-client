import { useSelector } from 'react-redux';

import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import NavBar from './components/NavBar/NavBar';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  return <div className="App">{!isAuth ? <AuthForm /> : <NavBar />}</div>;
}

export default App;
