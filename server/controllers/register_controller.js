const User = require('../models/userSchema');

module.exports.register = async (req, res) => {

    const {name, email, phone, work, address, password, confirmPassword} = req.body;

    if(!name || !email || !phone || !work || !address || !password || !confirmPassword){
        return res.status(422).json({error: "Please fill the fields properly."});
    }

    try{

        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({error: "Email already exist!"});
        } else if(password != confirmPassword){
            return res.status(422).json({error: "Password are not matching!"});
        }

        const user = new User({name, email, phone, work, address, password});

        await user.save();
        res.status(201).json({message: "User registered successfully!"});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Unable to register the user!"});
    }    

}
