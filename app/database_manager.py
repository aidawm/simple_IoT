import sqlite3

class DB:
    def __init__(self) -> None:
        self.__connect_to_db_server__()
        
        self.__create_table__()


    def __connect_to_db_server__(self):
        self.mydb = sqlite3.connect('mydb.db', check_same_thread=False)
    
    def __create_table__(self):
        mycursor = self.mydb.cursor()
        mycursor.execute('''CREATE TABLE IF NOT EXISTS sensor_records
             (id INTEGER PRIMARY KEY AUTOINCREMENT, hub_id VARCHAR(255), temperature FLOAT, humidity FLOAT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')

    def new_record(self,hub_id,tempreture,humidity):
        mycursor = self.mydb.cursor()

        sql = "INSERT INTO sensor_records (hub_id,temperature,humidity) VALUES (?,?,?)"
        print([hub_id,tempreture,humidity])
        mycursor.execute(sql, [hub_id,tempreture,humidity])

        self.mydb.commit()

    def get_all_info(self):
        mycursor = self.mydb.cursor()

        mycursor.execute("SELECT * FROM sensor_records")

        myresult = mycursor.fetchall()

        return myresult
    
    def get_hub_ids(self):
        mycursor = self.mydb.cursor()

        mycursor.execute("SELECT DISTINCT hub_id FROM sensor_records")

        myresult = mycursor.fetchall()
        myresult = [r[0] for r in myresult]
        return myresult
    
    def get_hub_records(self,hub_id):
        mycursor = self.mydb.cursor()

        mycursor.execute("SELECT * FROM sensor_records where hub_id = ?",[hub_id])

        myresult = mycursor.fetchall()
        return myresult

if __name__ == '__main__': 
    db = DB()
    print(db.get_hub_ids())
    