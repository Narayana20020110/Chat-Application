import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import { api } from './App';
function Register(){
    const [user, setUser] = useState(
        {
            userName:"",
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
       await fetch(`${api}/register`,
        { method:"POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(user)})
         .then((res)=>{
            
                console.log(res);
                 navigate('/ChatBoard',{state:{email:user.email}});
                 setUser({userName:"",email:"",password:""});
        
        })
        .catch((error)=> console.log(error));
    }
    return (
        <div>
            <form onSubmit = {handleSubmit} >
    <h3>Register</h3>
                <input type = "text" name = "userName" value ={user.UserName}  placeholder = "username" onChange = {handleChange}/><br />
                <input type = "email" name = "email" value ={user.email}  placeholder = "email" onChange = {handleChange}/><br />
                <input type = "password" name = "password" value ={user.password}  placeholder = "password" onChange = {handleChange}/><br />
                <button type='submit'>Submit</button><br />
                <h5>Already Registered?<Link to ='/Login' >Login</Link></h5>
            </form>
        </div>
    )
};
export default Register;