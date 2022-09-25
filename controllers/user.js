const repo = require('../db/repository/userOperations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register(request, response){
        const userObject = request.body;
        //console.log(userObject);
        
        const saltRounds = 10;
        //generating a salt
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err){
                response.status(403).json({message:'Error in user registration! '});
            }else{
                //generating the hash
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
        //console.log(userObject);

        const doc = await repo.find(userObject.email);
        try{
            if(doc && doc.email){
                bcrypt.compare(userObject.password, doc.password, (err, result)=>{
                    if(result == true){
                        //jwt token if the password matches
                        const token = jwt.sign({id:doc.id}, process.env.JWT_SECRET, {expiresIn: '60000'});
            
                        response.status(200).json({
                            user:{
                            id:doc._id,
                            name:doc.name,
                            email:doc.email
                            },
                            message: "Login Successful",
                            accessToken: token
                        });

                    }else if(result == false){
                        response.status(404).json({message:'Invalid Password! '});
                    }else{
                        response.status(500).json({message:'Internal Server Error! ', err});
                    }
                })
            }else{
                response.status(404).json({message:'Invalid Email Provided! '});
            }
        }catch(err){
            response.status(500).json({message:'Some DB Error! ', err});
        }
    },

    profile(request, response){
        //control will reach here only if the middleware verifies the JWT token to be valid
        response.status(200).json({message:'You have the authorisation to see this page!'});
    }
}