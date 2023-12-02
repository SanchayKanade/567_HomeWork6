/*HomeWork 6 PartB Client
Sanchay Kanade sk2656
*/

let text = "text_1 Server Response Received";
let delay = 100; // "rtt"

setTimeout(() => {text = "text_22: Response Timed Out";}, delay);

const yourServerURL = 'http://localhost:8080/';

let myRequest = new Request(yourServerURL, {
method: "POST",
headers: {
    'Content-Type': 'text/plain'
},
body: text
});

fetch(myRequest) // use fetch(), not Postman’s sendRequest()
 .then((response) => {
 if (!response.ok) {
 throw new Error(`HTTP error! Status: ${response.status}`);
 }
 return response.json();
 //console.log( response.blob() == text);
 }).then(data =>{
    console.log(data);
    console.log(text);
    console.log(data === text);
 });

 //Exporting module
module.exports = { fetch };