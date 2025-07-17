"use strict";

const root = document.getElementById("root");

// Creating a button container
const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id' , 'btnContainer');

// Creating a DataContainer
const dataContainer = document.createElement("div");
dataContainer.setAttribute('id' , 'dataContainer');

// Creating a button
const button = document.createElement('button');
button.setAttribute('id' , 'btn');
button.innerText = "Fetch Names";

button.addEventListener("click" , () => {
    makeRequest("https://jsonplaceholder.typicode.com/users/");
});

// Appending the button to the button container
buttonContainer.appendChild(button);

// Appending the button container to the root element
root.appendChild(buttonContainer);


function displayNames(data)
{
    data.forEach( (personData) => {

        const personDataContainer = document.createElement("div");
        personDataContainer.setAttribute("class" , "personDataContainer");

        const namePara = document.createElement("p");
        namePara.innerText = personData.name;

        const usernamePara = document.createElement("p");
        usernamePara.innerText = personData.username;

        const emailPara = document.createElement("p");
        emailPara.innerText = personData.email;

        personDataContainer.appendChild(namePara);
        personDataContainer.appendChild(usernamePara);
        personDataContainer.appendChild(emailPara);

        dataContainer.appendChild(personDataContainer);

    } );

    root.appendChild(dataContainer);
}

const makeRequest = async (url) => {
    const response = await fetch(url);
    // console.log("Response" , response);
    const data = await response.json();
    console.log(data);
    displayNames(data);
}