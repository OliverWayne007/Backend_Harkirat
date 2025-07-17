const express = require("express");

require('dotenv').config();

const app = express();

const Users = require("./repository/Users.js");

const { hashPassword , verifyPassword } = require("./utils/PasswordHashing.js");

const { generateJwtToken , verifyJwtToken } = require("./utils/JwtAuthentication.js");

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.post('/signup' , (request , response) => {
    const {username , email , password} = request.body;
    try 
    {
        const hashedPassword = hashPassword(password);
        const user = { userId: username , email: email , password: hashedPassword};
        Users.push(user);
        return response.status(201).json({message: "User added successfully !!!"});
    }
    catch (error) 
    {
        return response.status(500).json({message: "Could not add user !"});
    }
});

app.post("/login" , (request , response) => {
    const {username , password} = request.body;
    try 
    {
        console.log("Users: " , Users);
        const user = Users.filter( (existingUser) => { 
            return verifyPassword(password , existingUser.password);
        } );
        console.log("user: " , user);
        if(user.length == 1)
        {
            const payload = { username: username };
            const jwt_token = generateJwtToken(payload);
            return response.status(200).json({message: "User logged in successfully !!!" , token: jwt_token});
        }
        else
        {
            return response.status(400).json({message: "Invalid User !"});
        }
    } 
    catch (error)
    {
        return response.status(500).json({message: "Something went wrong at our side...."});
    }
})

app.get('/users' , (request , response) => {
    const token = request.headers.authorization;
    try 
    {
        const decoded_payload = verifyJwtToken(token);
        const username = decoded_payload.username;
        const users = Users.filter( (existingUser) => { return !(existingUser.userId === username) } );
        return response.status(200).json({users: users});
    } 
    catch (error) 
    {
        return response.status(400).json({message: error});
    }
});

app.listen(PORT , () => {
    console.log(`Server started....`);
    console.log(`Serving running on port: ${PORT}`);
});