const mongoose = require('mongoose');
require('dotenv').config();

URL = process.env.MONGO_URL;

mongoose.connect(URL, {maxPoolSize:5}, (err) => {
    if(err){
        console.log('DB Error ', err);
    }
    else{
        console.log('DB Connection Created...');
    }
});

module.exports = mongoose;