
const http = require('http');
const express= require('express');
const mongoose = require('mongoose');
const Dbs =  require('./model_schema.js');

const dotenv = require ('dotenv');
dotenv.config();




const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const start = async()=> {
    try {
        await mongoose.connect(process.env.CONN);
        app.listen(PORT, ()=>{
            console.log('connnected');

        });
    }

 catch (e) {
    console.log(e.message);
 }
};

// const user = new Dbs({
//     name : 'sun',
//     age: 5
// });

// user.save(); 
app.get('/',(req,res)=>
{
    res.send('WELCOME!');
})

app.get('/api/user', async(req,res)=>

{   const result = await Dbs.find();
    res.send({'clients': result});
    console.log('im a get req');
});

//FIND BY ID
app.get('/api/user/:id', async(req,res)=> {
    const {id} = req.params;
    console.log(id);   
     try {
        const find_res= await Dbs.findById(id);
        console.log(find_res);
        res.send(find_res);

    }
    catch (e) {
        res.send('theres an error');
    }
});

//DELETEE
app.delete('/update/:id', async(req,res)=>{
    const customerId= req.params.id;
    try{
    const result = await Dbs.deleteOne({_id: customerId});
    console.log(result);
    res.json({deletedCount: result.deletedCount});
    }
    catch(e) {
        res.send('error msg');
    }

});


///UPDATE

app.put('/update/:id', async(req,res)=>{
    const customerId= req.params.id;
    console.log(customerId);
    const result = await Dbs.replaceOne({_id: customerId}, req.body );
    console.log(result);
    res.json({updatedCount: result.modifiedCount});

});

//SAVE TO DB
app.post('/user', (req,res)=> {
    console.log(req.body);
    try {
    const client = new Dbs(req.body);
    client.save();
    res.send('saved to database');
    }
    catch (e) {
        res.send('error is made my romi')
    }
});


// const server= http.createServer((req,res)=>{
    
//     res.statusCode(200);
//     res.setHeader('Content-Type', 'text/plain' );
//     res.end("hellloooooooo");
//     console.log('runnign......');

// });

start();