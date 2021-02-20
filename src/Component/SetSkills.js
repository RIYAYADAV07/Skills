import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import "../CSS/Info.css";

function SetSkills(props){

	const [skills, setSkills] = useState([]);
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [count, setCount] = useState(0);
	const [error,setError]=useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const recordPerPage = 10;
	const [totalRecords, setTotalRecords] = useState(0);
	const pageRange = 4;

	const handlePageChange=pageNumber=>{
		setCurrentPage(pageNumber);
		setFilterData([]);
		setFilterData(data.filter((d,i)=>(((pageNumber-1)*10)<=i && i<(pageNumber*10))));
		setCount(pageNumber*10);
	}

	useEffect(()=>{
		const token = localStorage.getItem('Token');
		axios.get('https://be.bhyve-app.com:3020/skills',{ headers: {"Authorization" : `Bearer ${token}`} }).then(res=>{
				setData(res.data);
				setFilterData(res.data.filter((d,i)=>(0<=i && i<10)));
				setCount(10);
				setTotalRecords(res.data.length);
		}).catch(err=>{
				setError(err.response.data.message);
		});
	},[])

	const addSkill=(skillName)=>{
	
		if (skills.filter(d=>d===skillName).length===0 && skills.length<8){
			setSkills([...skills,skillName])
		}else{
			setSkills(skills.filter(d=>d!==skillName))
		}
	}

	const submit=(e)=>{
		e.preventDefault();
		if(skills.length>2){
			const token = localStorage.getItem('Token');
			axios.post('https://be.bhyve-app.com:3020/user/skills',{
				'skills':skills
			},{ headers: {"Authorization" : `Bearer ${token}`} }).then(res=>{
				props.changeScreen('Profile');
			}).catch(err=>{
				setError(err.response.data.message);
			});
		}else setError('Select minimum 3 skills.')	
	}
	
	return(
		<div className='main'>
			<h3>Choose Skills</h3>
			<p>Choose minimum 3 and maximum 8 skills</p>
			<p>Number of selected skills :<span className='notice'>{skills.length}</span></p>
				{
					error.length!=0 && <div class="alert alert-warning" role="alert">{error}</div>
				}
			<div className='skills'>
				{filterData.map(d=><div 
				className={skills.filter(da=>da===d.skillName).length!==0? 'skill selected':'skill'} 
				key={d.id} onClick={()=>addSkill(d.skillName)}>
					<h4>{d.id}.{d.skillName}</h4>	
				</div>)}
			</div>

			<div className='row__btn'>
				<button onClick={submit}>Submit</button>
				<button onClick={()=>{props.changeScreen('Signup')}}>Logout</button>
			</div>

			<div className='row__btn'>
				<Pagination className="pagination"
						itemClass="page-item" 
						linkClass="page-link"
				        activePage={currentPage}
				        itemsCountPerPage={recordPerPage}
				        totalItemsCount={totalRecords}
				        pageRangeDisplayed={pageRange}
				        onChange={handlePageChange}
				 />
			</div>
		</div>
	)
}

export default SetSkills;
