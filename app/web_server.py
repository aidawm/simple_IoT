from fastapi import FastAPI
from database_manager import DB
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
db = DB()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hub_list")
def read_root():
    hubs = db.get_hub_ids()
    json_hubs = [{"hub_id": hub_id} for hub_id in hubs]
    return json_hubs

@app.get("/hub/{hub_id}")
def read_item(hub_id: str):
    info = db.get_hub_records(hub_id)
    json_hubs = [{"id": i[0], "hub_id": i[1], "tempreture": i[2], "humidity": i[3], "timestamp": i[4] } for i in info]
    return  json_hubs
