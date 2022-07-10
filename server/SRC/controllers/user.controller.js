import UserModel from '../models/user.model.js'
import CartModel from '../models/cart.model.js';


export const CreateUser = async (req,res) =>{
    
    const userData = new UserModel(req.body);
    const userCart = new CartModel({
        ownerID:userData._id, 
        books:[]
    })
    try {
        const token = await userData.GenerateToken();
        await userData.save(); 
        await userCart.save();

        res.status(201).send({
            status:201,
            statusText:'created',
            data:{
                user:{
                    id:userData._id, 
                    firstname:userData.firstname,
                    lastname:userData.lastname,
                    email:userData.email,
                },
                token:token,
            },
            messege:"",
        })

    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:`CreateUser went wrong: ` + error})
    }
}

export const Login = async (req, res) =>{
    console.log(req.body.email, req.body.password);
    try {
        const AUser = await UserModel.getUserByEmailAndPass(req.body.email, req.body.password)
        
        
        if(!AUser){
            console.log(!AUser);
            throw new Error();
        }
        const token = await AUser.GenerateToken();
        res.send({
            status: 200,
            statusText: 'ok',
            data: { 
                user: AUser, 
                token: token 
            },
            message: 'login successful',
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:400,
            statustext:'Bad Request',
            messege:"Login went wrong" + error})
    }
}

export const Logout = async (req, res) =>{
    const User = req.user;
    const Token = req.token;

    try {
        User.tokens = User.tokens.filter(TokenList => TokenList.token !== Token);
        await User.save();
        

            res.send({
            status:200,
            statustext:"ok",
            data:"",
            messege:"logout successful"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"Logout went wrong" + error})
    }
}