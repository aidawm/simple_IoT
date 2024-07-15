FROM python:3.9.19-alpine

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt
RUN apk add util-linux

COPY hub_simulator.py run_mqtt_publisher.sh  /app/

CMD ['chmod','+x',"run_mqtt_publisher.sh"]
CMD [ "./run_mqtt_publisher.sh"]