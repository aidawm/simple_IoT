from fastapi import FastAPI
from database_manager import DB

app = FastAPI()
db = DB()

@app.get("/")
def read_root():
    return db.get_hub_ids()

@app.get("/hub/{hub_id}")
def read_item(hub_id: str):
    return db.get_hub_records(hub_id)
