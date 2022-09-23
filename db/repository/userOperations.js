const UserModel = require('../models/user');

module.exports = {

    add(userObject, response){
        UserModel.create(userObject, (err, doc)=>{
            if(err){
                response.status(500).json({message:'Some DB Error! ', err});
            }else if(doc){
                response.status(200).json({message:'User successfully registered! '});
            }else{
                response.status(403).json({message:'Error in user registration! '});
            }
        })
    },

    find(userEmail){
        const promise = UserModel.findOne({email:userEmail}).exec();
        return promise;
    },

    findById(userId){
        const promise = UserModel.findOne({_id:userId}).exec();
        return promise;
    }
}