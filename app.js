const express = require('express')
const session = require('express-session')
const path = require('path')

const PORT = 3009;
//custom module
const data = require('./data.js')

const app = express()

const credentails = require('./credentails')

// const session = require('express-session')

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname,'public')))

// const credentails = {username:'admin',password:'admin@123'}

app.use(express.json())
app.use(express.urlencoded({'extended':true}))

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    if(req.session.log){
        res.render('home',{data})
    }else{
        res.render('login')
    }
})

app.post('/login', (req, res) => {
    let found=false;
    for(let user of credentails){

        if(req.body.username==user.username && req.body.password==user.password){
            found=true;
            break;
    }
}
console.log(found);
if(found){
    req.session.log=true;
}
res.redirect('/')
});


app.post('/home', (req,res) => {
    req.session.log=false
    res.redirect('/')
})



app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log(`server is running on port ${PORT}`)
    }
    
})