const express = require("express");

const app = express();

const zod = require("zod");

const bodyParser = require("body-parser");

const PORT = 3000 || process.env.PORT;


// Creating a zod-schema for input validation
const kidneysInfoSchema = zod.array( zod.object( { kidneyId: zod.number() , status: zod.string() } ) );


// Middlewares

app.use(express.json());

const errorHandler = (err , request , response , next) => {
    response.status(500).send( { message: "Looks like something is up with our server !" } );
};


app.get('/health-checkup' , (request , response) => {

    const kidneys = request.body.kidneys;

    // Performing input-validation using the zod-schema defined above
    const inputValidation = kidneysInfoSchema.safeParse(kidneys);

    console.log(`Input Validation Result: ${inputValidation}`);

    response.send( { inputValidation } );

} );


// Global Catches ---- Middleware used after all the routes to catch any exception raised in any of the routes

// Error-Handling Middleware: This is a special type of Middleware function in express that has four arguments instead of three:
// ( (error , req , res , next) ). Express recognizes it as an Error-Handling Middleware because of these 4 arguments.

app.use(errorHandler);

app.listen(PORT , () => {
    console.log("Server started....");
    console.log(`Server running on port: ${PORT}`);
} )