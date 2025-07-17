const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PORT = 8000 || process.env.PORT;

// Ugly-Approach

app.get('/health-checkup' , (request , response) => {
    
    const kidneyId = request.query.kidneyId;
    const username = request.headers.username;
    const password = request.headers.password;

    // Authorisation
    if(username != "Harkirat" || password != "pass")
    {
        response.status(403).json( { message: "No such user exists !" } );
        return;
    }
    // Input validation
    if(kidneyId != 1 && kidneyId != 2)
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

    // Authorisation
    if(username != "Harkirat" || password != "pass")
    {
        response.status(403).json( { message: "No such user exists !" } );
        return;
    }
    // Input validation
    if(kidneyId != 1 && kidneyId != 2)
    {
        response.status(411).json( { message: "Wrong Inputs !" } );
        return;
    }

    // Do something with the kidney
    response.status(200).send("Your kidney is fine !");

} );

// In this ugly approach, we can see that we are writing the same code for authorisation and input validation again and again
// thereby violating the DRY principle. We need to optimize it.

app.listen(PORT , () => {
    console.log("Server started....");
    console.log(`Server running on port: ${PORT}`);
} );