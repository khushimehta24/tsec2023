import logo from './logo.svg';
import './App.css';
import { offerContext } from './offerContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import MainRouter from './Router/MainRouter';
import { useEffect, useState } from 'react';


function App() {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ccpUser')))
    setToken(localStorage.getItem('ccpToken'))
  }, [])

  const context = { user, setUser, token, setToken }


  return (
    <offerContext.Provider value={context}>
      <ToastContainer />
      <Router>
        <MainRouter />
      </Router>
    </offerContext.Provider>
  );
}

export default App;
