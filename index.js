// require('dotenv').config()
// const json = require('body-parser/lib/types/json');
// const express = require("express");
// const app = express();
// const jwt = require("jsonwebtoken")

// app.use(express.json())

// const posts = [
//     {
//         username: 'Khanya',
//         title: 'Post 1'

//     },
//     {
//         username: 'Thapi',
//         title: 'Post 2'

//     }
// ]



// app.post('/login',(req, res)=>{
//     //Authenticate User
//     const username = "Khanya"
//     const user = {name: username}
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({accessToken: accessToken})
// })

// app.get('/posts',authenticateToke, (req, res)=>{
//     res.json(posts.filter(post => post.username === req.user.name))

// })

// function  authenticateToke(req, res, next){
//     const authHeader = req.header['authorization']
//     const token =  authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token.env.ACCESS_TOKEN_SECRET, (err, user)=>{
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })


// }

// app.listen(3000)

const express= require('express');
const { verify } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res)=>{
    res.json({
        message: 'Welcome to the API'
    })

})

app.post('/api/posts', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'Post created',
                authData
            })
        }

    })
    
})

app.post('/api/login', (req,res)=>{
    //Mork user
    const user = {
        id: 1,
        username: 'brad',
        email:'brad@gmail.com'
    }
    
    jwt.sign({user}, 'secretkey',{expiresIn: '90s'}, (err, token)=>{
        res.json({
            token
        })
    });
})

function verifyToken(req, res, next){
    //Get the auth header value
    const bearerHeader = req.headers['authorization']; 
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token=bearerToken
        next()

    } else{
        res.sendStatus(403)
    }

}

app.listen(3000)