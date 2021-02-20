import React,{useState, useEffect} from 'react';
import axios from 'axios';
import "../CSS/Info.css";

function Profile(props){

	const [data, setData] = useState({})

	useEffect(()=>{
		const token = localStorage.getItem('Token');
		axios.get('https://be.bhyve-app.com:3020/user/profile',{ headers: {"Authorization" : `Bearer ${token}`} }).then(res=>{
				setData(res.data);
			}).catch(err=>{
				alert('Something is wrong unable to fetch data.');
			});
	},[])
	
	return(
		<div className='main'>
			{data.skills?<div>
				<h2 className='title'>PROFILE</h2>
				<div className="details">
					<h4>Email : {data.username}</h4>
					<h4>Firstname : {data.firstName}</h4>
					<h4>Lastname : {data.lastName}</h4>
					<hr></hr>
				</div>
				
				<h3 className="skills__head">Your Selected Skills</h3>
				<div className='skills'>
					{data.skills.map(d=><h5 className='skill' key={d}>{d}</h5>)}
				</div>
				<div className='row__btn'>
					<button onClick={()=>{props.changeScreen('SetSkills')}}>Reselect Skills</button>
					<button onClick={()=>{props.changeScreen('Signup')}}>Logout</button>
				</div>
			</div>:<p>Loading data....</p>}
		</div>
	)
}

export default Profile;
