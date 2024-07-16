#!/bin/sh
mosquitto -v &
./hub/run_mqtt_publisher.sh &
cd app/
python3 data_manager.py &
fastapi run web_server.py --host "0.0.0.0" --port "8000" &
cd ../dashboard
npm install
npm start &

wait

echo "app is closed."
