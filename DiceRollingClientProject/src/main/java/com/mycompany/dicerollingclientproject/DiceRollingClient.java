package com.mycompany.dicerollingclientproject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

/**
 *
 * @author VinayaSaiD
 */
public class DiceRollingClient {

    // 2 class variables
    protected static Random random1 = new Random();
    protected static Random random2 = new Random();

    public static void main(String[] args) {
        // to set the quality of service to 2
        int qos = 2;
        // using the tcp connection to the MQTT broker
        String broker = "tcp://localhost:1883";
        //Id for the client connected to MQTT broker
        String clientId = "DiceRollPublisher";
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

            // Timer for 1 second timer
            Timer t = new Timer();
            t.schedule(new TimerTask() {
                @Override
                public void run() {
                    // random number between 1 to 6
                    Random rn = new Random();
                    int dice1 = random1.nextInt(6) + 1;
                    int dice2 = random2.nextInt(6) + 1;
                    StringBuffer json = new StringBuffer();
                    // creating a json string
                    json.append("{\"Die1\":").append(dice1).append(",\"Die2\":").append(dice2).append("}");
                    // choosing the topic to send to
                    String topic = "/DiceRoll";
                    String content = json.toString();
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
            }, 0, 1000);
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