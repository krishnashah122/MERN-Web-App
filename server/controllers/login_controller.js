const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error: "Please fill the data!"});
    }

    try{

        const userLogin = await User.findOne({email: email});

        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                maxAge: 3600000,
                httpOnly: true
            });

            if(!isMatch){
                return res.status(400).json({error: "Invalid Credientials!"});
            } else {
                return res.status(200).json({message: "Logged in successfully!"});
            }
        } else {
            return res.status(400).json({error: "Invalid Credientials!"});
        }
        
    }
    catch(err){
        console.log(err);
        return res.json({error: "Unable to login!"});
    }
}