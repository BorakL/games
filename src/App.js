import Hangman from './games/hangman/hangman';
import ActionGame from './games/runner/ActionGame';
import Memory from './games/memory/Memory';  
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Welcome from './games/welcome/welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';
import {CgGames} from 'react-icons/cg';


function App() {
  const games=["Hangman","Runner","Memory"];
  return (
     
    <div className='App'>
        
      <Navbar bg="dark" variant="dark" className="App-header">
        <Container fluid>
          <Navbar.Brand><Link to="/"> <CgGames/> Games </Link></Navbar.Brand>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/" render={()=><Welcome games={games}/>} /> 
        <Route exact path="/Hangman" component={Hangman}/>
        <Route exact path="/Runner" component={ActionGame}/> 
        <Route exact path="/Memory" component={Memory}/>
      </Switch>

    </div> 
 
  );
}

export default App;