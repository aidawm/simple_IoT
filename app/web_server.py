from fastapi import FastAPI
from database_manager import DB

app = FastAPI()
db = DB()

@app.get("/hub_list")
def read_root():
    hubs = db.get_hub_ids()
    json_hubs = [{"hub_id": hub_id} for hub_id in hubs]
    return json_hubs

@app.get("/hub/{hub_id}")
def read_item(hub_id: str):
    return db.get_hub_records(hub_id)
