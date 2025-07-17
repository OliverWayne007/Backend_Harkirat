const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const PORT = 8000 || process.env.PORT;


// Optimized approach using Middlewares

app.use(express.json());    // Pre-Defined Middleware
app.use(bodyParser.json());  // Pre-Defined Middleware


function userAuthorisationMiddleware(request , response , next)
{
    const username = request.headers.username;
    const password = request.headers.password;

    // Authorisation
    if(username != "Harkirat" || password != "pass")
    {
        response.status(401).json( { message: "Please enter valid credentials" } );
    }
    else
    {
        next();
    }
}


function inputValidationMiddleware(request , response , next)
{
    const kidneyId = request.query.kidneyId;

    // Input validation
    if(kidneyId != 1 && kidneyId != 2)
    {
        response.status(400).json( { message: "Wrong Inputs" } );
    }
    else
    {
        next();
    }
}


let numOfRequests = 0;

function calculateRequests(request , response , next)
{
    numOfRequests += 1;
    console.log(numOfRequests);
    next();
}


// Middlewares specified inside app.use() get invoked everytime a request comes to an active server, irrespective of the route
// on which the route/endpoint the request was sent. It is like a global middleware.
app.use(calculateRequests);


// Middlewares specified alongside the routes are only invoked when a request comes to that particular route.
app.get('/health-checkup' , userAuthorisationMiddleware , inputValidationMiddleware , (request , response) => {

    // Do something with the kidney
    response.status(200).send("Your heart is healthy !");

} );


app.get('/kidney-checkup' , userAuthorisationMiddleware , inputValidationMiddleware , (request , response) => {

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