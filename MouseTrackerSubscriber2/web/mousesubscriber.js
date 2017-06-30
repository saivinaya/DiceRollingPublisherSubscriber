/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//specifying the connecting IP and port and name
client = new Paho.MQTT.Client("localhost", Number(9002), "MouseSubscriber2");
// specifying function for when connection is lost or a messgae is arrived
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess: onConnect});

function onConnect() {
    // Once a connection has been made, make a subscription
    console.log("Connected");
    client.subscribe("/MouseTracker");
};

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
        console.log("onConnectionLost:" + responseObject.errorMessage);
};

function onMessageArrived(message) {
    //when the messsage is arrived show it on the web page using the ID tag
    document.getElementById("demo").innerHTML = message.payloadString;
    console.log("onMessageArrived:" + message.payloadString);
};