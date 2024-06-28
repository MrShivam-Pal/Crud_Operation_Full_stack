import userModel from "../models/userModel.js";


const verify = async(req , res) => {

    const {name, email, MobileNo , pinCode, city, state} = req.body;

    if(!name || !pinCode ||  !MobileNo || !email  || !city || !state){
        return res.status(200).send({
            success: false,
            message: "Empty Fields.."
        });
    }
    else if(pinCode.length !== 6){
        return res.status(200).send({
            success: false,
            message: "Postal Code is not correct."
        });
    }
    else if(MobileNo.length !== 10){
        return res.status(200).send({
            success: false,
            message: "PhoneNumber is not correct."
        });
    }

}

const createUserController = async (req, res) => {

    verify(req , res);
    const {name, email, MobileNo , pinCode, city, state} = req.body;

    try{

        const user = await new userModel({name, email , MobileNo, pinCode, city, state});
        await user.save();
      
        res.status(200).send({
            success: true,
            message: "Sucess! user data added"
        });

    }
    catch(error){
        res.status(501).send({
            success: false,
            message: error.message
        });
    }

};

const editUserController = async (req, res) => {

    verify(req , res);

    const {name,email , MobileNo , pinCode, city, state} = req.body;
    const { id } = req.params;

    try{

        const user = await userModel.findByIdAndUpdate(id, {name, email , MobileNo , pinCode, city, state}, {new: true});
        await user.save();
        
        res.status(200).send({
            success: true,
            message: "Successfully Edited."
        });

    }
    catch(error){
        res.status(501).send({
            success: false,
            message: error.message
        });
    }

};

const removeUserController = async (req, res) => {

    const { id } = req.params;

    try{

        await userModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Successfully Deleted."
        });
    }
    catch(error){
        res.status(501).send({
            success: false,
            message: error.message
        });
    }

};

const getUsersController = async (req, res) => {

    try{
        const users = await userModel.find({});

        res.status(200).send({
            success: true,
            message: "Successfully Deleted.",
            users
        });
    }
    catch(error){
        res.status(501).send({
            success: false,
            message: error.message
        });
    }

};

export {createUserController, editUserController, removeUserController, getUsersController};
