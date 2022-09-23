const repo = require('../db/repository/userOperations');
const bcrypt = require('bcrypt');

module.exports = {

    register(request, response){
        const userObject = request.body;
        console.log(userObject);
        
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err){
                response.status(403).json({message:'Error in user registration! '});
            }else{
                bcrypt.hash(userObject.password, salt, (err, hash)=>{
                    if(err){
                        response.status(403).json({message:'Error in user registration! '});
                    }else{
                        userObject.password = hash;
                        repo.add(userObject, response);
                    }
                })
            }
        })

    },

    async login(request, response){
        const userObject = request.body;
        console.log(userObject);

        const doc = await repo.find(userObject.email);
        try{
            if(doc && doc.email){
                bcrypt.compare(userObject.password, doc.password, (err, result)=>{
                    if(result){
                        response.status(200).json({message:'userObject: ', doc});
                    }else{
                        response.status(404).json({message:'Invalid Password! '});
                    }
                })
            }else{
                response.status(404).json({message:'Invalid Email Provided! '});
            }
        }catch(err){
            response.status(500).json({message:'Some DB Error! ', err});
        }
    }
}