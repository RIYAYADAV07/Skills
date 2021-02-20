import React,{useState} from 'react';
import axios from 'axios';
import "../CSS/Info.css";

function SetProfile(props){

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [error,setError]=useState('');

	const updateProfile=(e)=>{
		e.preventDefault();
		if (firstname==='' || lastname===''){
			setError('Fill all the fields');
			return;
		}
		else{
			const token = localStorage.getItem('Token');
			axios.post('https://be.bhyve-app.com:3020/user/basic/profile',{
				'firstName':firstname,
				'lastName':lastname
			},{ headers: {"Authorization" : `Bearer ${token}`} }).then(res=>{
				props.changeScreen('SetSkills');
			}).catch(err=>{
				setError(err.response.data.message);
			})
		}
	}
	
	return(
		<div className='main'>
			<h3>SET PROFILE</h3>
            <form >
				{
					error.length!=0 && <div class="alert alert-warning" role="alert">{error}</div>
				}
                <div className="form-group">
                    <label for="FName">First Name</label>
                    <input onChange={e=>setFirstname(e.target.value)} type="text" className="form-control" id="FName"  placeholder="Ex: David"/>
                </div>
                <div className="form-group">
                    <label for="LName">Last Name</label>
                    <input onChange={e=>setLastname(e.target.value)} type="text" className="form-control" id="LName" placeholder="Ex: Peter"/>
                </div>
    
                <button onClick={updateProfile} type="submit" class="btn btn-success">Submit</button>
				<button onClick={()=>{props.changeScreen('Signup')}} type="submit" class="btn btn-success">Logout</button>
            </form>
			<div>
			</div>
			
		</div>
	)
}

export default SetProfile;
