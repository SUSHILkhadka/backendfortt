const express=require("express");
const path = require('path')
const Highscores=require('./config');

const app=express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, './public')))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.post('/api/create',async (req,res)=>{
    const body=req.body;
    await Highscores.add(body);
    res.send({msg: "created"});
});


app.post('/api/update',async (req,res)=>{
const id=req.body.id;
delete req.body.id;
    await Highscores.doc(id).update(req.body);
    res.send({msg: "updated"});
});

// app.post('/api/delete',async (req,res)=>{
//     const body=req.body;
//         await Highscores.doc(body.id).delete();
//         res.send({msg: "sucessfully deleted"});
//     });


app.get('/api/fetch',async (req,res)=>{
    const snapshot=await Highscores.get();
    let list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
    console.log(list);
    res.send(list);
});

app.listen(3000,()=>console.log("successfully running at port 3000"));
