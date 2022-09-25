const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());  //middleware to parse json
app.use(express.urlencoded());

app.use('/',require('./routes/user')); //dynamic routing

const server = app.listen(process.env.PORT || 1010, (err) => {
    if(err){
        console.log('Server Crash'+ JSON.stringify(err));
    }else{
        console.log('Server Start at port', server.address().port);
    }
})