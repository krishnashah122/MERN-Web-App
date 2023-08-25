const User = require('../models/userSchema');

module.exports.contact = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try{
        if(!name || !email || !phone || !message){
            console.log("Please fill the contact form!");
            return res.json({error: "Please fill the contact form!"});
        }

        const userContact = await User.findOne({_id: req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({message: 'Message sent successfully!'});
        }
    }
    catch(err){
        console.log(err);
    }
}