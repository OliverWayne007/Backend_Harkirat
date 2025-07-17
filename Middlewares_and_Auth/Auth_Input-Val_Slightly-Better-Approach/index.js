const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PORT = 8000 || process.env.PORT;

// Slighly-Better-Approach using separate functions for Authorisation and Input validation

function userAuthorisation(username , password)
{
    // Authorisation
    if(username != "Harkirat" || password != "pass")
    {
        return false;
    }
    return true;
}

function inputValidation(kidneyId)
{
    // Input validation
    if(kidneyId != 1 && kidneyId != 2)
    {
        return false;
    }
    return true;
}

app.get('/health-checkup' , (request , response) => {
    
    const kidneyId = request.query.kidneyId;
    const username = request.headers.username;
    const password = request.headers.password;

    if( !userAuthorisation(username , password) )
    {
        response.status(403).json( { message: "No such user exists !" } );
        return;
    }

    if( !inputValidation(kidneyId) )
    {
        response.status(411).json( { message: "Wrong Inputs !" } );
        return;
    }

    // Do something with the kidney
    response.status(200).send("Your heart is healthy !");

} );

app.get('/kidney-checkup' , (request , response) => {
    
    const kidneyId = request.query.kidneyId;
    const username = request.headers.username;
    const password = request.headers.password;

    if( !userAuthorisation(username , password) )
    {
        response.status(403).json( { message: "No such user exists !" } );
        return;
    }

    if( !inputValidation(kidneyId) )
    {
        response.status(411).json( { message: "Wrong Inputs !" } );
        return;
    }

    // Do something with the kidney
    response.status(200).send("Your kidney is fine !");

} );

// In this slightly-better-approach, instead of writing the code for Authorisation and Input Validation again and again for every
// route, we have created separate functions for Authorisation and Input Validation which can tehen be called again and again
// as and when required. This makes our code a little bit more modular and cleaner.

app.listen(PORT , () => {
    console.log("Server started....");
    console.log(`Server running on port: ${PORT}`);
} );