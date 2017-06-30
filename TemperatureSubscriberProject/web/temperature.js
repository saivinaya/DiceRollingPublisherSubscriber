/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global client */
var previousSubscription = 0;
//specifying the connecting IP and port and name
client = new Paho.MQTT.Client("localhost", Number(9002), "TemperatureSubscriber1");
// specifying function for when connection is lost or a messgae is arrived
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess: onConnect});

function onConnect() {
    // print that the connection has been made
    console.log("Connected");
}
;

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
        console.log("onConnectionLost:" + responseObject.errorMessage);
}
;

function onMessageArrived(message) {
    var myJsonObj = JSON.parse(message.payloadString);
    // append the temperatures to the web page and display it
    var displayString = myJsonObj.Timestamp + " : " + myJsonObj.Temperature;
    document.getElementById("demo").innerHTML += displayString + " " + ascii(176) + "F"+ '<br />';
    console.log("onMessageArrived:" + message.payloadString);
}
;

function ascii (a) { return String.fromCharCode(a); }

function temps(temprequired) {
    // checking if the button pressed is same as the previous button pressed.
    if (!(temprequired === previousSubscription)){
    // unsubsribe to the unwanted topics when a new set of temperatures is requested by pressing the button
    if (previousSubscription === "lowtemps") {
        document.getElementById("demo").innerHTML += '<br />' + "UnSubscribing from Low Temperatures." + '<br />';
        client.unsubscribe("temperature/pittsburgh/coldTemps");
    } else if (previousSubscription === "nicetemps") {
        document.getElementById("demo").innerHTML += '<br />' + "UnSubscribing from Nice Temperatures." + '<br />';
        client.unsubscribe("temperature/pittsburgh/niceTemps");
    } else if (previousSubscription === "hightemps") {
        document.getElementById("demo").innerHTML += '<br />' + "UnSubscribing from High Temperatures." +  '<br />';
        client.unsubscribe("temperature/pittsburgh/hotTemps");
    } else if (previousSubscription === "all") {
        document.getElementById("demo").innerHTML += '<br />' + "UnSubscribing from All Temperatures." + '<br />';
        client.unsubscribe("temperature/pittsburgh/+");
    }
    // subscribe to the wanted topics when a new set of temperatures is requested by pressing the button
    if (temprequired === "lowtemps")
    {   previousSubscription = "lowtemps";
        document.getElementById("demo").innerHTML += "Subscribing to Low Temperatures." + '<br />' + '<br />';
        client.subscribe("temperature/pittsburgh/coldTemps");
    } else if (temprequired === "nicetemps")
    {   previousSubscription = "nicetemps";
        document.getElementById("demo").innerHTML += "Subscribing to Nice Temperatures." + '<br />' + '<br />';
        client.subscribe("temperature/pittsburgh/niceTemps");
    } else if (temprequired === "hightemps")
    {   previousSubscription = "hightemps";
        document.getElementById("demo").innerHTML += "Subscribing to High Temperatures." + '<br />' + '<br />';
        client.subscribe("temperature/pittsburgh/hotTemps");
    } else if (temprequired === "all")
    {   previousSubscription = "all";
        document.getElementById("demo").innerHTML += "Subscribing to All Temperatures."+ '<br />' + '<br />';
        client.subscribe("temperature/pittsburgh/+");
    }
    }
}
;