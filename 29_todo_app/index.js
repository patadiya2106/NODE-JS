const express = require('express');
const port = 8282;
const path = require('path');
const app = express();

const pendingTask=[
    {
        task:"walking",
        date: new Date(). toLocaleDateString()
    }
]
const processTask=[
    {
        task:"Reading",
        date: new Date(). toLocaleDateString()
    }
]
const completeTask=[
    {
        task:"Writing",
        date: new Date(). toLocaleDateString()
    }
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.render('home',{
        pendingTask,
        processTask,
        completeTask
    });
})

app.post('/insertData',(req,res)=>{
    console.log(req.body);
    const {taskType}= req.body;
    if(taskType==="Pending"){
        pendingTask.push(req.body);
    }
    else if(taskType==="Process"){
        processTask.push(req.body);
    }
    else{
        completeTask.push(req.body);
    }
    res.redirect('/');
})

app.get('/deletePending',(req,res)=>{
    console.log(req.query.pos);
    pendingTask.splice(req.query.pos,1)
    res.redirect('/');
})

app.get('/deleteProcess',(req,res)=>{
    console.log(req.query.pos);
    processTask.splice(req.query.pos,1)
    res.redirect('/'); 
})

app.get('/deleteComplete',(req,res)=>{
    console.log(req.query.pos);
    completeTask.splice(req.query.pos,1)
    res.redirect('/'); 
})

app.listen(port,(err)=>{
    err?console.log(err):console.log("Server is running on port :",port);
});