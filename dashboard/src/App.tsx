import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import HubSummary from './components/HubSummary';
import internal from 'stream';

export type Hub = {
  hub_id: string
};

export type HubInfo = {
  id: number,
  hub_id: string,
  tempreture: number,
  humidity: number,
  timestamp: string
};

function App() {
  const [hubs, setHubs] = useState<Hub[] | null>(null);
  const [selectedHub, setSelectedHub] = useState<HubInfo[] | null>(null);

  useEffect(() => {
    const url = "http://localhost:8000/hub_list"
    axios.get(url).then((response) => { setHubs(response.data); });
  }, []);

  const handleHubChange = (hubId: string) => {
    const hub_data_url = `http://localhost:8000/hub/${hubId}`;
    axios.get(hub_data_url).then((response) => {
      console.log(response.data); // Display hub details in the console
      // const hubDetail: HubInfo = response.data; // Assuming the API returns an object that matches the HubDetail interface
      setSelectedHub(response.data);
    });
  };


  return (
    <div className="App">
      <select onChange={(e) => handleHubChange(e.target.value)}>
        {hubs ? hubs.map((hub) => (
          <option key={hub.hub_id} value={hub.hub_id}>{hub.hub_id}</option>
        )) : null}
      </select>
      {selectedHub && <HubSummary hub={selectedHub} />}

    </div>
  );

}

export default App;
