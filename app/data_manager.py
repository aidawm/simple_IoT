import paho.mqtt.client as mqtt
import sqlite3
from database_manager import DB



def on_message(client, userdata, msg):
    print(f"Received message: {msg.payload.decode()} on topic {msg.topic}")
    temp , humi =  msg.payload.decode().split(" ")
    db.new_record(msg.topic,float(temp),float(humi))

def on_connect(client, userdata, flags, rc,properties):
    if rc == 0:
        print("Connected successfully")
        client.subscribe("sensor/data/#")
    else:
        print(f"Connect failed with code {rc}")


def get_data_from_hubs():

    db = DB()
    
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

    client.on_connect = on_connect
    client.on_message = on_message

    client.connect("localhost", 1883, 60)

    client.loop_forever()


if __name__ == "__main__":
    get_data_from_hubs()