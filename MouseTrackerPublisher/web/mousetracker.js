/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//specifying the connecting IP and port and name
client = new Paho.MQTT.Client("localhost", Number(9002), "MousePublisher");
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
    //print it in console
    console.log("onMessageArrived:" + message.payloadString);
};

function myFunction(e) {
    // get the x and y coordinate
    var x = e.clientX;
    var y = e.clientY;
    // create a string using the coordinates
    var coor = "Coordinates: (" + x + "," + y + ")";
    //create a new MQTT message
    message = new Paho.MQTT.Message(coor);
    // specify the topic it needs to be sent to
    message.destinationName = "/MouseTracker";
    // send the message to that topic
    client.send(message);
    //This makes the coordinates display on the web browser using the id tag "demo"
    document.getElementById("demo").innerHTML = coor;
}

//This function is called when the mouse is taken off from the above box
function clearCoor() {
    document.getElementById("demo").innerHTML = "";
}