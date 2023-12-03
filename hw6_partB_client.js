/*HomeWork 6 PartB Client
Sanchay Kanade sk2656
*/

let text = "text_1 Server Response Received";
const rtt = 99;
let delay = Math.random() * rtt * 3; // "rtt"

setTimeout(() => {text = "text_22: Response Timed Out";}, delay);

const yourServerURL = 'http://localhost:8080/';

let myRequest = new Request(yourServerURL, {
method: "POST",
headers: {
    'Content-Type': 'text/plain'
},
body: text
});

let sendTime = new Date().getTime();
let receiveTime;
let rtt1;

fetch(myRequest) // use fetch(), not Postman’s sendRequest()
 .then((response) => {

    receiveTime = new Date().getTime(); 
    rtt1 = receiveTime - sendTime; 

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
 //console.log( response.blob() == text);
    }).then(data =>{
        console.log("Data sent: ",data);
        console.log("Data Received: ",text);
        console.log(data === text);
        console.log("Delay introduced is: ", delay);
        console.log("Response time:",rtt1);
 });

 //Exporting module
module.exports = { fetch };