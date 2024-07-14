import paho.mqtt.client as mqtt
import sqlite3
from database_manager import DB


class Reciever:
    def __init__(self) -> None:
        self.db = DB()
    
        client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

        client.on_connect = self.on_connect
        client.on_message = self.on_message

        client.connect("localhost", 1883, 60)

        client.loop_forever()

    def on_message(self,client, userdata, msg):
        print(f"Received message: {msg.payload.decode()} on topic {msg.topic}")
        temp , humi =  msg.payload.decode().split(" ")
        self.db.new_record(msg.topic,float(temp),float(humi))

    def on_connect(self,client, userdata, flags, rc,properties):
        if rc == 0:
            print("Connected successfully")
            client.subscribe("sensor/data/#")
        else:
            print(f"Connect failed with code {rc}")
    

if __name__ == "__main__":
    Reciever()