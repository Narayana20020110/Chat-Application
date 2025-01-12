import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from './App';
function Login() {
    const [user, setUser] = useState(
        {
            email:"",
            password:""
        });
    const navigate = useNavigate();
    const handleChange = (e)=>{
         const {name,value} = e.target;
         setUser({...user,[name]:value,});
        };
    const handleSubmit = async(e) =>{
        e.preventDefault();
       await fetch(`${api}/login`,
        {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user)})
        .then((res)=>{
            console.log(res);
           if(res.ok){
                 navigate('/ChatBoard');
            
           }
           setUser({email:"",password:""});
        })
    
        .catch((error)=> console.log(error));
    }
  return (
    <div>
        <h3>Login</h3>
        <form onSubmit = {handleSubmit}>
            <input type='email'name='email' value={user.email} placeholder='email'onChange={handleChange} /><br />
            <input type='password'name='password' value={user.password} placeholder='password' onChange={handleChange}/><br />
            <button type='submit'>Submit</button>
        </form>
        </div>
  )
}

export default Login