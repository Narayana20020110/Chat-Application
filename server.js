const express = require('express')
const http = require('http')
const cors = require('cors');
const {Server} = require('socket.io')
const app = express()
const path = require('path')
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
const User = require('./UserDB');
const Port = 5000;
app.post('/register',(req,res)=>{
    try{
    const {userName,email,password} = req.body;
    const user = User.findOne({email});
    if(user){
         return res.status(400).json({message:'User Already exists!Please login'});
    }
    const newUser = new User({userName,email,password});
    newUser.save();
    res.status(200).json({message:'Registration Successsful'});
}
catch(error){
    res.status(500).json({message:'Error registering User',error:error.message});
}
});
app.post('/login',(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = User.findOne({email});
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        if(user.password == password){
            res.status(200).json({message:'Login Successful'});
        }
    }catch(error){
        res.status(500).json({message:'Error While Logging',error:error.message});
    }
});
app.get('/users',(req,res)=>{
    try{
    const email = req.params.email; 
    const users = User.find();
    res.status(200).json(users);
    }catch(error){
        res.status(500).json({message:'Error Fetching Users',error:error.message});
    }
});
io.on('connection',socket =>{
        const userSockets = {};
        console.log("connected");
        socket.on('send-message',data => {
            const socketId = userSockets[data.email];
            socket.to(socketId).emit('recieve-message',data.message);
            socket.emit('recieve-message',data.message);
        });
});
app.get('/',(req,res)=>console.log('hi'));
server.listen(Port,()=> console.log(`Running on ${Port}`));