const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'productsystem',
});

app.post('/create',(req,res)=>{
    const name=req.body.name;
    const price=req.body.price;
    const quantity=req.body.quantity;
    
    db.query("INSERT INTO product (nom,prixUnitaire,quantite) values(?,?,?)",[name,price,quantity],
    (error,result)=>{
        if (error){
            console.log(error);
        }
        else {
            res.send('Values inserted');
        }

    })
});

app.get('/products',(req,res)=>{
    db.query("SELECT * FROM product",(error,result)=>{
        if (error){
            console.log(error);
        }
        else {
            res.send(result);
        }

    });
})

app.post('/search',(req,res)=>{
    const keywords=req.body.keywords;
    db.query("SELECT * FROM product WHERE nom LIKE ? or prixUnitaire LIKE ? or quantite like ? or id LIKE ?",['%' + keywords + '%', '%' + keywords + '%', '%' + keywords + '%','%' + keywords + '%'],(err,result)=>{
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
app.put('/update',(req,res)=>{
    const id=req.body.id;
    const nom=req.body.name
    const price=req.body.price
    const quantite=req.body.quantite
    db.query('UPDATE product SET  nom=?, prixUnitaire=?, quantite=? where id=?',[nom,price,quantite,id],(err,result)=>{
        if (err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    db.query('DELETE FROM product WHERE id=?',[id],(err,result)=>{
        if (err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
app.listen(3001,()=> {
    console.log('It works!');
})