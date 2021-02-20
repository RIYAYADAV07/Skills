import './App.css';
import Signup from './Component/Signup';
import Login from './Component/Login';
import SetProfile from './Component/SetProfile';
import SetSkills from './Component/SetSkills';
import Profile from './Component/Profile';
import {useState} from 'react';

function App() {

	const [screen ,setScreen] = useState('Signup');
	
  return (
    <div className="App">
    
      {screen==='Signup' && <Signup changeScreen={()=>{setScreen('Login')}}/>}
      {screen==='Login' && <Login changeScreen={(val)=>{setScreen(val)}}/>}
      {screen==='SetProfile' && <SetProfile changeScreen={(val)=>{setScreen(val)}}/>}
      {screen==='SetSkills' && <SetSkills changeScreen={(val)=>{setScreen(val)}}/>}
      {screen==='Profile' && <Profile changeScreen={(val)=>{setScreen(val)}}/>} 
    
    </div>
  );
}

export default App;
