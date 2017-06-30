<%-- 
    Document   : index
    Created on : 08/06/2017, 1:08:35 PM
    Author     : VinayaSaiD
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
        <script type="text/javascript" language="javascript" src="diceroll.js"></script>
        <title>Dice Roll Subscriber</title>
    <h2>Dice Roll Subscriber</h2>
</head>
<body>
    <p>The values of Die 1 and Die 2 are shown below.</p>
    <div id="gauge_div" style="width:280px; height: 140px;"></div>
    <p>The sum of values of Die 1 and Die 2 is shown below.</p>
    <div id="gauge_sum" style="width:280px; height: 140px;"></div>
    <p>The average of values of Die 1 and Die 2 is shown below.</p>
    <div id="gauge_avg" style="width:280px; height: 140px;"></div>
    <p>The relative frequency of each possible sum is shown below.</p>
    <div id="line_chart" ></div>
</body>
</html>