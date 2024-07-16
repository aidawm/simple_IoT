import paho.mqtt.client as mqtt
import sqlite3
from database_manager import DB


class Reciever:
    def __init__(self) -> None:
        self.db = DB()
    
        client = mqtt.Client()

        client.on_connect = self.on_connect
        client.on_message = self.on_message

        client.connect("mqtt_broker", 1883, 60)

        client.loop_forever()

    def on_message(self,client, userdata, msg):
        print(f"Received message: {msg.payload.decode()} on topic {msg.topic}")
        date, time, temp , humi =  msg.payload.decode().split(" ")
        hub_id = msg.topic.split("/")[2]
        timestamp = date + time
        self.db.new_record(timestamp, hub_id,float(temp),float(humi))

    def on_connect(self,client, userdata, flags, rc):
        if rc == 0:
            print("Connected successfully")
            client.subscribe("sensor/data/#")
        else:
            print(f"Connect failed with code {rc}")
    

if __name__ == "__main__":
    Reciever()