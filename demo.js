let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
let port = process.env.PORT || 2410
app.listen(port, () => console.log(`Node app listening on port ${port}!`));


const {Client}=require("pg");
const client = new Client({
    user: "postgres",
    password: "employeesTable@123",
    database: "postgres",
    port:5432,
    host: "db.olxkxxxqkfiyhbwrqwqr.supabase.co",
    ssl:{rejectUnauthorized:false},
});
client.connect(function(res,error){
    console.log("Connected!!!");
})

app.post("/users",function(req,res,next){
    console.log("Inside Post of User");
    let values=Object.values(req.body);
    console.log(values);
    const query =`INSERT INTO users (email,firstName,lastName,age)
     VALUES ($1,$2,$3,$4)`;
     client.query(query,values,function(err,result){
        if(err) {console.log(err);
        res.status(404).send(err);}
        res.send(`${result.rowCount} insertion successful`)
        client.end();
     })
})
app.get("/users",function(req,res,next){
    console.log("Inside Post of User");
    let values=Object.values(req.body);
    console.log(values);
    const query =`SELECT * FROM users`;
     client.query(query,function(err,result){
        if(err)
        {res.status(404).send(err);}
        res.send(result.rows)
        client.end();
     })
})
