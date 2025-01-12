import React,{useEffect,useState} from 'react'
import Chat from './Chat';
import { api } from './App';
function ChatBoard() {
  const [users,setUsers] =useState([]); 
  useEffect(()=>{  
  fetch(`${api}/users`).then((res)=>res.json()).then((data)=>setUsers(data))
  },[])
  return (
    <div>
        <h3>ChatBoard</h3>
        {Array.isArray(users)&&users.map((user)=>{
                <div style={{backgroundColor:"red"}}>
                <button onClick={<Chat email={user.email} />} ><h3 key ={user._id}>{user.userName}</h3></button>
               </div>
          
        })}
    </div>
  )
}

export default ChatBoard