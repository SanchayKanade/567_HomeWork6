/*HomeWork 6 PartA RTT
Sanchay Kanade sk2656
*/

let ping = function(serverURL) {
    return new Promise((resolve, reject) => {
    const urlFormat = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
    if (!urlFormat.test(serverURL))
    reject(`Invalid URL: ${serverURL}`);
    
    const myRequest = new Request(serverURL, {
    method: "GET",
    mode: "no-cors",
    cache: "no-cache",
    referrerPolicy: "no-referrer"
    });
    
    let sendTime = new Date();
    fetch(myRequest)
    .then(() => {
    let receiveTime = new Date();
    resolve( receiveTime.getTime() - sendTime.getTime() );
    })
    .catch(() => resolve(false));
    });
};

const RTT = async function(){
    const serverURL = 'https://www.rutgers.edu/';
    //const serverURL = 'https://jasmine.github.io/';
    //const serverURL = 'https://www.amazon.in/';
    //const serverURL = 'https://www.megekko.nl/product/2077/281611/Monitoren/Samsung-LS24R652FDUXEN-24-FHD-IPS-monitor';
    var promise = [];

    for(var i =0; i<10;i++){
        promise.push(ping(serverURL));
    }

    const results = await Promise.all(promise);
    var sum = 0;
    var validResults = results.filter((res) =>res !== false);

    validResults.forEach((res_1) =>{
        sum += res_1;
    });
    //console.log(sum);
    const average = sum / validResults.length;
    //console.log(average);
    return average
}

RTT().then((avg)=>{
    console.log("Average RTT:", avg);
});

//Exporting module
module.exports = { RTT };
