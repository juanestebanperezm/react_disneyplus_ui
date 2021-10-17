import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/Login';
import Nabar from './components/Nabar'
import Home from './components/Home';
import Detalles from './components/Detalles';

function App() {
  return (
    <div className="App">
     <Router>
       <Nabar></Nabar>
       <Switch>
         <Route exact path='/' >
           <Login></Login>
         </Route>
         <Route path='/home'>
            <Home></Home>
         </Route>

         <Route path='/detail/:id/'>

          <Detalles></Detalles>

         </Route>


       </Switch>
     </Router>
    </div>
  );
}

export default App;
