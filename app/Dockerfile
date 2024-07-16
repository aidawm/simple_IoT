FROM python:3.9.19-alpine

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt
RUN apk add sqlite

COPY database_manager.py data_manager.py web_server.py /app/
COPY wrapper_script.sh  .

EXPOSE 8000

RUN chmod +x /app/wrapper_script.sh

CMD [ "./wrapper_script.sh" ] 