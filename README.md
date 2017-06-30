# DiceRollingPublisherSubscriber
Build a Netbeans project named DiceRollingClientProject. This project will hold a stand alone Java program named DiceRollingClient.java. Every one second, DiceRollingClient.java will generate two random integers between 1 and 6 inclusive (each is uniformly distributed). It will then publish a JSON string to Mosquito in the following format {"Die1" : Number, "Die2" : Number }. For example, in the first three seconds, the program might transmit {"Die1" : 3, "Die2" : 1 } {"Die1" : 3, "Die2" : 6 } and  {"Die1" : 2, "Die2" : 4 }

Part 1.
=======

Your task in Project 2 Part 1 is to: 

1) Build a Netbeans project named Project2Basic with the code found here:
   http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmousemove 
   Note that every time the mouse moves (within the box) an event is generated 
   and the x and y coordinates are displayed. It is required that you add your
   own detailed comments to this code - explaining clearly how it works. The grader
   will grade based on the quality of these comments.
           
2) Here we want to sense the mouse movements and pass them along to Mosquitto(MQTT). 
   Copy Project2Basic (along with your comments) to a new Netbeans project called 
   MouseTrackerPublisher. This will need to be modified so that every mouse movement 
   publishes the coordinates to Mosquitto. It must make good use of the Javascript library
   mqttws31.js. 

3) Create a new Netbeans project called MouseTrackerSubscriber. It too will make use of
   mqttws31.js. MouseTrackerSubscriber will subscribe to events published to Mosquitto. 
   It will simply display the coordinates being received (there will be no box as is 
   shown in MouseTrackerPublisher). 

Part 2.
=======

In Part 2, we will be communicating with Mosquitto in two ways. We will use Websockets from within
our Javascript code - running within a browser. And we will also use standard TCP sockets (and a client
library) from within a stand-alone Java program. In order to make this happen, we need to 
ensure that the Mosquitto configuration includes the following four lines. You will need to 
carefully use the appropriate ports within your code.

	listener 1883
	protocol mqtt
	listener 9002
	protocol websockets

For the Java client, we will be using the Eclipse Paho Java Client libraries.
This is very easy to do using Maven and Netbeans. In short, Maven is an opinionated build tool. 
That is, it is based around the idea of "convention over configuration". There is a nice 15 minute 
video here on using Maven on the Netbeans IDE: https://www.youtube.com/watch?v=mGmUH-SxFHA 

The following URL has the repository definition and the dependency definition needed for your pom.xml.
It also has a very nice sample Java client that you may work from.

	https://eclipse.org/paho/clients/java/

1) Build a Netbeans project named TemperatureSensorProject. This project will hold a stand alone
Java program named TemperatureSensor.java. Every 5 seconds, TemperatureSensor.java will generate a 
random temperature (uniformly distributed) between the values of 0 and 100 degrees fahrenheit. If the 
random temperature is between 0 and 45 degrees inclusive, TemperatureSensor.java sends the temperature 
and a timestamp to the topic called "temperature/pittsburgh/coldTemps" on Mosquitto. If the temperature is 
greater than 45 degrees but less than or equal to 80 degrees, TemperatureSensor.java sends the temperature 
and a timestamp to the topic called "temperature/pittsburgh/niceTemps" on Mosquitto.  If the temperature is greater 
than 80 degrees then TemperatureSensor.java sends the temperature and a timestamp to 
the topic called "temperature/pittsburgh/hotTemps" on Mosquitto.    
 
2) Build a Netbeans web application that allows the user to subscribe to a particular topic
from Mosquitto. The user might be interested in "temperature/pittsburgh/coldTemps", "temperature/pittsburgh/niceTemps", 
"temperature/pittsburgh/hotTemps", or all temperatures. Name the web application project TemperatureSubscriberProject. 
This project will require the Javascript library mqttws31.js. To get data on all temperatures, use 
topic wildcards. The detailed design of the site is in your hands. It will allow the user to select 
from the four possible options and will then show each temperature and timestamp pair published to 
that topic. 

3) Build a Netbeans project named DiceRollingClientProject. This project will hold a stand alone
Java program named DiceRollingClient.java. Every one second, DiceRollingClient.java will generate two random
integers between 1 and 6 inclusive (each is uniformly distributed). It will then publish a JSON string to
Mosquito in the following format {"Die1" : Number, "Die2" : Number }. For example, in the first three seconds,
the program might transmit {"Die1" : 3, "Die2" : 1 } {"Die1" : 3, "Die2" : 6 } and 
{"Die1" : 2, "Die2" : 4 }. 

4) Build a Netbeans web application project named DiceRollingMonitorProject. The web
application will act as a subscriber to MQTT messages. This project will require the Javascript 
library mqttws31.js. It will also make good use of Google Charts to display the following on a 
browser:

    a) Two Google Chart gauges. One showing the result of the first die roll and the other showing the 
       result of the second die roll. These gauges will display the integers 1 through 6 inclusive. The 
       pointer on each gauge will jump from one integer to the next upon each roll of the dice.   

    b) A third Google Chart gauge showing the sum of the values on the two die. It will be numbered 
       from 2 to 12 and its pointer will jump among these values on each roll.

    c) A fourth Google Chart gauge showing the average sum rolled so far. If the first three rolls are
       (1,1), (3,1), and (1,2) then this gauge would display a 3. That is, (2 + 4 + 3)/3 = 3. This gauge
       will be numbered from 2 to 12 but will display the average as a real number. If the first two rolls
       are (4,5) and (1,1) then this gauge will display the value 5.5 and the pointer on the gauge will 
       point midway between 5 and 6 on the gauge.

    d) The last monitoring device that you will display is a Google Chart Line Chart. The Y-axis will
       run from 0 to 1.0 and the X-axis will run from 2 to 12. It will display a line representing the 
       relative frequency of each possible sum. Suppose the first 11 rolls result in (1,1), (2,1), (3,1)
       (3,2), (2,4), (4,3), (6,2), (3,6), (5,5), (6,5), and (6,6). The line chart would show a straight
       line running above 2 through 12 at a constant height of 1/11 on the y-axis. This line graph will
       change as the dice rolls are pushed to the MQTT subscriber. 
