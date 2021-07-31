
import Router from './routes/Router';
import { useDispatch } from 'react-redux';
import { login } from './store/actions/authActions';

function App() {
  const dispatch = useDispatch();

  const authenticated = localStorage.getItem("auth");
  if(authenticated)
    dispatch(login(JSON.parse(authenticated)))

  return <Router />;
}

export default App;

