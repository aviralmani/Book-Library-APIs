//For database
const Mongoos = require('mongoose');
const Book = require('./bookschema.js');
const url = 'mongodb://localhost:27017/booklib';

//For API
const express = require('express');
const app = express();
const port = 8080;  
const bodyParse = require('body-parser');

app.use(bodyParse.json());   // to extract data for put request from the body.

Mongoos.connect(url,(err)=>{
    if (err) throw err; 
    else
    console.log('Mongoose is connected');
});

app.get('/', (req,res)=>{
    res.send("Welcome to library");
});

app.get('/books/:id?',async (req,res)=>{               // :id? the '?' will make id as optional param.
    console.log(req.params);
    if(req.params.id == undefined)
    {
        console.log("i am abt to show you whole lib")
        let result = await Book.find({},{__v:0});
        console.log(result);
        res.json(result);
    }
    else{
        result = await Book.findOne({_id :req.params.id});
            console.log(result);  
            res.send(result);
        }
    
});

app.post('/addBook',(req,res)=>{
    let newBook= new Book();

    newBook.title = req.body.title;
    newBook.keyword = req.body.keyword;
    newBook.author = req.body.author;
    newBook.published = req.body.published;

    newBook.save(function(err,book){
        if (err) throw err;
        console.log(book);
        res.send(book);
    })
});

app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`Server is connected on port ${port}`);
});

app.delete('/removeBook/:id',(req,res)=>{
    Book.findOneAndRemove({
        _id: req.params.id
    },(err,result)=>{
        if(err) throw (err);
        else{
            console.log(result);
            res.json(result);
            }
    })
});


app.put('/updateBook/:id',(req,res)=>{
    Book.findOneAndUpdate({
        _id:req.params.id
    },(err,result)=>{
        if (err) throw (err);
        else{
            console.log(result);
            res.json(result);
        }

    })
})
