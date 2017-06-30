<%-- 
    Document   : index
    Created on : 08/06/2017, 9:52:17 AM
    Author     : VinayaSaiD
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
        <script type="text/javascript" language="javascript" src="temperature.js"></script>
        <title>Temperature Subscriber</title>
        <h2>Temperature Subscriber</h2>
    </head>
    <body>
        <button onclick="temps('<%= "lowtemps"%>')">Low Temperatures</button></br>
        <button onclick="temps('<%= "nicetemps"%>')">Nice Temperatures</button></br>
        <button onclick="temps('<%= "hightemps"%>')">High Temperatures</button></br>
        <button onclick="temps('<%= "all"%>')">All Temperatures</button>
        <p>The temperature values that are published are displayed below.</p>
        <%-- This assigns an id tag to the part of webpage to later display the temperatures --%>
        <p id="demo"></p>
    </body>
</html>