import React,{useState} from 'react'
import io from 'socket.io-client'
function Chat({email}) {
  const socket = io('http://localhost:5000');
  const [messages,setMessages]= useState([])
  const send = ()=>{
    const message= document.getElementsByTagName('input').value;
    socket.emit('send-message',{message,email});
    socket.on('recieve-message',message =>{setMessages((prevMsg)=>[...prevMsg,message ]);
    });
  }
  return (
    <div>
        <div>{messages.map((msg)=><h5>{msg}<br /></h5>)}</div>
        <input type='text' placeholder='enter message'/>
        <button onClick={send}>send</button>
    </div>
  )
}

export default Chat