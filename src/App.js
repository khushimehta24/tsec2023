import logo from './logo.svg';
import './App.css';
import { offerContext } from './offerContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import MainRouter from './Router/MainRouter';


function App() {
  return (
    <offerContext.Provider value=''>
      <ToastContainer />
      <Router>
        <MainRouter />
      </Router>
    </offerContext.Provider>
  );
}

export default App;
