const express = require("express");

// Express is a javascript framework that encapsulates the complexity of creating http-servers.


function calculateSum(n)
{
    let ans = 0;
    for(let i = 0 ; i < n ; i++)
    {
        ans += i;
    }
    return ans;
}

// Real-world Analogy:

// Our PC is like a hospital which has multiple rooms(represented by ports).

// app is an instance of Express and has all the necessary capabilities to act as a http-server.

// app represents a doctor and port represents the doctor's room/cabin inside the hospital.

// The app binds to a port just like a doctor occupies a particular room/cabin inside the hospital. 
const app = express();

// port is like the room-number of the doctor's room inside the hospital.
const PORT = 8000 || process.env.PORT;

// Note that in the real-world, only one doctor occupies a particular room.

// Similarly, only one instance of Express i.e. app can bind to a particular port at a time.

// In a hospital, each doctor has a different room/cabin inside the hospital.

// Therefore, in a hospital, there can be multiple doctors operating in different rooms inside the same hospital.

// Similarly, we can have multiple instances of Express i.e. apps running on different ports in the same PC/system.


// Following are the services provided by the doctor
app.get('/:num' , (request , response) => {
    console.log(request.params);
    const n = request.params.num;
    const ans = calculateSum(n);
    response.json( { message: `The calculated sum for n = ${n} is: ${ans}` } );
} );


// Following represents a doctor sitting in his/her room/cabin, waiting for patients to come for consultation.
app.listen( PORT , () => { 
    console.log("Server started !");
    console.log(`Server listening on port: ${PORT}`);
} );


// Things to note:
// Url = Path = protocol:// + hostname + pathname + search
// pathname = route
// search = ? + query-parameters
// For example: 
// Url = Path = https://www.xyz.com/product/phone?rating=4&min_price=10000&max_price=16000
// protocol: https
// hostname: www.xyz.com
// pathname = route: /product/phone
// search: ?rating=4&min_price=10000&max_price=16000
// query-parameters: { rating: 4 , min_price: 10000 , max_price: 16000 }