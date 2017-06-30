package com.mycompany.temperaturesensorproject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

/**
 *
 * @author VinayaSaiD
 */
public class TemperatureSensor {

    protected static Random random = new Random();

    public static void main(String[] args) {
        // to set the quality of service to 2
        int qos = 2;
        // using the tcp connection to the MQTT broker
        String broker = "tcp://localhost:1883";
        //Id for the client connected to MQTT broker
        String clientId = "TemperaturePublisher";
        MemoryPersistence persistence = new MemoryPersistence();
        try {
            // configure the client to the connect to MQTT broker
            MqttClient sampleClient = new MqttClient(broker, clientId, persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            System.out.println("Connecting to broker: " + broker);
            // connecting to the MQTT broker
            sampleClient.connect(connOpts);
            System.out.println("Connected");

            // Timer for 5 second timer
            Timer t = new Timer();
            t.schedule(new TimerTask() {
                @Override
                public void run() {
                    //temperatures in the range of 0 to 100
                    double range = 100 - 0;
                    double scaled = random.nextDouble() * range;
                    // to get the timestamp
                    String timeStamp = "{\"Timestamp\":\"" + new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date()) + "\", "+ "\"Temperature\":";
                    double shifted = scaled + 0;
                    String topic;
                    // to determine the range of temperatures and accordingly determine the topics to which they need to be sent
                    if (shifted >= 0 && shifted <= 45) {
                        topic = "temperature/pittsburgh/coldTemps";
                    } else if (shifted > 45 && shifted <= 80) {
                        topic = "temperature/pittsburgh/niceTemps";
                    } else {
                        topic = "temperature/pittsburgh/hotTemps";
                    }
                    String content = (Double.toString(Math.round(shifted*100.0)/100.0));
                    content = timeStamp + "\"" + content + "\"" + "}";
                    //create a new message 
                    MqttMessage message = new MqttMessage(content.getBytes());
                    message.setQos(qos);
                    try {
                        // publish the message to the MQTT broker
                        sampleClient.publish(topic, message);
                    } // catching and printing the exception
                    catch (MqttException me) {
                        System.out.println("reason " + me.getReasonCode());
                        System.out.println("msg " + me.getMessage());
                        System.out.println("loc " + me.getLocalizedMessage());
                        System.out.println("cause " + me.getCause());
                        System.out.println("excep " + me);
                        me.printStackTrace();
                        //Logger.getLogger(TemperatureSensor.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }, 0, 5000); // timer for 5000 milliseconds
        } // catching and printing the exception
        catch (MqttException me) {
            System.out.println("reason " + me.getReasonCode());
            System.out.println("msg " + me.getMessage());
            System.out.println("loc " + me.getLocalizedMessage());
            System.out.println("cause " + me.getCause());
            System.out.println("excep " + me);
            me.printStackTrace();
        }
    }
}