#!/bin/sh

python data_manager.py &

# Start the second process
fastapi run web_server.py --host "0.0.0.0" --port "8000" &

# Wait for all background jobs to finish
wait

echo "All 10 MQTT publisher instances have finished."


