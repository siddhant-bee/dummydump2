const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
port = 3000
// middelware
app.use(cors());
app.use(express.json());//req.body


//routes

//create a todo

app.post('/todo',async(req,res)=>{
    try {
     const {discription} = req.body;
     const newTodo = await pool.query("INSERT INTO todo (discription) VALUES($1) RETURNING *",[discription])
     res.json(newTodo)
    } catch (err){
        console.error(err.message)
        
    }
});

// get all todo

app.get('/todo',async(req,res)=>{
    try {
        const all = await pool.query("SELECT * FROM todo ")
        console.log(all.rows)
        res.json(all.rows)
    } catch (err) {
        console.error(err.message);
        
    }
})

//get a tudo
app.get('/todo/:id',async(req,res)=>{
    try {
        const i=req.params.id
        const atodo = await pool.query(`SELECT * FROM todo WHERE todo_id=${i}`)
        res.send(atodo.rows)
      
        console.log(atodo.rows)
    } catch (err) {
        console.error(err.message)
        
    }
})

//update a todo

app.put('/uptodo/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const {discription }= req.body;
        const upd= await pool.query(`UPDATE todo SET discription = $1 WHERE  todo_id=$2`,
         [discription,id]);
          res.send(`new discription for task id ${id} is ${discription}`)
       
         console.log(discription)
    } catch (err) {
        console.error(err.message)
        
    }
})


// delete a todo
app.delete('/dtodo/:id',async(req,res)=>{
   try {
    const id = req.params.id;
    const query = `DELETE FROM todo WHERE todo_id =${id}`;
    const del = pool.query(query,(err,res)=>{
        if(err){

        }
        else{
            res.send("deleted succesfully") 
        }
    })
  
   } catch (err) {
    console.error(err.message)
    
   }
    
})
app.listen(port,console.log(`server is listening at port ${port}`))