<%-- 
    Document   : index
    Created on : 07/06/2017, 7:19:42 AM
    Author     : VinayaSaiD
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
        <script type="text/javascript" language="javascript" src="mousesubscriber.js"></script>
        <title>Mouse Tracker Subscriber 1</title>
    <h2>Mouse Tracker Subscriber</h2>
</head>
<body>
    <p>The coordinates of mouse pointer received are displayed below.</p>
    <%-- This assigns an id tag to the part of webpage to later display the coordinates --%>
    <p id="demo"></p>
</body>
</html>