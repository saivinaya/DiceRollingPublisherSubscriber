<%-- 
    Document   : index
    Created on : 06/06/2017, 8:29:16 PM
    Author     : VinayaSaiD
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
        <script type="text/javascript" language="javascript" src="mousetracker.js"></script>
        <style>
            <%-- This is to specify the width and heigth of the box where the coordinates are will be noted when mouse is hovered over it --%>
            div {
                width: 200px;
                height: 100px;
                border: 1px solid black;
            }
        </style>
    </head>
    <body>
        <%-- This is used to cqall the methods when mouse is moved in the above box or when the mouse is taken off from the box --%>
        <div onmousemove="myFunction(event)" onmouseout="clearCoor()"></div>

        <p>Mouse over the rectangle above, and get the coordinates of your mouse pointer.</p>

        <p>When the mouse is moved over the div, the p element will display the horizontal and vertical coordinates of your mouse pointer, whose values are returned from the clientX and clientY properties on the 
            MouseEvent object.</p>
        <%-- This assigns an id tag to the part of webpage to later display the coordinates --%>
        <p id="demo"></p>
    </body>
</html>