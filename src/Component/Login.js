import { Avatar } from "@material-ui/core";
import React,{useState} from 'react';
import axios from 'axios';

import "../CSS/Signup.css";

function Login(props) {

  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [showPass, setShowPass] = useState(false);
  const [error,setError]=useState('');
	const doSignin=(e)=>{
    e.preventDefault();
    if(!email || !password){
      setError('Fill all the fields');
      return;
    }
    else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
      setError('Email is invalid');
      return;
    }
    else if(password.length<8 || password.length>20){
      setError('Wrong Password 1');
      return;
  }
  else if(!/[0-9]/.test(password) && !/[!@#$%^&*(),.?":{}|<>]/g.test(password) ){
    setError('Wrong Password 2');
    return;
  }
		else{
      setError('');
			axios.post('https://be.bhyve-app.com:3020/user/signin',{
				'username':email,
				'password':password
			}).then(res=>{
				if(res.data.user.profileCompleted){
					props.changeScreen('Profile');
				}
				else{
					props.changeScreen('SetProfile');
				}
				localStorage.setItem('Token', res.data.accessToken);
			}).catch(err=>{
				setError(err.response.data.message);
			})
		}
	}

  return (
    <div className="login">
      <div className="login__form">
        <div className="login__content">
          <Avatar src={props.src} style={{ height: 85, width: 85 }} />
          <h2>SignIn</h2><br/>
          {
            error.length!=0 && <div class="alert alert-warning" role="alert">{error}</div>
          }
          <form onSubmit={props.logged}>
            <div className="form__row">
              <input onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email*"  />
            </div>
            <div className="form__row">
              <input
                type={showPass?'text':'password'} 
				        onChange={e=>setPassword(e.target.value)}
                placeholder="Password*"
              />
            </div>
            <div style={{color:'#666'}} className="login__row">
              <input onClick={()=>setShowPass(!showPass)} type="checkbox" id="remember" />
              <label htmlFor="remember">{showPass?'Hide Password':'Show Password'}</label>
            </div>

            <div style={{color:'#666'}} className="login__row">
            <button style={{marginRight:15}} onClick={doSignin} type="submit">SignIn</button>
              <button onClick={()=>props.changeScreen('Signup')} type="submit">SignUp</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
