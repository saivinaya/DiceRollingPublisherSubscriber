/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global client */
// global variables declared to use in the web page
var dicerollnumber = 0;
var sumofdicerolls = 0;
var sum2 = 0;
var sum3 = 0;
var sum4 = 0;
var sum5 = 0;
var sum6 = 0;
var sum7 = 0;
var sum8 = 0;
var sum9 = 0;
var sum10 = 0;
var sum11 = 0;
var sum12 = 0;

//specifying the connecting IP and port and name
client = new Paho.MQTT.Client('localhost', Number(9002), "DiceRollSubscriber1");
// specifying function for when connection is lost or a messgae is arrived
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess: onConnect});

//loading the google graphs
google.charts.load('current', {'packages': ['gauge', 'corechart']});
google.charts.setOnLoadCallback(drawGauge);

//setting the guage options
var gaugeOptions1 = {min: 1, max: 6, minorTicks: 0, majorTicks: ['1', '2', '3', '4', '5', '6']}
var gauge1;

var gaugeOptions2 = {min: 2, max: 12, minorTicks: 0, majorTicks: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
var gauge2;

var gaugeOptions3 = {min: 2, max: 12, minorTicks: 0, majorTicks: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
var gauge3;

var chart;

function drawGauge() {
    // gauge 1 to display the values of 2 dies 
    gaugeData1 = new google.visualization.DataTable();
    gaugeData1.addColumn('number', 'Die 1');
    gaugeData1.addColumn('number', 'Die 2');
    gaugeData1.addRows(1);
    gaugeData1.setCell(0, 0, 1);
    gaugeData1.setCell(0, 1, 1);

    // gauge 1 to display the sum of 2 dies 
    gaugeData2 = new google.visualization.DataTable();
    gaugeData2.addColumn('number', 'Sum');
    gaugeData2.addRows(1);
    gaugeData2.setCell(0, 0, 2);

    // gauge 1 to display the average of 2 dies 
    gaugeData3 = new google.visualization.DataTable();
    gaugeData3.addColumn('number', 'Average');
    gaugeData3.addRows(1);
    gaugeData3.setCell(0, 0, 2);

    // add all the 3 gauges to the web page using the ID tags 
    gauge1 = new google.visualization.Gauge(document.getElementById('gauge_div'));
    gauge1.draw(gaugeData1, gaugeOptions1);

    gauge2 = new google.visualization.Gauge(document.getElementById('gauge_sum'));
    gauge2.draw(gaugeData2, gaugeOptions2);

    gauge3 = new google.visualization.Gauge(document.getElementById('gauge_avg'));
    gauge3.draw(gaugeData3, gaugeOptions3);

    // relative frequency chart
    var data = new google.visualization.arrayToDataTable([['Sum of dice', 'relative frequency'], [2, 0], [3, 0], [4, 0], [5, 0],
        [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]]);
    //setting the various options for the chart  
    var options = {
        hAxis: {title: 'Sum of Dice',
            viewWindow: {
            max: 0,
            min: 1
        },
        gridlines: { count: 10 }},
        vAxis: {title: 'Relative frequency of each possible sum'},
        chart: {
            title: 'Relative frequency'
        },
        //this is used for smoothing the curve, has been commented because while smoothing it is going to negative values
        //curveType: 'function', 
        width: 1000,
        height: 400
    };

    chart = new google.visualization.LineChart(document.getElementById('line_chart'));
    chart.draw(data, options);
}

function onConnect() {
    // Once a connection has been made, make a subscription
    console.log("Connected");
    client.subscribe("/DiceRoll");
};

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
        console.log("onConnectionLost:" + responseObject.errorMessage);
};

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var myJsonObj = JSON.parse(message.payloadString);
    // extracting the value of die 1 and 2
    var dice1 = myJsonObj.Die1;
    var dice2 = myJsonObj.Die2;
    // calling a function
    dicevalue(dice1, dice2);
};

function dicevalue(dir1, dir2) {
    // setting the values to the gauge
    gaugeData1.setValue(0, 0, dir1);
    gaugeData1.setValue(0, 1, dir2);
    gaugeData2.setValue(0, 0, dir1 + dir2);
    dicerollnumber = dicerollnumber + 1;
    sumofdicerolls = sumofdicerolls + dir1 + dir2;
    //calculating the relative frequency and the average
    var rel2, rel3, rel4, rel5, rel6, rel7, rel8, rel9, rel10, rel11, rel12;
    if ((dir1 + dir2) === 2) {
        sum2 = sum2 + 1;
    } else if ((dir1 + dir2) === 3) {
        sum3 = sum3 + 1;
    } else if ((dir1 + dir2) === 4) {
        sum4 = sum4 + 1;
    } else if ((dir1 + dir2) === 5) {
        sum5 = sum5 + 1;
    } else if ((dir1 + dir2) === 6) {
        sum6 = sum6 + 1;
    } else if ((dir1 + dir2) === 7) {
        sum7 = sum7 + 1;
    } else if ((dir1 + dir2) === 8) {
        sum8 = sum8 + 1;
    } else if ((dir1 + dir2) === 9) {
        sum9 = sum9 + 1;
    } else if ((dir1 + dir2) === 10) {
        sum10 = sum10 + 1;
    } else if ((dir1 + dir2) === 11) {
        sum11 = sum11 + 1;
    } else if ((dir1 + dir2) === 12) {
        sum12 = sum12 + 1;
    }
    rel2 = sum2 / dicerollnumber;
    rel3 = sum3 / dicerollnumber;
    rel4 = sum4 / dicerollnumber;
    rel5 = sum5 / dicerollnumber;
    rel6 = sum6 / dicerollnumber;
    rel7 = sum7 / dicerollnumber;
    rel8 = sum8 / dicerollnumber;
    rel9 = sum9 / dicerollnumber;
    rel10 = sum10 / dicerollnumber;
    rel11 = sum11 / dicerollnumber;
    rel12 = sum12 / dicerollnumber;
    var avg = (sumofdicerolls / dicerollnumber).toFixed(3);
    var data1 = new google.visualization.arrayToDataTable([['Sum of dice', 'relative frequency'], [2, rel2], [3, rel3], [4, rel4], [5, rel5],
        [6, rel6], [7, rel7], [8, rel8], [9, rel9], [10, rel10], [11, rel11], [12, rel12]]);
    var options1 = {
        hAxis: {title: 'Sum of Dice',gridlines: { count: 10 }},
        vAxis: {title: 'Relative frequency of each possible sum'},
        chart: {
            title: 'Relative Frequency'
        },
        //this is used for smoothing the curve, has been commented because while smoothing it is going to negative values
        //curveType: 'function',
        max: 0,
        min: 1,
        width: 1000,
        height: 400
    };
    gaugeData3.setValue(0, 0, avg);
    //drawing the gauges and chart
    gauge1.draw(gaugeData1, gaugeOptions1);
    gauge2.draw(gaugeData2, gaugeOptions2);
    gauge3.draw(gaugeData3, gaugeOptions3);
    chart.draw(data1, options1);
}