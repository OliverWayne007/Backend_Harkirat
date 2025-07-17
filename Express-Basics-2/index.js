const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const PORT = 8080 || process.env.PORT;

let users = [

    {
        userId: 1 , 
        name: "Oliver Queen" , 
        kidneys: [ 
            {
                id: 1 , 
                healthy: true
            } , 
            {
                id: 2 , 
                healthy: false
            } 
        ]
    } , 

    {
        userId: 2 , 
        name: "Bruce Wayne" , 
        kidneys: [
            {
                id: 1 , 
                healthy: false
            } , 
            {
                id: 2 , 
                healthy: true
            }
        ]
    } , 

    {
        userId: 3 , 
        name: "Tony Stark" , 
        kidneys: [
            {
                id: 1 , 
                healthy: true
            } , 
            {
                id: 2 , 
                healthy: true
            }
        ]
    } , 

    {
        userId : 4 , 
        name: "Matt Murdock" , 
        kidneys: [
            { 
                id: 1 , 
                healthy: true
            }
        ]
    } , 

    {
        userId : 5 , 
        name: "Barry Allen" , 
        kidneys: [
            { 
                id: 1 , 
                healthy: false
            }
        ]
    }

]

// Things to note:
// Url = Path = protocol:// + hostname + pathname + search
// pathname = route
// search = ? + query-parameters
// For example: 
// Url = Path = https://www.xyz.com/product/phone?rating=4&min_price=10000&max_price=16000
// protocol: https
// hostname: www.google.com
// pathname = route: /product/phone
// search: ?rating=4&min_price=10000&max_price=16000
// query-parameters: { rating: 4 , min_price: 10000 , max_price: 16000 }


app.use(express.json());

app.use(bodyParser.urlencoded( { extended: true } ));


// GET request
app.get('/' , (request , response) => { 
    response.status(200).send(`<h2> Welcome to the Home page ! </h2>`);
} )


// GET request
app.get('/users' , (request , response) => {

    const MappedUsers = users.map( (user) => { 

        return (
            `<div> 
                <b> userId: </b> ${user.userId}
                <br/>
                <b> name: </b> ${user.name} 
                <br/> <br/>
            </div>`
        );

    } );

    let res = "";

    MappedUsers.forEach( (mappedUser) => {
        res += mappedUser;
    } );

    response.status(200).send(res);

} );


// GET request
app.get('/users/:id' , (request , response) => {

    const id = request.params.id;

    const requestedUserArray = users.filter( (user) => { 
        return user.userId == id;
    } );

    if(requestedUserArray.length == 0)
    {
        response.status(400).send("No such user exists in the hospital");
    }

    const requestedUser = requestedUserArray[0];

    const numOfKidneys = requestedUser.kidneys.length;

    const HealthyKidneys = requestedUser.kidneys.filter( (kidney) => { return kidney.healthy == true } );

    const numOfHealthyKidneys = HealthyKidneys.length;

    const numOfUnhealthyKidneys = numOfKidneys - numOfHealthyKidneys;


    const res = 
    `<div>
        <h3> UserId : ${requestedUser.userId} </h3>
        <h3> name : ${requestedUser.name} </h3>
        <h3> Number of Kidneys: ${numOfKidneys} </h3>
        <h3> Status of kidneys: </h3>
        <h4> Number of Healthy kidneys: ${numOfHealthyKidneys} </h4>
        <h4> Number of Unhealthy Kidneys: ${numOfUnhealthyKidneys} </h4>
    </div>`

    response.status(200).send(res);

} );


// POST request
app.post('/users/:id' , (request , response) => { 

    const id = request.params.id;

    const requestedUserArray = users.filter( (user) => { return user.userId == id} );

    if(requestedUserArray.length == 0)
    {
        return response.status(400).send("No such patient exists in the hospital");
    }

    const requestedUser = requestedUserArray[0];

    if(requestedUser.kidneys.length == 2)
    {
        return response.status(400).json( { message: "The patient already has 2 kidneys !" } );
    }

    const kidneyStatusToBeAdded = request.body.kidneyStatus;

    const isHealthy = (kidneyStatusToBeAdded == "Healthy") ? true : false;

    requestedUser.kidneys.push( { id: 2 , healthy: isHealthy } );

    response.status(200).send(`${kidneyStatusToBeAdded} kidney added successfully !`);

} );


// PUT/PATCH request
app.put('/users/:id' , (request , response) => { 

    const id = request.params.id;

    const userArray = users.filter( (user) => { return user.userId == id } );

    if(userArray.length == 0)
    {
        return response.status(400).send( { Error: "No such user exists !" } );
    }

    const user = userArray[0];

    const numOfKidneys = user.kidneys.length;

    const unhealthyKidneys = user.kidneys.filter( (kidney) => { return kidney.healthy == false } );

    const numOfUnhealthyKidneys = unhealthyKidneys.length;

    if(numOfUnhealthyKidneys == 0)
    {
        return response.status(400).send( { message: "Patient does not have any unhealthy kidneys !" } );
    }

    for(let i = 0 ; i < numOfKidneys ; i++)
    {
        if(user.kidneys[i].healthy == false)
        {
            user.kidneys[i].healthy = true;
            break;
        }
    }

    return response.status(200).send( { message: "An unhealthy kidney was replaced with a healthy kidney successfully !" } );

} );


// DELETE request
app.delete('/users/:id' , (request , response) => {

    const id = request.params.id;

    const userContainer = users.filter( (user) => { return user.userId == id } );

    if(userContainer.length == 0)
    {
        return response.status(404).send("No such patient exissts !");
    }

    const patient = userContainer[0];

    const numOfKidneys = patient.kidneys.length;

    const unhealthyKidneys = patient.kidneys.filter( (kidney) => { return kidney.healthy == false } );

    const numOfUnhealthyKidneys = unhealthyKidneys.length;

    if(numOfUnhealthyKidneys == 0)
    {
        return response.status(400).send("Patient does not have any unhealthy kidneys !");
    }

    for(let i = 0 ; i < numOfKidneys ; i++)
    {
        if(patient.kidneys[i].healthy == false)
        {
            patient.kidneys.splice(i , 1);
            break;
        }
    }

    return response.status(200).send("An unhealthy kidney was removed successfully !");

} );

app.listen(PORT , () => {
    console.log("Server started....");
    console.log(`Server running on port: ${PORT}`);
});