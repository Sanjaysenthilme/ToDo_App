const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const Routes = require('./Routes/Route'); 
const app = express();

app.use(cors());

// Server Connection:
app.use(bodyparser.json());
app.use(Routes);

const PORT = process.env.PORT

app.listen(PORT,()=>{
    try{
        console.log(`Listening Port is ${PORT}`);
    }catch(err){
        console.log(`Server having some listening issue ${err}`);
    }
});

// Database Connection:
const connectTomongodb = async () =>{
    try{
        const db = await mongoose.connect('mongodb://localhost:27021/TodoList');
        console.log(`MongoDB is connected`);
    }catch(err){
        console.log(`MongoDB is not connected ${err}`);
    }
};connectTomongodb();