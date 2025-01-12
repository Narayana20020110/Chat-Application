const mongoose = require('mongoose');
const uri = 'your mongodb uri';
mongoose.connect(uri)
.then(()=>{console.log('MongoDB connected');})
.catch((error)=>{console.log('Failed to connect to DB',error);});

const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        userName : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            match :[/\S+@\S+\.\S+/,'Please enter valid email address']

        },
        password : {
            type : String,
            required : true,
            minlength : 6
        }
    },{timestamp : true}
);
const User = mongoose.model('User',userSchema);
module.exports = User;