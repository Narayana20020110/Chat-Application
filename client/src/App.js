import './App.css';
import Register from './Register';
import ChatBoard from './ChatBoard';
import Login from './Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
export const api ="your backend url(http://localhost:5000)";
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route index element = {<Register />}/>
        <Route path = '/ChatBoard' element ={<ChatBoard />}/>
        <Route path ='/Login' element = {<Login/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
