import { Avatar } from "@material-ui/core";
import React,{useState} from 'react';
import axios from 'axios';

import "../CSS/Signup.css";

function Signup(props) {

  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [showPass, setShowPass] = useState(false);
  const [error,setError]=useState('');

	const doSignup=(e)=>{
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
        setError('Password should be of 8-20 characters');
        return;
    }
    else if(!/[0-9]/.test(password) && !/[!@#$%^&*(),.?":{}|<>]/g.test(password) ){
      setError('Password must have a digit and a special character');
      return;
    }
		else{
      setError('');
			axios.post('https://be.bhyve-app.com:3020/user/signup',{
				'username':email,
				'password':password
			}).then(res=>{
				props.changeScreen();
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
          <h2>SignUp</h2><br/>
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
              <button style={{marginRight:15}} onClick={doSignup} type="submit">SignUp</button>
              <button onClick={props.changeScreen} type="submit">SignIn</button>
            </div>
          </form>
        </div>  
      </div>
    </div>
  );
}

export default Signup;
